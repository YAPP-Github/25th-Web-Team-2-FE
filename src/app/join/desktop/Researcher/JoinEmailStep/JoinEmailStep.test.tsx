import { zodResolver } from '@hookform/resolvers/zod';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import JoinEmailStep from './JoinEmailStep';

import { ResearcherJoinSchema } from '@/schema/join/ResearcherJoinSchema';
import { renderWithForm } from '@/tests/test-utils';

const mockCheckValidEmailMutate = vi.fn();
vi.mock('@/app/join/hooks/useCheckValidEmailInfoMutation', () => ({
  default: () => ({
    mutate: mockCheckValidEmailMutate,
  }),
}));

const mockSendUnivAuthCodeMutate = vi.fn();
vi.mock('@/app/join/hooks/useSendUnivAuthCodeMutation', () => ({
  default: () => ({
    mutate: mockSendUnivAuthCodeMutate,
  }),
}));

const mockVerifyAuthCodeMutate = vi.fn();
vi.mock('@/app/join/hooks/useVerifyUnivAuthCodeMutation', () => ({
  default: () => ({
    mutate: mockVerifyAuthCodeMutate,
  }),
}));

describe('JoinEmailStep (Researcher)', () => {
  it('모든 필수 값을 올바르게 입력하면 "다음" 버튼이 활성화된다.', async () => {
    // given
    const user = userEvent.setup();
    const onNext = vi.fn();
    renderWithForm(<JoinEmailStep onNext={onNext} />, {
      formProps: {
        resolver: zodResolver(ResearcherJoinSchema()),
        defaultValues: {
          oauthEmail: 'oauth@email.com',
          contactEmail: '',
          verifiedContactEmail: '',
          univEmail: '',
          isEmailVerified: false,
          isTermOfService: false,
          isPrivacy: false,
          adConsent: false,
          matchConsent: false,
        },
      },
    });

    // when
    // 1. 연락처 이메일 입력 및 중복 확인 성공
    mockCheckValidEmailMutate.mockImplementation((email, { onSuccess }) => {
      onSuccess();
    });
    mockSendUnivAuthCodeMutate.mockImplementation((email, { onSuccess }) => {
      onSuccess({ requestCount: 1 });
    });
    mockVerifyAuthCodeMutate.mockImplementation((params, { onSuccess }) => {
      onSuccess();
    });

    const contactEmailInput = screen.getByLabelText(/연락 받을 이메일/);

    await user.type(contactEmailInput, 'contact@email.com');
    const checkButton = screen.getByRole('button', { name: '중복 확인' });
    await user.click(checkButton);

    expect(mockCheckValidEmailMutate).toHaveBeenCalledTimes(1);

    // 2. 학교 메일 입력 및 인증 성공
    const univEmailInput = screen.getByPlaceholderText('학교 메일 입력');
    await user.type(univEmailInput, 'school@cau.ac.kr');
    const sendAuthCodeButton = screen.getByRole('button', { name: '인증번호 전송' });
    await user.click(sendAuthCodeButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '수정' })).toBeInTheDocument();
      expect(univEmailInput).toBeDisabled();
    });

    const authCodeInput = await screen.findByPlaceholderText('인증번호 6자리 입력');
    await user.type(authCodeInput, '123456');
    const verifyAuthCodeButton = screen.getByRole('button', { name: '인증' });
    await user.click(verifyAuthCodeButton);

    expect(mockVerifyAuthCodeMutate).toHaveBeenCalledTimes(1);

    // 3. 필수 약관 동의
    const termsCheckbox = screen.getByRole('checkbox', { name: /서비스 이용약관 동의$/ });
    await user.click(termsCheckbox);
    const privacyCheckbox = screen.getByRole('checkbox', { name: /개인정보 수집 및 이용 동의$/ });
    await user.click(privacyCheckbox);

    // then
    const nextButton = screen.getByRole('button', { name: '다음' });
    expect(nextButton).toBeEnabled();

    await user.click(nextButton);
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
