import { zodResolver } from '@hookform/resolvers/zod';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import AuthCodeInput from './AuthCodeInput';

import { ResearcherJoinSchema } from '@/schema/join/ResearcherJoinSchema';
import { renderWithForm } from '@/tests/test-utils';

const mockVerifyAuthCodeMutate = vi.fn();
vi.mock('@/app/join/hooks/useVerifyUnivAuthCodeMutation', () => ({
  default: () => ({
    mutate: mockVerifyAuthCodeMutate,
  }),
}));

describe('UnivAuthInput', () => {
  it('인증번호 입력 후 인증 버튼 클릭 시 이메일 인증 함수를 학교 메일과 인증번호를 파라미터로 호출한다.', async () => {
    // given
    const user = userEvent.setup();
    const univEmail = 'school@cau.ac.kr';
    const inputCode = '123456';
    renderWithForm(
      <AuthCodeInput authTimer={10} handleSendUnivAuthCode={vi.fn()} stopTimer={vi.fn()} />,
      {
        formProps: {
          resolver: zodResolver(ResearcherJoinSchema()),
          defaultValues: {
            univEmail,
            isEmailVerified: false,
          },
        },
      },
    );

    // when
    const authCodeInput = screen.getByPlaceholderText('인증번호 6자리 입력');
    await user.type(authCodeInput, inputCode);

    const verifyAuthCodeButton = screen.getByRole('button', { name: '인증' });
    await user.click(verifyAuthCodeButton);

    // then
    expect(mockVerifyAuthCodeMutate).toHaveBeenCalledTimes(1);
    expect(mockVerifyAuthCodeMutate).toHaveBeenCalledWith(
      {
        univEmail,
        inputCode,
      },
      {
        onError: expect.any(Function),
        onSuccess: expect.any(Function),
      },
    );
  });

  it('인증번호 재전송 버튼 클릭 시 인증번호 전송 함수를 호출한다.', async () => {
    // given
    const user = userEvent.setup();
    const univEmail = 'school@cau.ac.kr';
    const spy = vi.fn();

    renderWithForm(
      <AuthCodeInput authTimer={10} handleSendUnivAuthCode={spy} stopTimer={vi.fn()} />,
      {
        formProps: {
          resolver: zodResolver(ResearcherJoinSchema()),
          defaultValues: {
            univEmail,
            isEmailVerified: false,
          },
        },
      },
    );

    // when
    const resendAuthCodeButton = screen.getByRole('button', { name: '인증번호 재전송' });
    await user.click(resendAuthCodeButton);

    // then
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
