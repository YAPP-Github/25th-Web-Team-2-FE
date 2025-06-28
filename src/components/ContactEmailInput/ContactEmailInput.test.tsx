import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import ContactEmailInput from './ContactEmailInput';

import { renderWithForm } from '@/tests/test-utils';
import type { ParticipantJoinSchemaType } from '@/schema/join/ParticipantJoinSchema';

const mockToast = {
  open: vi.fn(),
  error: vi.fn(),
};

const mockCheckValidEmailMutate = vi.fn();

vi.mock('@/hooks/useToast', () => ({
  useToast: () => mockToast,
}));

vi.mock('@/app/join/hooks/useCheckValidEmailInfoMutation', () => ({
  default: () => ({
    mutate: mockCheckValidEmailMutate,
  }),
}));

mockCheckValidEmailMutate.mockImplementation((_, { onSuccess }) => {
  onSuccess();
});

const renderContactEmailInput = () => {
  return renderWithForm(
    <ContactEmailInput<ParticipantJoinSchemaType>
      contactEmailField="contactEmail"
      verifiedEmailField="verifiedContactEmail"
    />,
  );
};

describe('ContactEmailInput', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('이메일이 비어있으면 중복 확인 버튼이 비활성화된다.', () => {
    // given
    renderContactEmailInput();

    // when
    const duplicateCheckButton = screen.getByRole('button', { name: '중복 확인' });

    // then
    expect(duplicateCheckButton).toBeDisabled();
  });

  it('이메일을 입력하면 중복 확인 버튼이 활성화된다.', async () => {
    // given
    const user = userEvent.setup();
    renderContactEmailInput();

    const emailInput = screen.getByPlaceholderText('이메일 입력');
    const duplicateCheckButton = screen.getByRole('button', { name: '중복 확인' });

    // when
    await user.type(emailInput, 'test@example.com');
    await user.click(duplicateCheckButton);

    // then
    expect(duplicateCheckButton).toBeEnabled();
  });

  it('중복 확인 성공 시 성공 토스트가 노출된다.', async () => {
    // given
    const user = userEvent.setup();
    renderContactEmailInput();

    const emailInput = screen.getByPlaceholderText('이메일 입력');
    const duplicateCheckButton = screen.getByRole('button', { name: '중복 확인' });

    // when
    await user.type(emailInput, 'test@example.com');
    await user.click(duplicateCheckButton);

    // then
    await waitFor(() => {
      expect(mockToast.open).toHaveBeenCalledWith({ message: '사용 가능한 이메일이에요' });
    });
  });

  it('중복 확인 실패 시 에러 토스트가 노출된다.', async () => {
    // given
    const user = userEvent.setup();
    mockCheckValidEmailMutate.mockImplementationOnce((_, { onError }) => {
      onError(new Error());
    });
    renderContactEmailInput();

    const emailInput = screen.getByPlaceholderText('이메일 입력');
    const duplicateCheckButton = screen.getByRole('button', { name: '중복 확인' });

    // when
    await user.type(emailInput, 'duplicate@example.com');
    await user.click(duplicateCheckButton);

    // then
    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith({ message: '중복된 이메일이에요' });
    });
  });

  it('중복 확인 성공 시 중복 확인 버튼이 미노출된다.', async () => {
    // given
    const user = userEvent.setup();
    renderContactEmailInput();

    const emailInput = screen.getByPlaceholderText('이메일 입력');
    const duplicateCheckButton = screen.getByRole('button', { name: '중복 확인' });

    // when
    await user.type(emailInput, 'test@example.com');
    await user.click(duplicateCheckButton);

    // then
    expect(duplicateCheckButton).not.toBeInTheDocument();
  });

  it('중복 확인 성공 후 값을 변경하면 중복 확인 버튼이 재노출된다.', async () => {
    // given
    const user = userEvent.setup();
    renderWithForm(
      <ContactEmailInput<ParticipantJoinSchemaType>
        contactEmailField="contactEmail"
        verifiedEmailField="verifiedContactEmail"
      />,
      {
        formProps: {
          defaultValues: {
            contactEmail: 'test@example.com',
            verifiedContactEmail: 'test@example.com',
          },
        },
      },
    );

    expect(screen.queryByRole('button', { name: '중복 확인' })).not.toBeInTheDocument();

    // then
    const emailInput = screen.getByPlaceholderText('이메일 입력');
    await user.type(emailInput, 'test2@example.com');

    // when
    await waitFor(() => {
      expect(screen.getByRole('button', { name: '중복 확인' })).toBeInTheDocument();
    });
  });
});
