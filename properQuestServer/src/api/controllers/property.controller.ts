import { flow } from 'lodash';
import { RequestAttr, Response } from '../../interfaces/req.interface';
import { PropertyAttr } from '../../interfaces/property.interface';
import { Property, User, Message, LikedProperty } from '../../models';
import { status, send, sendError } from '../../utils/https.utils';
import { createLogger } from '../../utils/logger';
import { ErrorCodes, getResponseMeta } from '../../utils';
import { saveFile } from '../utils';
import { WhereOptions } from 'sequelize/types';
import { Op } from 'sequelize';
import { sequelizeConn } from '../../config/database';
import dayjs from 'dayjs';

const normalizeFiles = (
  files: Express.Multer.File[],
  fieldNames: string[]
) => {
  return files.filter((f) => fieldNames.includes(f.fieldname));
};

export const createProperty = async (req: RequestAttr, res: Response) => {
  const logger = createLogger('CreateProperty', 'User');

  try {
    const { userId } = req.params;

    if (!userId) {
      return flow(
        status(400),
        sendError('User ID is required')
      )(res);
    }

    const allFiles = (req.files as Express.Multer.File[]) || [];

    const imageFiles = normalizeFiles(allFiles, [
      'images',
      'image',
      'file',
      'files',
      'files[]',
      'photo',
      'blob',
    ]);

    const floorPlanFiles = normalizeFiles(allFiles, [
      'floorPhoto',
      'floorPlan',
      'floorImage',
      'photo',
      'file',
    ]);

    const parseJSON = (value: any) => {
      try {
        return typeof value === 'string' ? JSON.parse(value) : value;
      } catch {
        return null;
      }
    };

    const details = parseJSON(req.body.details);
    const location = parseJSON(req.body.location);
    const pricing = parseJSON(req.body.pricing);
    const mediaData = parseJSON(req.body.media);

    if (!details || !location || !pricing || !mediaData) {
      return flow(
        status(400),
        sendError('Invalid or missing credentials')
      )(res);
    }

    const uploadedImages: Array<{ url: string; isFeatured: boolean }> = [];

    if (imageFiles.length) {
      const bodyImages = mediaData?.images || [];

      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];

        const url = await saveFile(
          file.buffer,
          file.mimetype,
          'propertyimages'
        );

        uploadedImages.push({
          url,
          isFeatured: bodyImages[i]?.isFeatured || false,
        });
      }
    }

    let floorPlanUrl: string | null = null;

    if (floorPlanFiles.length) {
      const file = floorPlanFiles[0];

      floorPlanUrl = await saveFile(
        file.buffer,
        file.mimetype,
        'propertyfloorimages'
      );
    }

    const media: PropertyAttr['media'] = {
      images: uploadedImages.length ? uploadedImages : mediaData?.images,
      floorPlan: floorPlanUrl
        ? { url: floorPlanUrl }
        : mediaData?.floorPlan,
      videoTourUrl: mediaData?.videoTourUrl,
      virtualTourUrl: mediaData?.virtualTourUrl,
    };

    const newProperty = await Property.create({
      userId,
      details,
      media,
      location,
      pricing,
      active: false
    });

    return flow(
      status(201),
      send('Property created successfully', { property: newProperty })
    )(res);

  } catch (error) {
    logger.error({ error }, 'Failed to create property');

    return flow(
      status(500),
      sendError('Failed creating property', {
        message: (error as Error).message,
      })
    )(res);
  }
};

