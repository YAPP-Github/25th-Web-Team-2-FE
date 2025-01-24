import { css, Theme } from '@emotion/react';
import { useState } from 'react';

import CheckboxWithIcon from '../CheckboxWithIcon/CheckboxWithIcon';
import RadioButtonGroup from '../RadioButtonGroup/RadioButtonGroup';
import { TextInput } from '../TextInput/TextInput';
import { headingIcon, label } from '../UploadContainer/UploadContainer';

import { colors } from '@/styles/colors';

export enum GenderType {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  ALL = 'ALL',
}

const ApplyMethodSection = () => {
  const [addLink, setAddLink] = useState<boolean>(false);
  const [addContact, setAddContact] = useState<boolean>(false);

  const [alarmAgree, setAlarmAgree] = useState<boolean>(false);

  const [selectedGenderType, setSelectedGenderType] = useState<GenderType | null>(null);

  const handleGenderTypeChange = (gender: GenderType) => {
    setSelectedGenderType(gender);
  };

  return (
    <div css={applyMethodLayout}>
      {/* 실험 참여 방법 */}
      <div css={applyMethodContainer}>
        <h3>
          <span css={headingIcon}>3</span>실험에 참여하려면 어떻게 하면 되나요?
        </h3>

        <div css={applyMethodContentLayout}>
          <TextInput
            id="apply-method"
            placeholder="예) 아래 연락처로 성함, 가능한 시간대를 보내주세요"
            maxLength={200}
            size="full"
          />

          <div css={addContactInfoContainer}>
            {/* 링크 추가 */}
            <CheckboxWithIcon
              checked={addLink}
              onChange={() => {
                setAddLink((prev) => !prev);
              }}
              label="링크를 추가할게요"
              align="left"
              size="large"
            />
            {addLink && <TextInput id="link" placeholder="https://" maxLength={200} size="full" />}

            {/* 연락처 추가 */}
            <CheckboxWithIcon
              checked={addContact}
              onChange={() => {
                setAddContact((prev) => !prev);
              }}
              label="연락처를 추가할게요"
              align="left"
              size="large"
            />
            {addContact && <TextInput id="contact" placeholder="연락처, 이메일 등" size="full" />}
          </div>
        </div>
      </div>

      {/* 모집 조건 */}
      <h3>
        <span css={headingIcon}>4</span>어떤 사람들을 모집하나요?
      </h3>
      <div css={targetConditionLayout}>
        <div css={targetGroupContainer}>
          {/* 나이 */}
          <div>
            <label css={label}>
              나이 <span style={{ color: `${colors.textAlert}` }}>*</span>
            </label>
            <div css={ageInputContainer}>
              <span css={textStyle}>만</span>
              <input id={'min-age'} type="number" css={inputStyle} placeholder="00" min="0" />
              <span css={textStyle}>~</span>
              <input id={'max-age'} type="number" css={inputStyle} placeholder="00" min="0" />
              <span css={textStyle}>세</span>
            </div>
          </div>

          {/* 성별 */}
          <div>
            <label css={label}>
              성별 <span style={{ color: `${colors.textAlert}` }}>*</span>
            </label>
            <RadioButtonGroup<GenderType>
              options={[
                {
                  value: GenderType.MALE,
                  label: '남성',
                },
                {
                  value: GenderType.FEMALE,
                  label: '여성',
                },
                {
                  value: GenderType.ALL,
                  label: '무관',
                },
              ]}
              selectedValue={selectedGenderType}
              onChange={handleGenderTypeChange}
            />
          </div>
        </div>
        {/* 기타 조건 */}
        <div>
          <label css={label}>기타 조건</label>
          <div>
            <TextInput
              id="other-condition"
              placeholder="기타 조건을 입력해 주세요 (선택)"
              maxLength={300}
              size="full"
            />
          </div>
        </div>
      </div>

      {/* 공고 알림 */}
      <div css={alarmAgreeContainer}>
        <CheckboxWithIcon
          checked={alarmAgree}
          onChange={() => setAlarmAgree((prev) => !prev)}
          label="조건에 부합하는 참여자에게 해당 공고를 알릴까요?"
          align="left"
          size="large"
          boldStyle
        />
      </div>
    </div>
  );
};

export default ApplyMethodSection;

export const applyMethodLayout = css``;

const applyMethodContainer = css`
  margin-top: 2rem;
  margin-bottom: 4.8rem;
`;

const applyMethodContentLayout = css`
  display: flex;
  flex-flow: column nowrap;
`;

const addContactInfoContainer = css`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  gap: 0.8rem;
`;

const targetConditionLayout = css`
  display: flex;
  flex-flow: column nowrap;
  gap: 2.8rem;
`;

const targetGroupContainer = css`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const ageInputContainer = (theme: Theme) => css`
  width: 45.2rem;
  height: 4.8rem;

  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.1rem solid ${theme.colors.line01};
  border-radius: 1.2rem;
  padding: 1.3rem 1.6rem;
`;

const textStyle = (theme: Theme) => css`
  ${theme.fonts.label.large.M14};
  color: ${theme.colors.text06};
`;

const inputStyle = (theme: Theme) => css`
  ${theme.fonts.label.large.R14};

  width: 17.2rem;
  height: 2.2rem;

  text-align: center;

  border: none;
  outline: none;

  &::placeholder {
    color: ${theme.colors.text02};
  }
`;

const alarmAgreeContainer = (theme: Theme) => css`
  width: fit-content;
  height: 3.4rem;

  padding: 0 1rem;

  background-color: ${theme.colors.field02};
  border-radius: 0.8rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;
