import {
  autoCompleteCustomItem,
  autoCompleteDropdown,
  autoCompleteHighlight,
  autoCompleteItem,
  autoCompleteList,
  emptyAutoComplete,
  emptyAutoCompleteItem,
  emptyAutoCompleteText,
} from './AutoCompleteDropdown.css';
import { useSearchUnivNamesQuery } from '../../hooks/useSearchUnivNamesQuery';

import Icon from '@/components/Icon';
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

  if (!showDropdown) return null;

  if (isInitialOpen) {
    return (
      <div className={emptyAutoComplete}>
        <span className={emptyAutoCompleteText}>학교명을 검색해 보세요</span>
      </div>
    );
  }

  return (
    <div className={autoCompleteDropdown}>
      <ul className={autoCompleteList} role="listbox" aria-label="학교 검색 결과">
        {isPending || isLoading ? (
          <li className={emptyAutoCompleteItem}>검색중...</li>
        ) : univNames.length > 0 ? (
          univNames.map((univName) => {
            const parts = query ? univName.split(new RegExp(`(${query})`, 'gi')) : [univName];

            return (
              <li key={univName}>
                <button
                  data-suggestion
                  className={autoCompleteItem}
                  onClick={() => onClick(univName)}
                >
                  {parts.map((part, idx) =>
                    part.toLowerCase() === query.toLowerCase() ? (
                      <span key={idx} className={autoCompleteHighlight}>
                        {part}
                      </span>
                    ) : (
                      part
                    ),
                  )}
                </button>
              </li>
            );
          })
        ) : (
          <li className={emptyAutoCompleteItem}>일치하는 학교명이 없어요</li>
        )}
      </ul>

      {query && (
        <button
          data-suggestion
          className={autoCompleteCustomItem}
          onClick={() => onClick(query)}
          aria-label={`입력한 학교명 “${query}” 직접 등록하기`}
        >
          <div>
            “<span className={autoCompleteHighlight}>{query}</span>”
            <span style={{ marginLeft: '0.8rem' }}>직접 등록하기</span>
          </div>
          <Icon icon="Chevron" rotate={270} />
        </button>
      )}
    </div>
  );
};

export default AutoCompleteDropdown;
