export interface JwtPayload {
  apiKey: string;
  date: string;
  [key: string]: any;
}
