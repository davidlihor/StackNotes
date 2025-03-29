declare global {
  namespace Express {
    interface Request {
      username: string;
      id: string;
      roles: string[];
    }
  }
}
export {};