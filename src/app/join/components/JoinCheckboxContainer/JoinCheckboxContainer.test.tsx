import { zodResolver } from '@hookform/resolvers/zod';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import JoinCheckboxContainer from './JoinCheckboxContainer';

import { ParticipantJoinSchema } from '@/schema/join/ParticipantJoinSchema';
import { renderWithForm } from '@/tests/test-utils';

describe('JoinCheckboxContainer', () => {
  let allCheckbox: HTMLElement;
  let termsCheckbox: HTMLElement;
  let privacyCheckbox: HTMLElement;
  let adConsentCheckbox: HTMLElement;
  let matchConsentCheckbox: HTMLElement;

  beforeEach(() => {
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

    allCheckbox = screen.getByRole('checkbox', { name: /이용약관에 모두 동의합니다$/ });
    termsCheckbox = screen.getByRole('checkbox', { name: /서비스 이용약관 동의$/ });
    privacyCheckbox = screen.getByRole('checkbox', { name: /개인정보 수집 및 이용 동의$/ });
    adConsentCheckbox = screen.getByRole('checkbox', {
      name: /\[선택\] 광고성 정보 이메일\/SMS 수신 동의$/,
    });
    matchConsentCheckbox = screen.getByRole('checkbox', {
      name: /\[선택\] 개인정보 수집 및 이용 동의-실험 추천·혜택$/,
    });
  });

  it('초기엔 모든 체크박스가 비활성화되어 있다.', async () => {
    // then
    expect(allCheckbox).not.toBeChecked();
    expect(termsCheckbox).not.toBeChecked();
    expect(privacyCheckbox).not.toBeChecked();
    expect(adConsentCheckbox).not.toBeChecked();
    expect(matchConsentCheckbox).not.toBeChecked();
  });

  describe('"모두 동의" 체크박스를 클릭했을 때', () => {
    it('모든 개별 체크박스가 선택된다.', async () => {
      // given
      const user = userEvent.setup();

      // when
      await user.click(allCheckbox);

      // then
      expect(termsCheckbox).toBeChecked();
      expect(privacyCheckbox).toBeChecked();
      expect(adConsentCheckbox).toBeChecked();
      expect(matchConsentCheckbox).toBeChecked();
    });

    it('다시 클릭하면 모든 개별 체크박스가 해제된다.', async () => {
      // given
      const user = userEvent.setup();

      // when
      await user.click(allCheckbox); // 전체 선택
      await user.click(allCheckbox); // 전체 해제

      // then
      expect(termsCheckbox).not.toBeChecked();
      expect(privacyCheckbox).not.toBeChecked();
      expect(adConsentCheckbox).not.toBeChecked();
      expect(matchConsentCheckbox).not.toBeChecked();
    });
  });
  describe('개별 체크박스를 클릭했을 때', () => {
    it('모든 개별 체크박스가 선택되면, "모두 동의" 체크박스도 선택된다.', async () => {
      // given
      const user = userEvent.setup();

      // when
      await user.click(termsCheckbox);
      await user.click(privacyCheckbox);
      await user.click(adConsentCheckbox);
      await user.click(matchConsentCheckbox);

      // then
      expect(allCheckbox).toBeChecked();
    });

    it('전체가 선택된 상태에서 개별 체크박스 하나를 해제하면, "모두 동의" 체크박스도 해제된다.', async () => {
      // given
      const user = userEvent.setup();
      await user.click(allCheckbox);
      expect(allCheckbox).toBeChecked();

      // when
      await user.click(termsCheckbox);

      // then
      expect(allCheckbox).not.toBeChecked();
    });
  });
});
