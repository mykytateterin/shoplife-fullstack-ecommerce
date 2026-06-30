type TokenService = {
  signAuthToken(userId: number): Promise<string>;
  verifyAuthToken(token: string): Promise<null | number>;
};

export type { TokenService };
