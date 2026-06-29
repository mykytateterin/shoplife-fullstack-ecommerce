type CompareData = {
  password: string;
  passwordHash: string;
};

type PasswordService = {
  compare(data: CompareData): Promise<boolean>;
  hash(password: string): Promise<string>;
};

export type { PasswordService };
