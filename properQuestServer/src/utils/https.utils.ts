import {
  RequestAttr,
  Response,
  NextFunction,
} from '../interfaces/req.interface';
import { Schema, ZodError } from 'zod';
import { flow } from 'lodash';

// compose(res, status(400), send('Unsupported: Invalid route/method'))
/**
 * Attach a status code to the response object
 * @param code the status code
 * @returns {Response} the response object
 */
export const status = (code: number) => (res: any) => res.status(code);

/**
 * Returns a response with a status code
 * @param code the status code
 * @returns {Response} the response object
 */
export const sendStatus = (code: number) => (res: any) => res.sendStatus(code);

/**
 * Send a response with a message and data
 * @param message the message to send
 * @param data the data to send
 * @returns {Response} the response object
 */
export const send =
  (message: string, data = {}) =>
  (res: Response) =>
    res.json({ message, data });

export const sendError =
  (message: string, error = {}) =>
  (res: Response) => {
    res.json({
      message,
      data: {},
      error,
    });
  };

export const sendValidationError = (e: any) =>
  sendError('Validation Error', {
    details: e instanceof ZodError ? e.format() : [e.message],
  });

export const validateRequest =
  (schema: Schema) => (req: RequestAttr, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body); // You can also validate req.query or req.params
      next();
    } catch (e: any) {
      return flow(status(400), sendValidationError(e))(res);
    }
  };
