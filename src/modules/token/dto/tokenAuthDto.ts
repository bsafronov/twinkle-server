import { Timestamp } from 'typeorm';

export class TokenAuthDTO {
  id: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
}
