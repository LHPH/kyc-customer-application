import { Request } from 'express';
import JwtData from '../interfaces/jwt-data';

export default interface AuthRequest extends Request {
  auth: JwtData;
}
