import Message from './message';

export default interface ResponseData<T> {
  data: T | null;
  error?: Message | null;
}
