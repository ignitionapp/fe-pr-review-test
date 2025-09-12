export type ClientFilter = {
  status: string;
  searchTerm?: string | null;
  minTotalValue?: string | null;
};

export const createDefaultFilter = () => {
  return {
    status: 'all',
    searchTerm: '',
    minTotalValue: null,
  };
};
