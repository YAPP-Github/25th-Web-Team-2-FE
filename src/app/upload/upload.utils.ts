import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';

export const formatRange = (range: DateRange) => {
  return {
    from: range.from ? format(range.from, 'yyyy.MM.dd', { locale: ko }) : null,
    to: range.to ? format(range.to, 'yyyy.MM.dd', { locale: ko }) : null,
  };
};
