import { join, resolve } from 'path';
import fs from 'fs';
import { v4 } from 'uuid';
import { Totp, generateConfig } from 'time2fa';
import { v2 as cloudinary } from 'cloudinary';
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export const generateEmailVerificationHtml = (generatedCode: string): string => {
  return (
    ` 
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Verification Code</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; color: #333; background-color: #f5f5f5;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top: 20px; margin-bottom: 20px;">
          <!-- Header -->
          <tr>
            <td style="background-color: #10b981; padding: 30px 40px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">PropertyQuest</h1>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #111827; font-size: 22px; margin-top: 0; margin-bottom: 20px; font-weight: 600;">Your Verification Code</h2>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                Email verification code. Use the code below to complete your action:
              </p>
              <div style="text-align: center; margin: 35px 0;">
                <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; display: inline-block; border: 1px solid #e5e7eb;">
                  <p style="font-size: 32px; font-weight: 700; letter-spacing: 5px; margin: 0; color: #111827; font-family: monospace;">${generatedCode}</p>
                </div>
              </div>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                This code will expire in <strong>10 minutes</strong>
              </p>
              <p style="color: #ef4444; font-size: 14px; background-color: #fef2f2; padding: 12px; border-radius: 6px; margin-bottom: 25px; border-left: 3px solid #ef4444;">
                <strong>Security Notice:</strong> Never share this code with anyone. PropertyQuest representatives will never ask for your verification code.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 25px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                If you have any questions, please contact our support team.
              </p>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                &copy; ${new Date().getFullYear()} PropertyQuest. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  )
}

export const generateVerifiedEmailTemplate = () => {
  return (
    ` 
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Email is Verified</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; color: #333; background-color: #f5f5f5;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top: 20px; margin-bottom: 20px;">
          <!-- Header -->
          <tr>
            <td style="background-color: #10b981; padding: 30px 40px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">PropertyQuest</h1>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #111827; font-size: 22px; margin-top: 0; margin-bottom: 20px; font-weight: 600;">Email Verified</h2>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                Your email has been verified.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 25px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                If you have any questions, please contact our support team.
              </p>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                &copy; ${new Date().getFullYear()} PropertyQuest. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  )
}

export const generateRejectedDocEmailTemplate = (reviewNote: string = ''): string => {
  return (
    ` 
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your uploaded document(s) have been rejected</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; color: #333; background-color: #f5f5f5;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top: 20px; margin-bottom: 20px;">
          <!-- Header -->
          <tr>
            <td style="background-color: #10b981; padding: 30px 40px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">PropertyQuest</h1>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: red; font-size: 22px; margin-top: 0; margin-bottom: 20px; font-weight: 600;">Document(s) Rejected</h2>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                Your uploaded document(s) have been rejected. Please review the note below for details:
                ${reviewNote ? `<strong>${reviewNote}</strong>` : 'No specific reason provided.'}
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 25px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                If you have any questions, please contact our support team.
              </p>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                &copy; ${new Date().getFullYear()} PropertyQuest. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  )
}

export const generateApprovedDocEmailTemplate = () => {
  return (
    ` 
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your uploaded document(s) have been approved</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; color: #333; background-color: #f5f5f5;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top: 20px; margin-bottom: 20px;">
          <!-- Header -->
          <tr>
            <td style="background-color: #10b981; padding: 30px 40px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">PropertyQuest</h1>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #111827; font-size: 22px; margin-top: 0; margin-bottom: 20px; font-weight: 600;">Document(s) Approved</h2>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                Your uploaded document(s) have been approved.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 25px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                If you have any questions, please contact our support team.
              </p>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                &copy; ${new Date().getFullYear()} PropertyQuest. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  )
}

export const generateEmailResentVerificationHtml = (resendVerificationCode: string): string => {
  return (
    ` 
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Verification Code</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; color: #333; background-color: #f5f5f5;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top: 20px; margin-bottom: 20px;">
          <!-- Header -->
          <tr>
            <td style="background-color: #10b981; padding: 30px 40px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">PropertyQuest</h1>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #111827; font-size: 22px; margin-top: 0; margin-bottom: 20px; font-weight: 600;">Your Verification Code</h2>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                You requested a new email verification code. Use the code below to complete your action:
              </p>
              <div style="text-align: center; margin: 35px 0;">
                <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; display: inline-block; border: 1px solid #e5e7eb;">
                  <p style="font-size: 32px; font-weight: 700; letter-spacing: 5px; margin: 0; color: #111827; font-family: monospace;">${resendVerificationCode}</p>
                </div>
              </div>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                This code will expire in <strong>10 minutes</strong>. If you didn't request this code, please ignore this email or contact support if you have concerns.
              </p>
              <p style="color: #ef4444; font-size: 14px; background-color: #fef2f2; padding: 12px; border-radius: 6px; margin-bottom: 25px; border-left: 3px solid #ef4444;">
                <strong>Security Notice:</strong> Never share this code with anyone. PropertyQuest representatives will never ask for your verification code.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 25px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                If you have any questions, please contact our support team.
              </p>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                &copy; ${new Date().getFullYear()} PropertyQuest. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  )
}

export const generateEmailResetPasswordHtml = (resetCode: string): string => {
  return (
    ` 
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Request</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; color: #333; background-color: #f5f5f5;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top: 20px; margin-bottom: 20px;">
          <!-- Header -->
          <tr>
            <td style="background-color: #10b981; padding: 30px 40px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">PropertyQuest</h1>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #111827; font-size: 22px; margin-top: 0; margin-bottom: 20px; font-weight: 600;">Password Reset Request</h2>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                Use this code to reset your password for your PropertyQuest account. Enter the code below to proceed:
              </p>
              <div style="text-align: center; margin: 35px 0;">
                <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; display: inline-block; border: 1px solid #e5e7eb;">
                  <p style="font-size: 32px; font-weight: 700; letter-spacing: 5px; margin: 0; color: #111827; font-family: monospace;">${resetCode}</p>
                </div>
              </div>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                This code will expire in <strong>10 minutes</strong>. If you didn't request this code, please ignore this email or contact support if you have concerns.
              </p>
              <p style="color: #ef4444; font-size: 14px; background-color: #fef2f2; padding: 12px; border-radius: 6px; margin-bottom: 25px; border-left: 3px solid #ef4444;">
                <strong>Security Notice:</strong> Never share this code with anyone. PropertyQuest representatives will never ask for your reset code.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 25px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                If you have any questions, please contact our support team.
              </p>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                &copy; ${new Date().getFullYear()} PropertyQuest. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  )
}

