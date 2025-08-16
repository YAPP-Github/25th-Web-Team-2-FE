import {
  autoCompleteDropdown,
  autoCompleteItem,
  emptyAutoComplete,
  emptyAutoCompleteItem,
  emptyAutoCompleteText,
} from './AutoCompleteDropdown.css';
import { useSearchUnivNamesQuery } from '../../hooks/useSearchUnivNamesQuery';

import { useDebounce } from '@/hooks/useDebounce';

interface AutoCompleteDropdownProps {
  showDropdown: boolean;
  query: string;
  onClick: (univName: string) => void;
}

const AutoCompleteDropdown = ({ showDropdown, query, onClick }: AutoCompleteDropdownProps) => {
  const { value: debouncedQuery, isPending } = useDebounce(query);
  const { data, isLoading } = useSearchUnivNamesQuery(debouncedQuery);

  const univNames = data?.result || [];

  const isInitialOpen = showDropdown && univNames.length === 0 && query.length === 0;
  const hasEmptyResult = showDropdown && univNames.length === 0 && query.length > 0;
  const hasResult = showDropdown && univNames.length > 0;

  if (!showDropdown) {
    return null;
  }

  if (isInitialOpen) {
    return (
      <div className={emptyAutoComplete}>
        <span className={emptyAutoCompleteText}>학교명을 검색해 보세요</span>
      </div>
    );
  }

  if (isPending || isLoading) {
    return (
      <div className={autoCompleteDropdown}>
        <span className={emptyAutoCompleteItem}>검색중...</span>
      </div>
    );
  }

  if (hasEmptyResult) {
    return (
      <div className={autoCompleteDropdown}>
        <span className={emptyAutoCompleteItem}>검색 결과가 없습니다.</span>
      </div>
    );
  }

  return (
    <>
      {hasResult && (
        <div className={autoCompleteDropdown}>
          {univNames.map((univName) => (
            <button
              key={univName}
              data-suggestion
              className={autoCompleteItem}
              onClick={() => onClick(univName)}
            >
              {univName}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default AutoCompleteDropdown;
