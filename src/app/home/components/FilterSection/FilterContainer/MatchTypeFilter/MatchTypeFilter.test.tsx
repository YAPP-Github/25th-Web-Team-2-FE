import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import MatchTypeFilter from './MatchTypeFilter';

import { DEFAULT_RECRUIT_STATUS } from '@/constants/filters';
import { customRender } from '@/tests/test-utils';

describe('MatchTypeFilter 컴포넌트', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });
  it('필터가 선택되지 않았을 때 기본 텍스트를 표시한다', () => {
    const filters = { recruitStatus: DEFAULT_RECRUIT_STATUS } as const;
    const expected = '진행 방식';

    // Given & When
    customRender(<MatchTypeFilter filters={filters} />);

    // Then
    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  it('필터가 선택되지 않았을 때 기본 텍스트를 표시한다', () => {
    const filters = { recruitStatus: DEFAULT_RECRUIT_STATUS, matchType: 'ONLINE' } as const;
    const expected = '비대면';

    // Given & When
    customRender(<MatchTypeFilter filters={filters} />);

    // Then
    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  it('사용자가 진행 방식 필터링을 클릭하면 드롭다운의 진행 방식 옵션이 노출된다.', async () => {
    // Given
    const user = userEvent.setup();
    const filters = { recruitStatus: DEFAULT_RECRUIT_STATUS } as const;
    const defaultText = '진행 방식';
    customRender(<MatchTypeFilter filters={filters} />);

    // When
    await user.click(screen.getByText(defaultText));

    // Then
    expect(screen.getByText('전체')).toBeInTheDocument();
    expect(screen.getByText('대면')).toBeInTheDocument();
    expect(screen.getByText('비대면')).toBeInTheDocument();
  });
});
