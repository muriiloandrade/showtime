/* eslint-disable @typescript-eslint/camelcase */
export interface User {
  id?: number;
  username: string;
  email: string;
  password_hash: string;
  created_at: Date;
  modified_at: Date;
// eslint-disable-next-line semi
}
