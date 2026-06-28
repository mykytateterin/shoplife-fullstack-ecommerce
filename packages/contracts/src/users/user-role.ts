const ContractUserRole = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  USER: 'USER',
} as const;

type ContractUserRole = (typeof ContractUserRole)[keyof typeof ContractUserRole];

export { ContractUserRole };
