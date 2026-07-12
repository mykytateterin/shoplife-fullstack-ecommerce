type ContractCategory = {
  children: ContractCategory[];
  id: number;
  name: string;
  path: string;
  slug: string;
};

export type { ContractCategory };
