type TokenService = {
  signAuthToken(userId: number): Promise<string>;
  verifyAuthToken(token: string): Promise<number | null>;
};

export type { TokenService };
