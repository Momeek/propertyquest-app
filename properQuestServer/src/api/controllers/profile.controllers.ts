import { flow } from 'lodash';

import { RequestAttr, Response } from '../../interfaces/req.interface';
import { status, send, sendError } from '../../utils/https.utils';
import { createLogger } from '../../utils/logger';
import { User, UserDocument, UserPassword } from '../../models';
import { ErrorCodes } from '../../utils';
import { saveFile } from '../utils';

export const updateProfile = async (req: RequestAttr, res: Response) => {
  const { 
    name, surname, phone, 
    userId, gender, dateOfbirth, 
    professionalInfo, location, 
    socialMedia  
  } = req.body;

  const logger = createLogger('UpdateUser', 'User');

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return flow(
        status(404),
        sendError('User not found', { code: ErrorCodes.USER_NOT_FOUND }),
      )(res);
    }
    
    await user.update({
      name,
      surname,
      phone,
      gender,
      dateOfbirth,
      professionalInfo,
      location,
      socialMedia
    });

    return flow(
      status(200),
      send('Profile updated successfully', {
        user: user,
      }),
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
      sendError('Profile update failed', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const getProfile = async (req: RequestAttr, res: Response) => {
  const logger = createLogger('GetUser', 'User');

  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
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
      send('User fetched successfully', {
        user: user,
      }),
    )(res);
  } catch (error) {
    logger.error(
      {
        error,
      },
      'Failed to get user',
    );

    return flow(
      status(500),
      sendError('Failed to get user', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const updatePassword = async (req: RequestAttr, res: Response) => {
  const { password, userId } = req.body;

  const logger = createLogger('UpdateUserPassword', 'User');

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return flow(
        status(404),
        sendError('User not found', { code: ErrorCodes.USER_NOT_FOUND }),
      )(res);
    }
    // Check if the new password is the same as the current password
    const currentPassword = await UserPassword.findOne({
      where: { userId: user.userId },
    });

    if (currentPassword?.password === password) {
      return flow(
        status(400),
        sendError('Same password', { code: ErrorCodes.SAME_PASSWORD }),
      )(res);
    }

    // Update password
    await UserPassword.update(
      { password: password },
      { where: { userId: user.userId } },
    );

    return flow(status(200), send('Password updated successfully'))(res);
  } catch (error) {
    logger.error(
      {
        error,
      },
      'Failed to update user password',
    );

    return flow(
      status(500),
      sendError('Password update failed', {
        message: (error as Error).message,
      }),
    )(res);
  }
};

export const uploadProfilePicture = async (req: RequestAttr, res: Response) => {
  const logger = createLogger('UploadProfilePicture', 'User');

  const fileBuffer = req.file?.buffer;
  const fileType = req.file?.mimetype ?? 'application/pdf';

  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);

    if (!user) {
      return flow(
        status(404),
        sendError('User not found', { code: ErrorCodes.USER_NOT_FOUND }),
      )(res);
    }

    // Handle file upload if provided
    let photoUrl: string | null = null;
    if (fileBuffer && fileType) {
      photoUrl = await saveFile(fileBuffer, fileType, 'avatars');
      logger.info({ avatarUrl: photoUrl }, 'Photo file uploaded successfully');
    }

    await user.update({
      avatarUrl: photoUrl as string,
    });

    return flow(
      status(200),
      send('Profile picture uploaded successfully', {
        user: user,
      }),
    )(res);
  } catch (error) {
    logger.error(
      {
        error,
      },
      'Failed to upload profile picture',
    );

    return flow(
      status(500),
      sendError('Profile picture upload failed', {
        message: (error as Error).message,
      }),
    )(res);
  }
};