export const updateProperty = async (req: RequestAttr, res: Response) => {
  const logger = createLogger('UpdateProperty', 'User');
  try {
    const { propertyId } = req.params;
    const allFiles = (req.files as Express.Multer.File[]) || [];

    const imageFiles = normalizeFiles(allFiles, [
      'images',
      'image',
      'file',
      'files',
      'files[]',
      'photo',
      'blob',
    ]);

    const floorPlanFiles = normalizeFiles(allFiles, [
      'floorPhoto',
      'floorPlan',
      'floorImage',
      'photo',
      'file',
    ]);

    const parseJSON = (value: any) => {
      try {
        return typeof value === 'string' ? JSON.parse(value) : value;
      } catch {
        return null;
      }
    };

    const details = parseJSON(req.body.details);
    const location = parseJSON(req.body.location);
    const pricing = parseJSON(req.body.pricing);
    const mediaData = parseJSON(req.body.media);
    
    if (!details || !location || !pricing || !mediaData) {
      return flow(
        status(400),
        sendError('Invalid or missing credentials')
      )(res);
    }

    const property = await Property.findByPk(propertyId);

    if (!property) {
      return flow(
        status(404),
        sendError('Property not found', { 
          code: ErrorCodes.PROPERTY_NOT_FOUND 
        }),
      )(res);
    }

    const uploadedImages: Array<{ url: string; isFeatured: boolean }> = [];
    if (imageFiles.length) {
      const bodyImages = mediaData?.images || []; 
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const url = await saveFile(
          file.buffer,
          file.mimetype,
          'propertyimages'
        );
        uploadedImages.push({
          url,
          isFeatured: bodyImages[i]?.isFeatured || false,
        });
      } 
    }

    let floorPlanUrl: string | null = null;
    if (floorPlanFiles.length) {
      const file = floorPlanFiles[0];
      floorPlanUrl = await saveFile(
        file.buffer,
        file.mimetype,
        'propertyfloorimages'
      );
    }
    const media: PropertyAttr['media'] = {
      images: uploadedImages.length ? uploadedImages : mediaData?.images,
      floorPlan: floorPlanUrl
        ? { url: floorPlanUrl }
        : mediaData?.floorPlan,
      videoTourUrl: mediaData?.videoTourUrl,
      virtualTourUrl: mediaData?.virtualTourUrl,
    };

    await property.update({
      details,
      media,
      location,
      pricing,
    });
    return flow(
      status(200),
      send('Property updated successfully', { property })
    )(res);
  } catch (error) {
    logger.error({ error }, 'Failed to update property');

    return flow(
      status(500),
      sendError('Failed updating property', {
        message: (error as Error).message,
      })
    )(res);
  }
};

