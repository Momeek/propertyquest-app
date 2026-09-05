import { flow } from 'lodash';
import {
  AdminRequestAttr,
  Response,
  NextFunction,
} from '../../interfaces/req.interface';
import { send, status } from '../../utils/https.utils';
import { AdminToken } from '../../utils';

export async function AdminAuth(
  req: AdminRequestAttr,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    // Get auth header value
    const bearer = req.headers.authorization;

    if (!bearer) throw new Error('Unauthorized access');

    const token = bearer.split(' ')[1];

    const decoded = AdminToken.verify(token);

    if (!decoded.id) throw new Error('Invalid access');

    if (decoded.exp - decoded.iat <= 21600) {
      res.setHeader(
        'x-refresh-token',
        AdminToken.sign({
          id: decoded.id,
          email: decoded.email,
        }),
      );
    }

    req.AdminAuthTokenAttr = decoded;

    next();
  } catch (err: any) {
    return flow(status(400), send('[TokenError]: ' + err.message))(res);
  }
}
