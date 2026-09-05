import { flow } from 'lodash';

import { RequestAttr, Response } from '../../interfaces/req.interface';
import { status, send, sendError } from '../../utils/https.utils';
import { UserToken } from '../../utils';
import { sequelizeConn } from '../../config/database';
import { createLogger } from '../../utils/logger';
import { User, UserPassword, UserDocument } from '../../models';
import {
  CreateUserSchema,
  UserLogingSchema,
  UserAttr,
} from '../../interfaces/user.interface';
import { z } from 'zod';
import { baseUrl } from '../../utils/baseUrl';
import { ErrorCodes } from '../../utils';
import { 
  saveFile, 
  transporter, 
  generateEmailVerificationHtml, 
  generateVerifiedEmailTemplate, 
  generateEmailResentVerificationHtml, 
  generateEmailResetPasswordHtml,
  generateEmailPasswordUpdatedHtml 
} from '../utils';

export const createUser = async (req: RequestAttr, res: Response) => {
  const {
    name,
    surname,
    email,
    password,
    role,
    phone,
    cacNumber,
    nin,
    isAffiliated,
    businessDocumentUrl,
    affiliationDocumentUrl,
  } = req.body as z.infer<typeof CreateUserSchema>;

  const logger = createLogger('CreateUser', 'User');

  try {
    const generatedCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString(); // 10 minutes

    const result = await sequelizeConn.transaction(async (t) => {
      const userExists = await User.findOne({
        where: { email: email },
      });

      if (userExists) {
        logger.error({ email }, 'User already exists');
        throw new Error('USER_ALREADY_EXISTS');
      }

      const userData: UserAttr = {
        name,
        surname,
        email,
        phone,
        role,
        type: 'local',
        active: true,
        isVerified: false,
        verificationCode: generatedCode,
        verificationCodeExpiry: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      };

      const user = await User.create(userData, { transaction: t });

      await UserPassword.create(
        {
          userId: user.userId,
          password,
        },
        { transaction: t },
      );

      return user;
    });

    const token = UserToken.sign({
      id: String(result.userId),
    });

    const mailOptions = {
      from: `"PropertyQuest" <${process.env.EMAIL_USERNAME}>`, // sender address
      to: email, // list of receivers
      subject: 'Email Verification', // Subject line
      html: generateEmailVerificationHtml(generatedCode),
    };

    await transporter.sendMail(mailOptions);

    return flow(
      status(201),
      send('User created successfully. Please verify your email.', {
        user: result,
        token,
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
        sendError('User already exists', {
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

export const updateUser = async (req: RequestAttr, res: Response) => {
  const { userId } = req.params;
  const { name, surname, email, phone, role, isAffiliated, cacNumber, nin } =
    req.body as z.infer<typeof CreateUserSchema>;

  const files = req.files as {
    businessDocument?: Express.Multer.File[];
    affiliationDocument?: Express.Multer.File[];
  };

  const logger = createLogger('UpdateUser', 'User');

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return flow(
        status(404),
        sendError('User not found', { code: ErrorCodes.USER_NOT_FOUND }),
      )(res);
    }

    // Process files
    let businessDocumentUrl: string | null = null;
    let affiliationDocumentUrl: string | null = null;

    if (files.businessDocument) {
      businessDocumentUrl = await saveFile(
        files.businessDocument[0].buffer,
        files.businessDocument[0].mimetype,
        'bussinessdocuments',
      );
      logger.info(
        { businessDocumentUrl },
        'Business Document file uploaded successfully',
      );
    }

    if (files.affiliationDocument) {
      affiliationDocumentUrl = await saveFile(
        files.affiliationDocument[0].buffer,
        files.affiliationDocument[0].mimetype,
        'affiliationdocuments',
      );
      logger.info(
        { affiliationDocumentUrl },
        'Affiliation Document file uploaded successfully',
      );
    }

    let documents;
    if (role !== 'user') {
      documents = await UserDocument.create({
        userId: user.userId,
        cacNumber,
        nin,
        businessDocumentUrl: businessDocumentUrl as string,
        isAffiliated,
        affiliationDocumentUrl: affiliationDocumentUrl as string,
        inReview: true,
        role: role,
      });
    }

    await user.update({
      name: name,
      surname: surname,
      email: email,
      phone: phone,
    });

    return flow(
      status(200),
      send('User account updated successfully', { user, documents }),
    )(res);
  } catch (error) {
    logger.error(
      {
        error,
      },
      'Failed to update user',
    );

    return flow(
      status(500),
      sendError('Error updating user', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const updateDocument = async (req: RequestAttr, res: Response) => {
  const { userId } = req.params;
  const { cacNumber, nin, isAffiliated, role } = req.body;
  const files = req.files as {
    businessDocument?: Express.Multer.File[];
    affiliationDocument?: Express.Multer.File[];
  };

  const logger = createLogger('UpdateDocument', 'User');

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return flow(
        status(404),
        sendError('User not found', { code: ErrorCodes.USER_NOT_FOUND }),
      )(res);
    }

    const userDocument = await UserDocument.findOne({ where: { userId } });

    if (!userDocument) {
      return flow(
        status(404),
        sendError('User document not found', { code: ErrorCodes.DOCUMENT_NOT_FOUND }),
      )(res);
    }

    let businessDocumentUrl = userDocument.businessDocumentUrl;
    let affiliationDocumentUrl = userDocument.affiliationDocumentUrl;

    if (files?.businessDocument) {
      businessDocumentUrl = await saveFile(
        files.businessDocument[0].buffer,
        files.businessDocument[0].mimetype,
        'bussinessdocuments',
      );
      logger.info({ businessDocumentUrl }, 'Business Document updated');
    }

    if (files?.affiliationDocument) {
      affiliationDocumentUrl = await saveFile(
        files.affiliationDocument[0].buffer,
        files.affiliationDocument[0].mimetype,
        'affiliationdocuments',
      );
      logger.info({ affiliationDocumentUrl }, 'Affiliation Document updated');
    }

    await userDocument.update({
      inReview: true,
      rejected: false,
      role: role,
      userId: user.userId,
      cacNumber,
      nin,
      businessDocumentUrl: businessDocumentUrl as string,
      isAffiliated,
      affiliationDocumentUrl: affiliationDocumentUrl as string,
    });

    return flow(
      status(200),
      send('User document updated successfully', { user, userDocument }),
    )(res);
  } catch (error) {
    logger.error({ error }, 'Failed to update user document');
    return flow(
      status(500),
      sendError('Error updating user document', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const verifyEmail = async (req: RequestAttr, res: Response) => {
  const { userId, code } = req.body;
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return flow(
        status(404),
        sendError('User not found', { code: ErrorCodes.USER_NOT_FOUND }),
      )(res);
    }

    if (user.verificationCode !== code) {
      return flow(
        status(400),
        sendError('Incorrect verification code', {
          code: ErrorCodes.INVALID_VERIFICATION_CODE,
        }),
      )(res);
    }

    if (Date.now() > new Date(user.verificationCodeExpiry as Date).getTime()) {
      return flow(
        status(410),
        sendError('Verification code expired', {
          code: ErrorCodes.VERIFICATION_CODE_EXPIRED,
        }),
      )(res);
    }

    await user.update({
      isVerified: true,
      verificationCode: undefined,
      verificationCodeExpiry: undefined,
    });

    const mailOptions = {
      from: `"PropertyQuest" <${process.env.EMAIL_USERNAME}>`, // sender address
      to: user.email, // list of receivers
      subject: 'Email Verified', // Subject line
      html: generateVerifiedEmailTemplate(),
    };

    await transporter.sendMail(mailOptions);
    return flow(
      status(200),
      send('Email verified successfully', {
        user: user,
        token: UserToken.sign({
          id: String(user.userId),
        }),
      }),
    )(res);
  } catch (error) {
    return flow(
      status(500),
      sendError('Verification failed', { message: (error as Error).message }),
    )(res);
  }
};

export const resendVerificationCode = async (
  req: RequestAttr,
  res: Response,
) => {
  const { email } = req.body;

  const resendVerificationCode = Math.floor(
    100000 + Math.random() * 900000,
  ).toString();

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return flow(
        status(404),
        sendError('User not found', { code: ErrorCodes.USER_NOT_FOUND }),
      )(res);
    }

    if (user.isVerified) {
      return flow(
        status(400),
        sendError('Email already verified', {
          code: ErrorCodes.EMAIL_ALREADY_VERIFIED,
        }),
      )(res);
    }

    await user.update({
      verificationCode: resendVerificationCode,
      verificationCodeExpiry: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    });

    const mailOptions = {
      from: `"PropertyQuest" <${process.env.EMAIL_USERNAME}>`, // sender address
      to: email, // list of receivers
      subject: 'Resent Email Verification', // Subject line
      html: generateEmailResentVerificationHtml(resendVerificationCode),
    };

    await transporter.sendMail(mailOptions);

    return flow(
      status(200),
      send('Verification code resent successfully'),
    )(res);
  } catch (error) {
    return flow(
      status(500),
      sendError('Failed to resend verification code', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const loginUser = async (req: RequestAttr, res: Response) => {
  const { email, password } = req.body as z.infer<typeof UserLogingSchema>;

  const logger = createLogger('LoginUser', 'User');

  try {
    const user = await User.findOne({
      where: { email: email, active: true },
    });

    if (!user) {
      return flow(
        status(404),
        sendError('User not found', { code: ErrorCodes.USER_NOT_FOUND }),
      )(res);
    }

    const userPass = await UserPassword.findOne({
      where: { userId: user.userId },
    });

    if (!userPass || !userPass.comparePassword(password)) {
      logger.error({ userPass }, 'Unauthorized access');
      return flow(
        status(401),
        sendError('Invalid password', {
          code: ErrorCodes.INVALID_PASSWORD,
        }),
      )(res);
    }

    const token = UserToken.sign({
      id: String(user.userId),
    });

    await user.update({ lastLogin: new Date() });

    return flow(
      status(201),
      send('User logged in successfully', { user, token }),
    )(res);
  } catch (error) {
    logger.error(
      {
        error,
      },
      'Failed to login user',
    );

    return flow(
      status(500),
      sendError('Error login in user', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

// Forgot Password
export const forgotPassword = async (req: RequestAttr, res: Response) => {
  const { email } = req.body;
  const logger = createLogger('ForgotPassword', 'User');

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return flow(
        status(404),
        sendError('User not found', { code: ErrorCodes.USER_NOT_FOUND }),
      )(res);
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await user.update({
      resetPasswordCode: resetCode,
      resetPasswordCodeExpiry: expiry,
    });

    const mailOptions = {
      from: `"PropertyQuest" <${process.env.EMAIL_USERNAME}>`, // sender address
      to: email, // list of receivers
      subject: 'Reset Your Password', // Subject line
      html: generateEmailResetPasswordHtml(resetCode),
    };

    await transporter.sendMail(mailOptions);

    return flow(
      status(200),
      send('Password reset code sent to your email', { email }),
    )(res);
  } catch (error) {
    logger.error({ error }, 'Forgot password error');

    return flow(
      status(500),
      sendError('Error processing forgot password', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

// Reset Password
export const resetPassword = async (req: RequestAttr, res: Response) => {
  const { email, code, newPassword } = req.body;
  const logger = createLogger('ResetPassword', 'User');

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return flow(
        status(404),
        sendError('User not found', { code: ErrorCodes.USER_NOT_FOUND }),
      )(res);
    }

    if (user.resetPasswordCode !== code) {
      return flow(
        status(400),
        sendError('Invalid reset code', {
          code: ErrorCodes.INVALID_VERIFICATION_CODE,
        }),
      )(res);
    }

    if (Date.now() > new Date(user.resetPasswordCodeExpiry as Date).getTime()) {
      return flow(
        status(400),
        sendError('Expired reset code', {
          code: ErrorCodes.VERIFICATION_CODE_EXPIRED,
        }),
      )(res);
    }

    // Update password
    await UserPassword.update(
      { password: newPassword },
      { where: { userId: user.userId } },
    );

    // Clear reset code
    await user.update({
      resetPasswordCode: undefined,
      resetPasswordCodeExpiry: undefined,
    });

    const mailOptions = {
      from: `"PropertyQuest" <${process.env.EMAIL_USERNAME}>`, // sender address
      to: user.email, // list of receivers
      subject: 'Password Updated', // Subject line
      html: generateEmailPasswordUpdatedHtml(),
    };

    await transporter.sendMail(mailOptions);

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

export const checkEmail = async (req: RequestAttr, res: Response) => {
  const { email } = req.body;
  const logger = createLogger('CheckEmail', 'User');

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return flow(
        status(404),
        sendError('User not found', { code: ErrorCodes.USER_NOT_FOUND }),
      )(res);
    }

    return flow(
      status(200),
      send('Email is available', { code: ErrorCodes.USER_ALREADY_EXISTS }),
    )(res);
  } catch (error) {
    logger.error({ error }, 'Error checking email');

    return flow(
      status(500),
      sendError('Error checking email', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const googleAuthCallback = async (req: RequestAttr, res: Response) => {
  const logger = createLogger('GoogleAuthCallback', 'User');
  try {
    if (!req.user) {
      return flow(
        status(404),
        sendError('User not found', { code: ErrorCodes.USER_NOT_FOUND }),
      )(res);
    }

    const user = await User.findOne({
      where: { email: req.user.email },
    });

    if (!user) {
      return flow(
        status(404),
        sendError('User not found', { code: ErrorCodes.USER_NOT_FOUND }),
      )(res);
    }
    const token = UserToken.sign({
      id: String(user.userId),
    });

    res.redirect(
      `${baseUrl}?token=${token}&user=${encodeURIComponent(JSON.stringify(req.user))}`,
    );

    await user.update({ lastLogin: new Date() });

    return flow(status(200))(res);
  } catch (error) {
    logger.error(
      {
        error,
      },
      'Failed to login user',
    );

    return flow(
      status(500),
      sendError('Error login in user', {
        message: (error as Error).message,
      }),
    )(res);
  }
};