export const generateEmailPasswordUpdatedHtml = (): string => {
  return (
    ` 
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Password is Updated</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; color: #333; background-color: #f5f5f5;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top: 20px; margin-bottom: 20px;">
          <!-- Header -->
          <tr>
            <td style="background-color: #10b981; padding: 30px 40px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">PropertyQuest</h1>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #111827; font-size: 22px; margin-top: 0; margin-bottom: 20px; font-weight: 600;">Password Updated</h2>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                You PropertyQuest account password has been updated.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 25px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                If you have any questions, please contact our support team.
              </p>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                &copy; ${new Date().getFullYear()} PropertyQuest. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  )
}


const PATH_TO_PUBLIC_FOLDER = resolve(__dirname, '../../../public');

export const FOLDER_PATHS = {
  avatars: resolve(PATH_TO_PUBLIC_FOLDER, 'avatars'),
  bussinessdocuments: resolve(PATH_TO_PUBLIC_FOLDER, 'bussinessdocuments'),
  affiliationdocuments: resolve(PATH_TO_PUBLIC_FOLDER, 'affiliationdocuments'),
  propertyimages: resolve(PATH_TO_PUBLIC_FOLDER, 'propertyimages'),
  propertyfloorimages: resolve(PATH_TO_PUBLIC_FOLDER, 'propertyfloorimages')
} as const;

// Initialize Cloudinary if configured
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// Local storage functions
const saveFileLocally = async (
  fileBuffer: Buffer,
  fileType: string,
  folder: keyof typeof FOLDER_PATHS
): Promise<string> => {
  const saveFolderPath = FOLDER_PATHS[folder];

  if (!fs.existsSync(saveFolderPath)) {
    fs.mkdirSync(saveFolderPath, { recursive: true });
  }

  const fileExtension = fileType.split('/')[1];
  const fileId = `${v4()}.${fileExtension}`;
  const filePath = join(saveFolderPath, fileId);

  return new Promise<string>((resolve, reject) => {
    fs.writeFile(filePath, fileBuffer, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(fileId);
      }
    });
  });
};

const deleteFileLocally = async (
  fileId: string,
  folder: keyof typeof FOLDER_PATHS
): Promise<void> => {
  const saveFolderPath = FOLDER_PATHS[folder];
  const filePath = join(saveFolderPath, fileId);

  return new Promise<void>((resolve, reject) => {
    fs.unlink(filePath, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

// Cloudinary storage functions
const saveFileToCloudinary = async (
  fileBuffer: Buffer,
  fileType: string,
  folder: keyof typeof FOLDER_PATHS
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {

    const uploadStream = cloudinary.uploader.upload_stream(
      {
      folder: folder
      },
      (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result?.secure_url || '');
      }
      }
    );

    uploadStream.end(fileBuffer);
  });
};

const deleteFileFromCloudinary = async (
  fileUrl: string,
  folder: keyof typeof FOLDER_PATHS
): Promise<void> => {
  // Extract public_id from URL (last part without extension)
  const parts = fileUrl.split('/');
  const filename = parts[parts.length - 1];
  const publicId = filename.split('.')[0];
  
  return new Promise<void>((resolve, reject) => {
    cloudinary.uploader.destroy(
      `${folder}/${publicId}`,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
};

// Public interface
export const saveFile = async (
  fileBuffer: Buffer,
  fileType: string,
  folder: keyof typeof FOLDER_PATHS
): Promise<string> => {
  if (process.env.STORAGE_TYPE === 'cloudinary') {
    return saveFileToCloudinary(fileBuffer, fileType, folder);
  }
  return saveFileLocally(fileBuffer, fileType, folder);
};

export const deleteFile = async (
  fileIdentifier: string, // Can be fileId (local) or URL (Cloudinary)
  folder: keyof typeof FOLDER_PATHS
): Promise<void> => {
  if (process.env.STORAGE_TYPE === 'cloudinary') {
    return deleteFileFromCloudinary(fileIdentifier, folder);
  }
  return deleteFileLocally(fileIdentifier, folder);
};

// Helper to get full URL for local files
export const getFileUrl = (fileId: string, folder: keyof typeof FOLDER_PATHS): string => {
  if (process.env.STORAGE_TYPE === 'cloudinary') {
    return fileId; // Already a full URL
  }
  return `/public/${folder}/${fileId}`;
};

const config = generateConfig({ algo: 'sha256', period: 60 * 60 * 5 });

export const UserOtp = {
  generate: (secret: string): string => {
    return Totp.generatePasscodes({ secret }, config)[0];
  },
  validate: (secret: string, passcode: string): boolean => {
    return Totp.validate({ secret, passcode }, config);
  },
};
