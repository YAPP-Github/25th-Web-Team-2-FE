import { css } from '@emotion/react';
import { useState } from 'react';

import CheckboxWithIcon from '../CheckboxWithIcon/CheckboxWithIcon';
import { TextInput } from '../TextInput/TextInput';
import { headingIcon } from '../UploadContainer/UploadContainer';

const ApplyMethodSection = () => {
  const [addLink, setAddLink] = useState<boolean>(false);
  const [addContact, setAddContact] = useState<boolean>(false);

  return (
    <div css={applyMethodLayout}>
      {/* 실험 참여 방법 */}
      <div css={applyMethodContainer}>
        <h3>
          <span css={headingIcon}>3</span>실험에 참여려면 어떻게 하면 되나요?
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
    </div>
  );
};

export default ApplyMethodSection;

export const applyMethodLayout = css`
  height: 58.1rem;
`;

const applyMethodContainer = css`
  margin-top: 2rem;
  margin-bottom: 4.8rem;
`;

const applyMethodContentLayout = css`
  display: flex;
  flex-flow: column nowrap;
  gap: 2.4rem;
`;

const addContactInfoContainer = css`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  gap: 0.8rem;
`;
