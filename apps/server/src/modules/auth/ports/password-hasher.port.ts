type CompareData = {
  password: string;
  passwordHash: string;
};

type PasswordHasher = {
  compare(data: CompareData): Promise<boolean>;
  hash(password: string): Promise<string>;
};

export type { PasswordHasher };
