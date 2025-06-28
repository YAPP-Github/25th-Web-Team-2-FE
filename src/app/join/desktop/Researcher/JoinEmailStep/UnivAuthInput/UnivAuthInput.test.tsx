import { zodResolver } from '@hookform/resolvers/zod';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import UnivAuthInput from './UnivAuthInput';

import { ResearcherJoinSchema } from '@/schema/join/ResearcherJoinSchema';
import { renderWithForm } from '@/tests/test-utils';

const REQUEST_COUNT = 1;

const mockSendUnivAuthCodeMutate = vi.fn();
const mockToast = {
  open: vi.fn(),
  error: vi.fn(),
};

vi.mock('@/hooks/useToast', () => ({
  useToast: () => mockToast,
}));

vi.mock('@/app/join/hooks/useSendUnivAuthCodeMutation', () => ({
  default: () => ({
    mutate: mockSendUnivAuthCodeMutate,
  }),
}));

describe('UnivAuthInput', () => {
  beforeEach(() => {
    mockSendUnivAuthCodeMutate.mockImplementation((_, { onSuccess }) => {
      onSuccess({ requestCount: REQUEST_COUNT });
    });

    return () => {
      vi.clearAllMocks();
    };
  });
  it('학교 메일을 입력하고 인증번호 전송을 클릭하면 인증번호 전송 버튼이 수정 버튼으로 변경되고, 학교 메일 인풋이 비활성화된다.', async () => {
    // given
    const user = userEvent.setup();
    renderWithForm(<UnivAuthInput />, {
      formProps: {
        resolver: zodResolver(ResearcherJoinSchema()),
        defaultValues: {
          univEmail: '',
        },
      },
    });

    // when
    const univEmailInput = screen.getByPlaceholderText('학교 메일 입력');
    await user.type(univEmailInput, 'school@cau.ac.kr');
    const sendAuthCodeButton = screen.getByRole('button', { name: '인증번호 전송' });
    await user.click(sendAuthCodeButton);

    // then
    await waitFor(() => {
      expect(screen.getByRole('button', { name: '수정' })).toBeInTheDocument();
      expect(univEmailInput).toBeDisabled();
    });
  });

  it('인증번호 전송에 성공하면 인증번호 인풋이 노출된다.', async () => {
    // given
    const user = userEvent.setup();
    renderWithForm(<UnivAuthInput />, {
      formProps: {
        resolver: zodResolver(ResearcherJoinSchema()),
        defaultValues: {
          univEmail: 'school@cau.ac.kr',
        },
      },
    });

    // when
    const sendAuthCodeButton = screen.getByRole('button', { name: '인증번호 전송' });
    await user.click(sendAuthCodeButton);

    // then
    const authCodeInput = await screen.findByPlaceholderText('인증번호 6자리 입력');
    expect(authCodeInput).toBeInTheDocument();
  });

  it('인증번호 전송에 성공하면 토스트에 인증번호 발송 성공 텍스트가 노출된다.', async () => {
    // given
    const TOAST_MESSAGE = `인증번호가 발송되었어요. (${REQUEST_COUNT}회 / 하루 최대 3회)`;
    const user = userEvent.setup();
    renderWithForm(<UnivAuthInput />, {
      formProps: {
        resolver: zodResolver(ResearcherJoinSchema()),
        defaultValues: {
          univEmail: 'school@cau.ac.kr',
        },
      },
    });

    // when
    const sendAuthCodeButton = screen.getByRole('button', { name: '인증번호 전송' });
    await user.click(sendAuthCodeButton);

    // then
    await waitFor(() => {
      expect(mockToast.open).toHaveBeenCalledWith({ message: TOAST_MESSAGE });
    });
  });
});
