import { format } from 'date-fns';

export const formatDate = (hyphenDate: string): string => {
  if (!hyphenDate) return '';

  return format(new Date(hyphenDate), 'yyyy. MM. dd') ?? '';
};