export const getUserProperty = async (req: RequestAttr, res: Response) => {
  const { userId } = req.params;
  const logger = createLogger('GetUserProperty', 'User');
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const title = req.query.title as string;
  const createdAt = req.query.createdAt as string;

  let whereClause: WhereOptions = { userId };
  const conditions: any[] = [];

  if (title) {
    conditions.push(
      sequelizeConn.where(
        sequelizeConn.literal(`JSON_UNQUOTE(JSON_EXTRACT(JSON_UNQUOTE(details), '$.title'))`),
        { [Op.like]: `%${title}%` }
      )
    );
  }

  if (createdAt) {
    conditions.push(
      sequelizeConn.where(
        sequelizeConn.literal(`DATE(createdAt)`),
        createdAt
      )
    );
  }

  if (conditions.length > 0) {
    whereClause = {
      [Op.and]: conditions,
    };
  }

  try {
    // Find all properties belonging to the user
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

    if (!properties || properties.length === 0) {
      return flow(
        status(404),
        sendError('No properties found for this user', { 
          code: ErrorCodes.PROPERTY_NOT_FOUND 
        }),
      )(res);
    }

    // Calculate total likes per property
    const likedPropertyCount = (properties ?? []).reduce((acc, prop) => {
      const likedArray = (prop as any).LikedProperties;
      const count = Array.isArray(likedArray) ? likedArray.length : 0;
      
      (prop as any).dataValues = (prop as any).dataValues ?? {};
      (prop as any).dataValues.likedCount = count;

      return acc + count;
    }, 0);

    // Calculate total likes per property and group by month
    const likedCountByMonth = properties.reduce((acc, prop) => {
      const likedArray = (prop as any).LikedProperties;
      
      if (Array.isArray(likedArray) && likedArray.length > 0) {
        likedArray.forEach((likedObj: any) => {
          if (likedObj && likedObj.liked === true) {
            const createdAtMonth = dayjs(likedObj.createdAt).format('MMM');
            acc[createdAtMonth] = (acc[createdAtMonth] || 0) + 1;
          }
        });
        
        (prop as any).dataValues.likedAtMonth = dayjs(likedArray[0].createdAt).format('MMM');
      } else {
        (prop as any).dataValues.likedAtMonth = null;
      }
    
      return acc;
    }, {} as Record<string, number>);

    return flow(
      status(200),
      send('User properties retrieved successfully', { 
        properties,
        likedPropertyCount,
        likedCountByMonth,
        meta: getResponseMeta({
          count,
          page,
          limit,
        }),
      }),
    )(res);
  } catch (error) {
    logger.error(
      { error, userId },
      'Failed to fetch user properties'
    );

    return flow(
      status(500),
      sendError('Error fetching user properties', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const messageAgent = async (req: RequestAttr, res: Response) => {
  const { agentId } = req.params;
  const {
    name,
    email,
    phone, 
    message,
    userId,
    propertyId 
  } = req.body;
  const logger = createLogger('MessageAgent', 'User');

  try {
    // Find agent user
    const agent = await User.findByPk(agentId);
    if (!agent) {
      return flow(
        status(404),
        sendError('Agent not found', { code: ErrorCodes.USER_NOT_FOUND }),
      )(res);
    }

    const newMessage = await Message.create({
      name,
      email,
      phone, 
      message,
      agentId,
      userId,
      propertyId 
    });

    return flow(
      status(200),
      send('Message sent to agent successfully', newMessage),
    )(res);
  } catch (error) {
    logger.error(
      { error, agentId },
      'Failed to send message to agent'
    );

    return flow(
      status(500),
      sendError('Error sending message to agent', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const likedProperty = async (req: RequestAttr, res: Response) => {
  const { userId, propertyId, liked, likedId } = req.body;
  const logger = createLogger('LikedProperty', 'User');

  try {
    // Validate input
    if (!userId || !propertyId || typeof liked !== 'boolean') {
      return flow(
        status(400),
        sendError('userId, propertyId and liked are required', { 
          code: 'INVALID_INPUT' 
        }),
      )(res);
    }

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return flow(
        status(404),
        sendError('User not found', { code: ErrorCodes.USER_NOT_FOUND }),
      )(res);
    }

    // Check if property exists
    const property = await Property.findByPk(propertyId);
    if (!property) {
      return flow(
        status(404),
        sendError('Property not found', { code: ErrorCodes.PROPERTY_NOT_FOUND }),
      )(res);
    }

    // Update liked status
    let updatedProperty;
    if (likedId) {
      updatedProperty = await LikedProperty.update({ liked }, {
        where: { userId, propertyId }
      });
    } else {
      updatedProperty = await LikedProperty.create({ 
        liked,
        userId, 
        propertyId
      });
    }

    return flow(
      status(200),
      send('Property like status updated successfully', { updatedProperty }),
    )(res);
  } catch (error) {
    logger.error(
      { error, userId, propertyId, liked },
      'Failed to update liked property status'
    );

    return flow(
      status(500),
      sendError('Error updating liked property status', {
        message: (error as Error).message,
      }),
    )(res);
  }
}

export const getLikedProperty = async (req: RequestAttr, res: Response) => {
  const { userId } = req.params;
  const logger = createLogger('GetLikedProperty', 'User');
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    // Find all liked properties for the user
    const { rows: likedProperties, count } = await LikedProperty.findAndCountAll({
      where: { userId, liked: true },
      limit,
      offset: (page - 1) * limit,
      include: [
        {
          model: Property,
          foreignKey: 'propertyId',
          where: { active: true },
          include: [
            {
              model: User,
              foreignKey: 'userId'
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    if (!likedProperties || likedProperties.length === 0) {
      return flow(
        status(404),
        sendError('No liked properties found for this user', {
          code: ErrorCodes.PROPERTY_NOT_FOUND
        }),
      )(res);
    }

    return flow(
      status(200),
      send('Liked properties retrieved successfully', { 
        likedProperties,
        meta: getResponseMeta({
          count,
          page,
          limit,
        }),
      }),
    )(res);
  } catch (error) {
    logger.error(
      { error, userId },
      'Failed to fetch liked properties'
    );

    return flow(
      status(500),
      sendError('Error fetching liked properties', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const deleteLikedProperty = async (req: RequestAttr, res: Response) => {
  const { likedId } = req.params;
  const logger = createLogger('DeleteLikedProperty', 'User');

  try {
    // Find liked property by ID
    const likedProperty = await LikedProperty.findByPk(likedId);
    if (!likedProperty) {
      return flow(
        status(404),
        sendError('Liked property not found', { 
          code: ErrorCodes.PROPERTY_NOT_FOUND 
        }),
      )(res);
    }

    // Delete liked property
    await likedProperty.destroy();

    return flow(
      status(200),
      send('Liked property deleted successfully'),
    )(res);
  } catch (error) {
    logger.error(
      { error, likedId },
      'Failed to delete liked property'
    );

    return flow(
      status(500),
      sendError('Error deleting liked property', {
        message: (error as Error).message,
      }),
    )(res);
  }
}

export const deleteProperty = async (req: RequestAttr, res: Response) => {
  const { propertyId } = req.params;
  const logger = createLogger('DeleteProperty', 'User');

  try {
    // Find property by ID
    const property = await Property.findByPk(propertyId);
    if (!property) {
      return flow(
        status(404),
        sendError('Property not found', { 
          code: ErrorCodes.PROPERTY_NOT_FOUND 
        }),
      )(res);
    }

    // Delete property
    await property.destroy();

    return flow(
      status(200),
      send('Property deleted successfully'),
    )(res);
  } catch (error) {
    logger.error(
      { error, likedId: propertyId },
      'Failed to delete property'
    );

    return flow(
      status(500),
      sendError('Error deleting property', {
        message: (error as Error).message,
      }),
    )(res);
  }
}