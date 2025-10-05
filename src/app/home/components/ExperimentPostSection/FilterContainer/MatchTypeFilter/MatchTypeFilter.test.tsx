import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import MatchTypeFilter from './MatchTypeFilter';

import { customRender } from '@/tests/test-utils';

describe('MatchTypeFilter 컴포넌트', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });
  it('필터가 선택되지 않았을 때 기본 텍스트를 표시한다', () => {
    const filters = { recruitStatus: 'ALL' } as const;
    const expected = '진행 방식';

    // Given & When
    customRender(<MatchTypeFilter filters={filters} onChange={mockOnChange} />);

    // Then
    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  it('필터가 선택되지 않았을 때 기본 텍스트를 표시한다', () => {
    const filters = { recruitStatus: 'ALL', matchType: 'ONLINE' } as const;
    const expected = '비대면';

    // Given & When
    customRender(<MatchTypeFilter filters={filters} onChange={mockOnChange} />);

    // Then
    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  it('사용자가 진행 방식 필터링을 클릭하면 드롭다운의 진행 방식 옵션이 노출된다.', async () => {
    // Given
    const user = userEvent.setup();
    const filters = { recruitStatus: 'ALL' } as const;
    const defaultText = '진행 방식';
    customRender(<MatchTypeFilter filters={filters} onChange={mockOnChange} />);

    // When
    await user.click(screen.getByText(defaultText));

    // Then
    expect(screen.getByText('전체')).toBeInTheDocument();
    expect(screen.getByText('대면')).toBeInTheDocument();
    expect(screen.getByText('비대면')).toBeInTheDocument();
  });

  it('진행 방식 필터링 클릭하고 드롭다운의 비대면 옵션을 클릭하면, 필터링으로 비대면 옵션이 선택된다.', async () => {
    // Given
    const user = userEvent.setup();
    const filters = { recruitStatus: 'ALL' } as const;
    const defaultText = '진행 방식';
    const targetOptionText = '비대면';
    const expected = 'ONLINE';
    customRender(<MatchTypeFilter filters={filters} onChange={mockOnChange} />);

    // When
    await user.click(screen.getByText(defaultText));
    await user.click(screen.getByText(targetOptionText));

    // // Then
    expect(mockOnChange).toHaveBeenCalledWith(expected);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
