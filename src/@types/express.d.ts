import { UserResponseDTO } from "../schemas/dtos";
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}