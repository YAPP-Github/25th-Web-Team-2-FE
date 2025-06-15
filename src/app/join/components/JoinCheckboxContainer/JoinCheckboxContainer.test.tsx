import { zodResolver } from '@hookform/resolvers/zod';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import JoinCheckboxContainer from './JoinCheckboxContainer';

import { ParticipantJoinSchema } from '@/schema/join/ParticipantJoinSchema';
import { renderWithForm } from '@/tests/test-utils';

describe('JoinCheckboxContainer', () => {
  it('초기엔 모든 체크박스가 비활성화되어 있다.', async () => {
    // given
    renderWithForm(<JoinCheckboxContainer />, {
      formProps: {
        resolver: zodResolver(ParticipantJoinSchema()),
        defaultValues: {
          isTermOfService: false,
          isPrivacy: false,
          adConsent: false,
        },
      },
    });

    // when
    const allCheckbox = screen.getByRole('checkbox', { name: /이용약관에 모두 동의합니다$/ });
    const termsCheckbox = screen.getByRole('checkbox', { name: /서비스 이용약관 동의$/ });
    const privacyCheckbox = screen.getByRole('checkbox', { name: /개인정보 수집 및 이용 동의$/ });
    const adConsentCheckbox = screen.getByRole('checkbox', {
      name: /\[선택\] 광고성 정보 이메일\/SMS 수신 동의$/,
    });

    // then
    expect(allCheckbox).not.toBeChecked();
    expect(termsCheckbox).not.toBeChecked();
    expect(privacyCheckbox).not.toBeChecked();
    expect(adConsentCheckbox).not.toBeChecked();
  });

  it('모두 동의 체크박스를 클릭하면 모든 체크박스가 체크된다.', async () => {
    // given
    const user = userEvent.setup();
    renderWithForm(<JoinCheckboxContainer />, {
      formProps: {
        resolver: zodResolver(ParticipantJoinSchema()),
        defaultValues: {
          isTermOfService: false,
          isPrivacy: false,
          adConsent: false,
        },
      },
    });
    const allCheckbox = screen.getByRole('checkbox', { name: /이용약관에 모두 동의합니다$/ });
    const termsCheckbox = screen.getByRole('checkbox', { name: /서비스 이용약관 동의$/ });
    const privacyCheckbox = screen.getByRole('checkbox', { name: /개인정보 수집 및 이용 동의$/ });
    const adConsentCheckbox = screen.getByRole('checkbox', {
      name: /\[선택\] 광고성 정보 이메일\/SMS 수신 동의$/,
    });

    // when
    await user.click(allCheckbox);

    // then
    expect(allCheckbox).toBeChecked();
    expect(termsCheckbox).toBeChecked();
    expect(privacyCheckbox).toBeChecked();
    expect(adConsentCheckbox).toBeChecked();
  });

  it('이미 하나가 체크된 상태에서 모두 동의 체크박스를 체크하면 모든 체크박스가 체크된다.', async () => {
    // given
    const user = userEvent.setup();
    renderWithForm(<JoinCheckboxContainer />, {
      formProps: {
        resolver: zodResolver(ParticipantJoinSchema()),
        defaultValues: {
          isTermOfService: false,
          isPrivacy: false,
          adConsent: false,
        },
      },
    });
    const allCheckbox = screen.getByRole('checkbox', { name: /이용약관에 모두 동의합니다$/ });
    const termsCheckbox = screen.getByRole('checkbox', { name: /서비스 이용약관 동의$/ });
    const privacyCheckbox = screen.getByRole('checkbox', { name: /개인정보 수집 및 이용 동의$/ });
    const adConsentCheckbox = screen.getByRole('checkbox', {
      name: /\[선택\] 광고성 정보 이메일\/SMS 수신 동의$/,
    });
    await user.click(termsCheckbox);

    // when
    await user.click(allCheckbox);

    // then
    expect(allCheckbox).toBeChecked();
    expect(termsCheckbox).toBeChecked();
    expect(privacyCheckbox).toBeChecked();
    expect(adConsentCheckbox).toBeChecked();
  });

  it('이미 하나가 체크된 상태에서 모두 동의 체크박스를 체크 해제하면 모든 체크박스가 체크 해제된다.', async () => {
    // given
    const user = userEvent.setup();
    renderWithForm(<JoinCheckboxContainer />, {
      formProps: {
        resolver: zodResolver(ParticipantJoinSchema()),
        defaultValues: {
          isTermOfService: false,
          isPrivacy: false,
          adConsent: false,
        },
      },
    });
    const allCheckbox = screen.getByRole('checkbox', { name: /이용약관에 모두 동의합니다$/ });
    const termsCheckbox = screen.getByRole('checkbox', { name: /서비스 이용약관 동의$/ });
    const privacyCheckbox = screen.getByRole('checkbox', { name: /개인정보 수집 및 이용 동의$/ });
    const adConsentCheckbox = screen.getByRole('checkbox', {
      name: /\[선택\] 광고성 정보 이메일\/SMS 수신 동의$/,
    });
    await user.click(termsCheckbox);

    // when
    await user.click(allCheckbox);
    await user.click(allCheckbox);

    // then
    expect(allCheckbox).not.toBeChecked();
    expect(termsCheckbox).not.toBeChecked();
    expect(privacyCheckbox).not.toBeChecked();
    expect(adConsentCheckbox).not.toBeChecked();
  });

  it('나머지 체크박스를 모두 체크하면 모두 동의 체크박스가 체크된다.', async () => {
    // given
    const user = userEvent.setup();
    renderWithForm(<JoinCheckboxContainer />, {
      formProps: {
        resolver: zodResolver(ParticipantJoinSchema()),
        defaultValues: {
          isTermOfService: false,
          isPrivacy: false,
          adConsent: false,
          matchConsent: false,
        },
      },
    });
    const allCheckbox = screen.getByRole('checkbox', { name: /이용약관에 모두 동의합니다$/ });
    const termsCheckbox = screen.getByRole('checkbox', { name: /서비스 이용약관 동의$/ });
    const privacyCheckbox = screen.getByRole('checkbox', { name: /개인정보 수집 및 이용 동의$/ });
    const adConsentCheckbox = screen.getByRole('checkbox', {
      name: /\[선택\] 광고성 정보 이메일\/SMS 수신 동의$/,
    });
    const matchConsentCheckbox = screen.getByRole('checkbox', {
      name: /\[선택\] 개인정보 수집 및 이용 동의-실험 추천·혜택$/,
    });

    // when
    await user.click(termsCheckbox);
    await user.click(privacyCheckbox);
    await user.click(adConsentCheckbox);
    await user.click(matchConsentCheckbox);

    // then
    expect(allCheckbox).toBeChecked();
  });

  it('모두 체크된 상태에서 하나의 체크박스를 체크 해제하면 "모두 동의 체크 박스"가 체크 해제된다.', async () => {
    // given & when
    const user = userEvent.setup();
    renderWithForm(<JoinCheckboxContainer />, {
      formProps: {
        resolver: zodResolver(ParticipantJoinSchema()),
        defaultValues: {
          isTermOfService: false,
          isPrivacy: false,
          adConsent: false,
          matchConsent: false,
        },
      },
    });
    const allCheckbox = screen.getByRole('checkbox', { name: /이용약관에 모두 동의합니다$/ });
    const termsCheckbox = screen.getByRole('checkbox', { name: /서비스 이용약관 동의$/ });
    const privacyCheckbox = screen.getByRole('checkbox', { name: /개인정보 수집 및 이용 동의$/ });
    const adConsentCheckbox = screen.getByRole('checkbox', {
      name: /\[선택\] 광고성 정보 이메일\/SMS 수신 동의$/,
    });
    const matchConsentCheckbox = screen.getByRole('checkbox', {
      name: /\[선택\] 개인정보 수집 및 이용 동의-실험 추천·혜택$/,
    });
    await user.click(termsCheckbox);
    await user.click(privacyCheckbox);
    await user.click(adConsentCheckbox);
    await user.click(matchConsentCheckbox);

    // then
    expect(allCheckbox).toBeChecked();

    // when
    await user.click(matchConsentCheckbox);

    // then
    expect(allCheckbox).not.toBeChecked();
  });
});
