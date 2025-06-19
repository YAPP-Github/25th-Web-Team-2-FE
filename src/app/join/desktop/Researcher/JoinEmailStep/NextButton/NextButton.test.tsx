import { zodResolver } from '@hookform/resolvers/zod';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import NextButton from './NextButton';

import { ResearcherJoinSchema } from '@/schema/join/ResearcherJoinSchema';
import { renderWithForm } from '@/tests/test-utils';

const validValues = {
  oauthEmail: 'oauth@email.com',
  contactEmail: 'contact@email.com',
  univEmail: 'univEmaill@cau.ac.kr',
  verifiedContactEmail: 'contact@email.com',
  isEmailVerified: true,
  isTermOfService: true,
  isPrivacy: true,
};

describe('NextButton (Researcher - desktop)', () => {
  it('초기 상태는 버튼이 비활성화되어 있다.', () => {
    // given
    const onNext = vi.fn();
    renderWithForm(<NextButton onNext={onNext} />);

    //when & then
    const nextButton = screen.getByRole('button', { name: '다음' });
    expect(nextButton).toBeDisabled();
  });

  // “입력값이 유효하지않으면 onNext 함수를 호출하지 않는다.”

  it('모든 필수 입력값이 존재하면 다음 버튼이 활성화된다.', () => {
    // given
    const onNext = vi.fn();

    renderWithForm(<NextButton onNext={onNext} />, {
      formProps: {
        resolver: zodResolver(ResearcherJoinSchema()),
        defaultValues: validValues,
      },
    });

    // when
    const nextButton = screen.getByRole('button', { name: '다음' });

    // then
    expect(nextButton).toBeEnabled();
  });

  it('입력값이 유효하면 onNext 함수를 호출한다.', async () => {
    // given
    const user = userEvent.setup();
    const onNext = vi.fn();

    renderWithForm(<NextButton onNext={onNext} />, {
      formProps: {
        resolver: zodResolver(ResearcherJoinSchema()),
        defaultValues: validValues,
      },
    });

    // when
    const nextButton = screen.getByRole('button', { name: '다음' });
    await user.click(nextButton);

    // then
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('입력값이 유효하지 않으면 버튼을 클릭해도 onNext 함수가 호출되지 않는다.', async () => {
    // given
    const user = userEvent.setup();
    const onNext = vi.fn();

    renderWithForm(<NextButton onNext={onNext} />, {
      formProps: {
        resolver: zodResolver(ResearcherJoinSchema()),
      },
    });

    // when
    const nextButton = screen.getByRole('button', { name: '다음' });
    await user.click(nextButton);

    // then
    expect(nextButton).toBeDisabled();
    expect(onNext).toHaveBeenCalledTimes(0);
  });
});
