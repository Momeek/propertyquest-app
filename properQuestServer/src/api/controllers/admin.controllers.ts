import { flow } from 'lodash';
import { Op } from 'sequelize';
import { Response, AdminRequestAttr } from '../../interfaces/req.interface';
import { status, send, sendError } from '../../utils/https.utils';
import { AdminToken } from '../../utils';
import { sequelizeConn } from '../../config/database';
import { createLogger } from '../../utils/logger';
import { Admin, LikedProperty, Property } from '../../models';
import { CreateAdminSchema, AdminLogingSchema, AdminAttr } from '../../interfaces/admin.interface';
import { z } from 'zod';
import { ErrorCodes, getResponseMeta } from '../../utils';
import { User, UserDocument } from '../../models';
import { 
  transporter, 
  generateRejectedDocEmailTemplate, 
  generateApprovedDocEmailTemplate 
} from '../utils';
import { WhereOptions } from 'sequelize/types';

export const getCurrentAdmin = async (ctx: any) => {
  const adminId = ctx.admin?.id;

  const admin = await Admin.findByPk(adminId, {
    attributes: {
      exclude: ['password'],
    },
  });

  if (!adminId || !admin) {
      return flow(
        status(404),
        sendError('Admin not found', { code: ErrorCodes.USER_NOT_FOUND }),
      )(ctx.res);
    }

  return admin;
}

export const getAdminById = async (adminId: string) => {
  const admin = await Admin.findByPk(adminId, {
    attributes: {
      exclude: ['password'],
    },
  });

  return admin;
}

