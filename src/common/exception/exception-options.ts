import Message from '../interfaces/message';

export interface ExceptionOptions {
  message?: Message;
  status: number;
  error?: any;
}
