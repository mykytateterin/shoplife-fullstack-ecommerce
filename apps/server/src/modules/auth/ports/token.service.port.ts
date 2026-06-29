type TokenService = {
  signAuthToken(userId: number): Promise<string>;
};

export type { TokenService };