export const createAdmin = async (req: AdminRequestAttr, res: Response) => {
  const {
    userName,
    fullName,
    email,
    password,
    isSuperAdmin = false,
  } = req.body as z.infer<typeof CreateAdminSchema>;

  const logger = createLogger('CreateAdmin', 'Admin');

  try {

    const result = await sequelizeConn.transaction(async (t) => {
      const adminExists = await Admin.findOne({
        where: { email: email },
      });

      if (adminExists) {
        logger.error({ email }, 'Admin already exists');
        throw new Error('USER_ALREADY_EXISTS');
      }

      const adminData: AdminAttr = {
        userName,
        fullName,
        email,
        password,
        isSuperAdmin: isSuperAdmin,
      };

      const admin = await Admin.create(adminData, { transaction: t });

      return admin;
    })

    return flow(
      status(201),
      send('Admin created successfully', {
        admin: result,
      }),
    )(res);
  } catch (error) {
    logger.error(
      {
        error,
      },
      'Failed to create user',
    );

    if ((error as Error)?.message === 'USER_ALREADY_EXISTS') {
      return flow(
        status(400),
        sendError('Admin already exists', {
          code: ErrorCodes.USER_ALREADY_EXISTS,
        }),
      )(res);
    }

    return flow(
      status(500),
      sendError('Error creating user', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const updateUser = async (req: AdminRequestAttr, res: Response) => {
  const { adminId } = req.params;
  const { userName, fullName, email, password} =
    req.body as z.infer<typeof CreateAdminSchema>;

  const logger = createLogger('UpdateUser', 'User');

  try {
    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return flow(
        status(404),
        sendError('Admin not found', { code: ErrorCodes.USER_NOT_FOUND }),
      )(res);
    }

    await admin.update({
      userName,
      fullName,
      email,
      password,
    });

    return flow(
      status(200),
      send('Admin account updated successfully', admin),
    )(res);
  } catch (error) {
    logger.error(
      {
        error,
      },
      'Failed to update admin',
    );

    return flow(
      status(500),
      sendError('Error updating admin', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const loginAdmin = async (req: AdminRequestAttr, res: Response) => {
  const { email, password } = req.body as z.infer<typeof AdminLogingSchema>;

  const logger = createLogger('LoginAdmin', 'Admin');

  try {
    const admin = await Admin.findOne({
      where: { email: email, active: true },
    });

    if (!admin) {
      return flow(
        status(404),
        sendError('User not found', { code: ErrorCodes.USER_NOT_FOUND }),
      )(res);
    }
    const adminPass = {
      email,
      password,
    };

    if (!admin.comparePassword(password)) {
      logger.error({ adminPass }, 'Unauthorized access');
      return flow(
        status(401),
        sendError('Invalid password', {
          code: ErrorCodes.INVALID_PASSWORD,
        }),
      )(res);
    }

    const token = AdminToken.sign({
      id: String(admin.adminId),
      email: admin.email as string,
    });

    await admin.update({
      lastLogin: new Date(),
    });

    return flow(
      status(201),
      send('Admin logged in successfully', { admin, token }),
    )(res);
  } catch (error) {
    logger.error(
      {
        error,
      },
      'Failed to login admin',
    );

    return flow(
      status(500),
      sendError('Error login in admin', {
        message: (error as Error).message,
      }),
    )(res);
  }
};


export const getAllAdmins = async (req: AdminRequestAttr, res: Response) => {
  const logger = createLogger('GetAllAdmins', 'Admin');
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = (req.query.search as string) || '';
  const adminIdParam = req.params.adminId;

  try {

    const whereClause = search.trim() ? {
      [Op.or]: [
          { userName: { [Op.like]: `%${search}%` } },
          { fullName: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } }
        ]
    } : {};

    const admin = await Admin.findByPk(adminIdParam);

    if (!admin) {
      return flow(
        status(404),
        sendError('Admin not found', { code: ErrorCodes.USER_NOT_FOUND }),
      )(res);
    }

    let admins;
    let count;

    // If the authenticated admin is a super admin, return all admins
    if (admin.isSuperAdmin) {
      const result = await Admin.findAndCountAll({
        where: whereClause,
        limit,
        offset: (page - 1) * limit,
        attributes: { exclude: ['password'] },
      });

      admins = result.rows;
      count = result.count;
    } else {
      // Otherwise, return only the current admin
      admins = [admin];
      count = 1;
    }

    return flow(
      status(200),
      send('Admins fetched successfully', { 
        admins,
        meta: getResponseMeta({
          count,
          page,
          limit,
        }), 
      }),
    )(res);
  } catch (error) {
    logger.error({ error }, 'Failed to fetch admins');
    return flow(
      status(500),
      sendError('Error fetching admins', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const getSingleAdmin = async (req: AdminRequestAttr, res: Response) => {
  const logger = createLogger('GetSingleAdmin', 'Admin');
  const { adminId } = req.params;
  try {
    const admin = await Admin.findOne({
      where: { adminId },
      attributes: { exclude: ['password'] },
    });
    if (!admin) {
      return flow(
        status(404),
        sendError('Admin not found', { code: ErrorCodes.USER_NOT_FOUND }),
      )(res);
    }
    return flow(
      status(200),
      send('Admin fetched successfully', { admin }),
    )(res);
  }
  catch (error) {
    logger.error({ error }, 'Failed to fetch admin');
    return flow(
      status(500),
      sendError('Error fetching admin', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const getAllUsers = async (req: AdminRequestAttr, res: Response) => {
  const logger = createLogger('GetAllUsers', 'Admin');
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = (req.query.search as string) || '';

  try {
    const whereClause = search.trim() ? {
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { surname: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { role: { [Op.like]: `%${search}%` } }
      ]
    } : {};

    const { rows: users, count } = await User.findAndCountAll({
      where: whereClause,
      limit,
      offset: (page - 1) * limit,
      include: [
        {
          model: UserDocument,
          foreignKey: 'userId',
        },
      ],
    });

    return flow(
      status(200),
      send('Users fetched successfully', { 
        users,
        meta: getResponseMeta({
          count,
          page,
          limit,
        }),
      }),
    )(res);
  } catch (error) {
    logger.error({ error }, 'Failed to fetch users');
    return flow(
      status(500),
      sendError('Error fetching users', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const getSingleUser = async (req: AdminRequestAttr, res: Response) => {
  const logger = createLogger('GetSingleUser', 'Admin');
  const { userId } = req.params;
  try {
    const user = await User.findOne({
      where: { userId },
      include: [
        {
          model: UserDocument,
          foreignKey: 'userId',
        },
      ],
    });
    if (!user) {
      return flow(
        status(404),
        sendError('User not found', { code: ErrorCodes.USER_NOT_FOUND }),
      )(res);
    }
    return flow(
      status(200),
      send('User fetched successfully', { user }),
    )(res);
  }
  catch (error) {
    logger.error({ error }, 'Failed to fetch user');
    return flow(
      status(500),
      sendError('Error fetching user', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const getAllUsersDoc = async (req: AdminRequestAttr, res: Response) => {
  const logger = createLogger('GetAllUsersDoc', 'Admin');
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = (req.query.search as string) || '';
  try {
    const whereClause = search.trim() ? {
      [Op.or]: [
        { cacNumber: { [Op.like]: `%${search}%` } },
        { nin: { [Op.like]: `%${search}%` } },
        { role: { [Op.like]: `%${search}%` } }
      ]
    } : {};
    const { rows: docs, count } = await UserDocument.findAndCountAll({
      where: whereClause,
      limit,
      offset: (page - 1) * limit,
      order: [['createdAt', 'DESC']], // Sort by newest first
      include: [
        {
          model: User,
          foreignKey: 'userId'
        },
      ]
    });

    return flow(
      status(200),
      send('Users documents fetched successfully', { 
        docs,
        meta: getResponseMeta({
          count,
          page,
          limit,
        }),
      }),
    )(res);
  } catch (error) {
    logger.error({ error }, 'Failed to fetch users with documents');
    return flow(
      status(500),
      sendError('Error fetching users with documents', {
        message: (error as Error).message,
      }),
    )(res);
  }
};
export const getSingleUserDoc = async (req: AdminRequestAttr, res: Response) => {
  const logger = createLogger('GetSingleUserDoc', 'Admin');
  const { userId } = req.params;

  try {
    const doc = await UserDocument.findOne({
      where: { userId },
      include: [{
        model: User,
        foreignKey: 'userId'
      }]
    });

    if (!doc) {
      return flow(
        status(404),
        sendError('User document not found', { code: ErrorCodes.USER_NOT_FOUND }),
      )(res);
    }

    return flow(
      status(200),
      send('User document fetched successfully', { doc }),
    )(res);
  } catch (error) {
    logger.error({ error }, 'Failed to fetch user document');
    return flow(
      status(500),
      sendError('Error fetching user document', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const rejectUserDoc = async (req: AdminRequestAttr, res: Response) => {
  const logger = createLogger('RejectUserDoc', 'Admin');
  const { docId, userId } = req.params;

  try {
    const doc = await UserDocument.findOne({
      where: { userDocumentId: docId },
    });

    if (!doc) {
      return flow(
        status(404),
        sendError('Document not found', { code: ErrorCodes.DOCUMENT_NOT_FOUND }),
      )(res);
    }

    const user = await User.findByPk(doc?.userId, {
      attributes: ['email'],
    });

    await doc.update({ rejected: true });

    const mailOptions = {
      from: `"PropertyQuest" <${process.env.EMAIL_USERNAME}>`, // sender address
      to: user?.email, // list of receivers
      subject: 'Document Rejected', // Subject line
      html: generateRejectedDocEmailTemplate(doc?.reviewNote),
    };
    
    await transporter.sendMail(mailOptions);

    return flow(
      status(200),
      send('Document rejected successfully', { doc }),
    )(res);
  } catch (error) {
    logger.error({ error }, 'Failed to reject user document');
    return flow(
      status(500),
      sendError('Error rejecting user document', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const approveUserDoc = async (req: AdminRequestAttr, res: Response) => {
  const logger = createLogger('ApproveUserDoc', 'Admin');
  const { docId } = req.params;

  try {
    const doc = await UserDocument.findOne({
      where: { userDocumentId: docId },
    });

    if (!doc) {
      return flow(
        status(404),
        sendError('Document not found', { code: ErrorCodes.DOCUMENT_NOT_FOUND }),
      )(res);
    }

    const user = await User.findByPk(doc?.userId);

    await doc.update({ inReview: false });

    if (user && doc.role) {
      await user.update({ role: doc.role });
    }

    if (user) {
      const mailOptions = {
        from: `"PropertyQuest" <${process.env.EMAIL_USERNAME}>`, // sender address
        to: user.email, // list of receivers
        subject: 'Document Approved', // Subject line
        html: generateApprovedDocEmailTemplate(),
      };
      
      await transporter.sendMail(mailOptions);
    }


    return flow(
      status(200),
      send('Document approved successfully', { doc }),
    )(res);
  } catch (error) {
    logger.error({ error }, 'Failed to approve user document');
    return flow(
      status(500),
      sendError('Error approving user document', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const reviewUserDocNote = async (req: AdminRequestAttr, res: Response) => {
  const logger = createLogger('ReviewUserDocNote', 'Admin');
  const { docId } = req.params;
  const { reviewNote } = req.body;

  try {
    const doc = await UserDocument.findOne({
      where: { userDocumentId: docId },
    });

    if (!doc) {
      return flow(
        status(404),
        sendError('Document not found', { code: ErrorCodes.DOCUMENT_NOT_FOUND }),
      )(res);
    }

    await doc.update({ reviewNote });

    return flow(
      status(200),
      send('Document approved successfully', { doc }),
    )(res);
  } catch (error) {
    logger.error({ error }, 'Failed to approve user document');
    return flow(
      status(500),
      sendError('Error approving user document', {
        message: (error as Error).message,
      }),
    )(res);
  }
}


// Reset Password
export const resetPassword = async (req: AdminRequestAttr, res: Response) => {
  const { newPassword } = req.body;
  const logger = createLogger('ResetPassword', 'User');

  const adminId = req.AdminAuthTokenAttr?.id;

  try {

    const admin = await Admin.findByPk(adminId, {
      attributes: {
        exclude: ['password'],
      },
    });

    if (!adminId || !admin) {
      return flow(
        status(404),
        sendError('Admin not found', { code: ErrorCodes.USER_NOT_FOUND }),
      )(res);
    }

    const adminWithPassowrd = await Admin.findByPk(admin.adminId);
    
    await adminWithPassowrd?.update({
      password: newPassword,
    });


    return flow(status(200), send('Password reset successful'))(res);
  } catch (error) {
    logger.error({ error }, 'Reset password error');

    return flow(
      status(500),
      sendError('Error resetting password', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const deactivateUser = async (req: AdminRequestAttr, res: Response) => {
  const logger = createLogger('DeactivateUser', 'Admin');
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return flow(
        status(404),
        sendError('User not found', { code: ErrorCodes.USER_NOT_FOUND }),
      )(res);
    }
    await user.update({ active: false });

    return flow(
      status(200),
      send('User deactivated successfully', { user }),
    )(res);
  } catch (error) {
    logger.error({ error }, 'Failed to deactivate user');
    return flow(
      status(500),
      sendError('Error deactivating user', {
        message: (error as Error).message,  
      }),
    )(res);
  }
};

export const activateUser = async (req: AdminRequestAttr, res: Response) => {
  const logger = createLogger('ActivateUser', 'Admin');
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return flow(
        status(404),
        sendError('User not found', { code: ErrorCodes.USER_NOT_FOUND }),
      )(res);
    }
    await user.update({ active: true });

    return flow(
      status(200),
      send('User activated successfully', { user }),
    )(res);
  }
  catch (error) {
    logger.error({ error }, 'Failed to activate user');
    return flow(
      status(500),
      sendError('Error activating user', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const deactivateAdmin = async (req: AdminRequestAttr, res: Response) => {
  const logger = createLogger('DeactivateAdmin', 'Admin');
  const { adminId } = req.params;
  try {
    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      return flow(
        status(404),
        sendError('Admin not found', { code: ErrorCodes.USER_NOT_FOUND }),
      )(res);
    }
    await admin.update({ active: false });

    return flow(
      status(200),
      send('Admin deactivated successfully', { admin }),
    )(res);
  } catch (error) {
    logger.error({ error }, 'Failed to deactivate admin');
    return flow(
      status(500),
      sendError('Error deactivating admin', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const activateAdmin = async (req: AdminRequestAttr, res: Response) => {
  const logger = createLogger('ActivateAdmin', 'Admin');
  const { adminId } = req.params;
  try {
    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      return flow(
        status(404),
        sendError('Admin not found', { code: ErrorCodes.USER_NOT_FOUND }),
      )(res);
    }
    await admin.update({ active: true });
    return flow(
      status(200),
      send('Admin activated successfully', { admin }),
    )(res);
  }
  catch (error) {
    logger.error({ error }, 'Failed to activate admin');
    return flow(
      status(500),
      sendError('Error activating admin', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const getAllUsersProperty = async (req: AdminRequestAttr, res: Response) => {
  const logger = createLogger('GetAllUsersProperty', 'Admin');
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = (req.query.search as string) || '';
  const listingType = req.query.listingType as string;
  const title = req.query.title as string;
  const propertyType = req.query.propertyType as string;
  const active = req.query.active;

  let whereClause: WhereOptions = {};
  const conditions: any[] = [];

  if (listingType) {
    conditions.push(
      sequelizeConn.where(
        sequelizeConn.literal(`JSON_UNQUOTE(JSON_EXTRACT(JSON_UNQUOTE(details), '$.listingType'))`),
        listingType
      )
    );
  }

  if (title) {
    conditions.push(
      sequelizeConn.where(
        sequelizeConn.literal(`JSON_UNQUOTE(JSON_EXTRACT(JSON_UNQUOTE(details), '$.title'))`),
        { [Op.like]: `%${title}%` }
      )
    );
  }

  if (propertyType) {
    conditions.push(
      sequelizeConn.where(
        sequelizeConn.literal(`JSON_UNQUOTE(JSON_EXTRACT(JSON_UNQUOTE(details), '$.propertyType'))`),
        propertyType
      )
    );
  }

  if (active) {
    conditions.push(
      { active: { [Op.like]: `%${active}%` } }
    )
  }

  // Only add AND clause if there are conditions
  if (conditions.length > 0) {
    whereClause = {
      [Op.and]: conditions
    };
  }

  try {
    const whereClause = search.trim() ? {
      [Op.or]: [
        { active: { [Op.like]: `%${search}%` } }
      ]
    } : {};
    const { rows: properties, count } = await Property.findAndCountAll({
      where: whereClause,
      limit,
      offset: (page - 1) * limit,
      order: [['createdAt', 'DESC']], // Sort by newest first
      include: [
        {
          model: User,
          foreignKey: 'userId'
        },
        { 
          model: LikedProperty,
          required: false, // LEFT JOIN to include properties even if no likes
          where: {
            liked: true // Only get liked entries
          }
        }
      ],
      distinct: true, // Count distinct properties, not joined rows
    });

    return flow(
      status(200),
      send('Users properties fetched successfully', { 
        properties: properties,
        meta: getResponseMeta({
          count,
          page,
          limit,
        }),
      }),
    )(res);
  } catch (error) {
    logger.error({ error }, 'Failed to fetch users with properties');
    return flow(
      status(500),
      sendError('Error fetching users with properties', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const getPublishedProperties = async (req: AdminRequestAttr, res: Response) => {
  const logger = createLogger('GetPublishedProperties', 'Admin');
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = (req.query.search as string) || '';
  const listingType = req.query.listingType as string;
  const title = req.query.title as string;
  const propertyType = req.query.propertyType as string;

  let whereClause: WhereOptions = {};
  const conditions: any[] = [];

  // Add published filter (active = true means published)
  conditions.push({ active: true });

  // Handle generic search - search across title, city, and neighborhood
  if (search && search.trim()) {
    const searchTerm = search.trim();
    conditions.push(
      sequelizeConn.where(
        sequelizeConn.literal(
          `LOWER(JSON_UNQUOTE(JSON_EXTRACT(JSON_UNQUOTE(details), '$.title')))`
        ),
        Op.like,
        `%${searchTerm.toLowerCase()}%`
      )
    );
  }

  if (listingType) {
    conditions.push(
      sequelizeConn.where(
        sequelizeConn.literal(`JSON_UNQUOTE(JSON_EXTRACT(JSON_UNQUOTE(details), '$.listingType'))`),
        listingType
      )
    );
  }

  if (title) {
    conditions.push(
      sequelizeConn.where(
        sequelizeConn.literal(`JSON_UNQUOTE(JSON_EXTRACT(JSON_UNQUOTE(details), '$.title'))`),
        { [Op.like]: `%${title}%` }
      )
    );
  }

  if (propertyType) {
    conditions.push(
      sequelizeConn.where(
        sequelizeConn.literal(`JSON_UNQUOTE(JSON_EXTRACT(JSON_UNQUOTE(details), '$.propertyType'))`),
        propertyType
      )
    );
  }

  // Only add AND clause if there are conditions
  if (conditions.length > 0) {
    whereClause = {
      [Op.and]: conditions
    };
  }

  try {
    const { rows: properties, count } = await Property.findAndCountAll({
      where: whereClause,
      limit,
      offset: (page - 1) * limit,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          foreignKey: 'userId'
        },
        { 
          model: LikedProperty,
          required: false,
          where: {
            liked: true
          }
        }
      ],
      distinct: true,
    });

    return flow(
      status(200),
      send('Published properties fetched successfully', { 
        properties: properties,
        meta: getResponseMeta({
          count,
          page,
          limit,
        }),
      }),
    )(res);
  } catch (error) {
    logger.error({ error }, 'Failed to fetch published properties');
    return flow(
      status(500),
      sendError('Error fetching published properties', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const getUnpublishedProperties = async (req: AdminRequestAttr, res: Response) => {
  const logger = createLogger('GetUnpublishedProperties', 'Admin');
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = (req.query.search as string) || '';
  const listingType = req.query.listingType as string;
  const propertyType = req.query.propertyType as string;

  let whereClause: WhereOptions = {};
  const conditions: any[] = [];

  // Add unpublished filter (active = false means unpublished)
  conditions.push({ active: false });

  // Handle generic search - search across title, city, and neighborhood
  if (search && search.trim()) {
    const searchTerm = search.trim();
    conditions.push(
      sequelizeConn.where(
        sequelizeConn.literal(
          `LOWER(JSON_UNQUOTE(JSON_EXTRACT(JSON_UNQUOTE(details), '$.title')))`
        ),
        Op.like,
        `%${searchTerm.toLowerCase()}%`
      )
    );
  }

  if (listingType) {
    conditions.push(
      sequelizeConn.where(
        sequelizeConn.literal(`JSON_UNQUOTE(JSON_EXTRACT(JSON_UNQUOTE(details), '$.listingType'))`),
        Op.eq,
        listingType
      )
    );
  }

  if (propertyType) {
    conditions.push(
      sequelizeConn.where(
        sequelizeConn.literal(`JSON_UNQUOTE(JSON_EXTRACT(JSON_UNQUOTE(details), '$.propertyType'))`),
        Op.eq,
        propertyType
      )
    );
  }

  // Combine all conditions with AND
  if (conditions.length > 0) {
    whereClause = {
      [Op.and]: conditions
    };
  }

  try {
    const { rows: properties, count } = await Property.findAndCountAll({
      where: whereClause,
      limit,
      offset: (page - 1) * limit,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          foreignKey: 'userId'
        },
        { 
          model: LikedProperty,
          required: false,
          where: {
            liked: true
          }
        }
      ],
      distinct: true,
    });

    return flow(
      status(200),
      send('Unpublished properties fetched successfully', { 
        properties: properties,
        meta: getResponseMeta({
          count,
          page,
          limit,
        }),
      }),
    )(res);
  } catch (error) {
    logger.error({ error }, 'Failed to fetch unpublished properties');
    return flow(
      status(500),
      sendError('Error fetching unpublished properties', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const getSingleUserProperty = async (req: AdminRequestAttr, res: Response) => {
  const logger = createLogger('GetSingleUserProperty', 'Admin');
  const { propertyId } = req.params;

  try {
    const property = await Property.findOne({
      where: { propertyId },
      order: [['createdAt', 'DESC']], // Sort by newest first
      include: [
        {
          model: User,
          foreignKey: 'userId'
        },
        { 
          model: LikedProperty,
          required: false, // LEFT JOIN to include properties even if no likes
          where: {
            liked: true // Only get liked entries
          }
        }
      ],
    });

    if (!property) {
      return flow(
        status(404),
        sendError('User property not found', { code: ErrorCodes.PROPERTY_NOT_FOUND }),
      )(res);
    }

    return flow(
      status(200),
      send('User property fetched successfully', { property: property }),
    )(res);
  } catch (error) {
    logger.error({ error }, 'Failed to fetch user property');
    return flow(
      status(500),
      sendError('Error fetching user property', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const publishProperty = async (req: AdminRequestAttr, res: Response) => {
  const logger = createLogger('publishedProperty', 'Admin');
  const { propertyId } = req.params;
  try {
    const property = await Property.findByPk(propertyId);
    if (!property) {
      return flow(
        status(404),
        sendError('Property not found', { code: ErrorCodes.PROPERTY_NOT_FOUND }),
      )(res);
    }
    await property.update({ active: true });

    return flow(
      status(200),
      send('Property published successfully', { property }),
    )(res);
  }
  catch (error) {
    logger.error({ error }, 'Failed to publish property');
    return flow(
      status(500),
      sendError('Error publishing property', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const unpublishProperty = async (req: AdminRequestAttr, res: Response) => {
  const logger = createLogger('unPublishedProperty', 'Admin');
  const { propertyId } = req.params;
  try {
    const property = await Property.findByPk(propertyId);
    if (!property) {
      return flow(
        status(404),
        sendError('Property not found', { code: ErrorCodes.PROPERTY_NOT_FOUND }),
      )(res);
    }
    await property.update({ active: false });

    return flow(
      status(200),
      send('Property unpublished successfully', { property }),
    )(res);
  }
  catch (error) {
    logger.error({ error }, 'Failed to unpublish property');
    return flow(
      status(500),
      sendError('Error unpublishing property', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const reviewPropertyNote = async (req: AdminRequestAttr, res: Response) => {
  const logger = createLogger('reviewPropertyNote', 'Admin');
  const { propertyId } = req.params;
  const { reviewNote } = req.body;

  try {
    const property = await Property.findOne({
      where: { propertyId },
    });

    if (!property) {
      return flow(
        status(404),
        sendError('Property not found', { code: ErrorCodes.PROPERTY_NOT_FOUND }),
      )(res);
    }

    await property.update({ reviewNote });

    return flow(
      status(200),
      send('Property note review successfully', { property }),
    )(res);
  } catch (error) {
    logger.error({ error }, 'Failed to review property note');
    return flow(
      status(500),
      sendError('Error reviewing property note', {
        message: (error as Error).message,
      }),
    )(res);
  }
}