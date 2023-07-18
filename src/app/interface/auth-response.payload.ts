export interface AuthReponse {
  authenticationToken: string;
  refreshToken: string;
  expireAt: Date;
  username: string;
}
