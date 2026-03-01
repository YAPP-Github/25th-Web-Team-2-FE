import { parseISO } from 'date-fns';

export const parseDateString = (dateString: string | null) => {
  if (!dateString) return null;
  return parseISO(dateString);
};
