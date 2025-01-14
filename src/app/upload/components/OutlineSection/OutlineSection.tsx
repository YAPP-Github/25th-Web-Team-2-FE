import { css } from '@emotion/react';
import { useState } from 'react';

import CheckboxWithIcon from '../CheckboxWithIcon/CheckboxWithIcon';
import { headingIcon, input, label } from '../UploadContainer/UploadContainer';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

const OutlineSection = () => {
  const [experimentDateChecked, setExperimentDateChecked] = useState(false);

  const [rewardChecked, setRewardChecked] = useState(false);

  const [timeChecked, setTimeChecked] = useState(false);

  return (
    <div css={outlineLayout}>
      <h3>
        <span css={headingIcon}>1</span>실험의 개요를 알려주세요
      </h3>

      <form css={outlineFormLayout}>
        {/* 연구 책임자 */}
        <div>
          <label css={label} htmlFor="researcher">
            연구 책임자 <span style={{ color: `${colors.textAlert}` }}>*</span>
          </label>
          <input
            css={input}
            type="text"
            id="researcher"
            placeholder="OO대학교 OO학과 OO연구실 OOO"
          />
        </div>

        {/* 실험 일시 */}
        <div>
          <label css={label} htmlFor="experiment-date">
            실험 일시 <span style={{ color: `${colors.textAlert}` }}>*</span>
          </label>
          <div css={inputWithIcon}>
            <input
              css={input}
              type="text"
              id="experiment-date"
              placeholder={experimentDateChecked ? '본문 참고' : '실험 시작일 ~ 실험 종료일'}
              disabled={experimentDateChecked}
            />
            <span css={iconStyle}>
              <Icon icon="Calendar" width={20} height={20} color={colors.icon03} />
            </span>
          </div>
          <CheckboxWithIcon
            checked={experimentDateChecked}
            onChange={() => {
              setExperimentDateChecked((prev) => !prev);
            }}
            label="본문 참고"
          />
        </div>

        {/* 진행 방식 */}
        <div>
          <label css={label}>
            진행 방식 <span style={{ color: `${colors.textAlert}` }}>*</span>
          </label>
          <div css={radioGroup}>
            <label css={radioLabel}>
              <input type="radio" name="method" value="대면" /> 대면
            </label>
            <label css={radioLabel}>
              <input type="radio" name="method" value="비대면" /> 비대면
            </label>
            <label css={radioLabel}>
              <input type="radio" name="method" value="대면+비대면" /> 대면+비대면
            </label>
          </div>
        </div>

        {/* 참여 보상 */}
        <div>
          <label css={label} htmlFor="reward">
            참여 보상 <span style={{ color: `${colors.textAlert}` }}>*</span>
          </label>
          <input
            css={input}
            type="text"
            id="reward"
            placeholder={rewardChecked ? '본문 참고' : '예) 현금 10,000원'}
            disabled={rewardChecked}
          />
          <CheckboxWithIcon
            checked={rewardChecked}
            onChange={() => {
              setRewardChecked((prev) => !prev);
            }}
            label="본문 참고"
          />
        </div>

        {/* 실험 장소 */}
        <div>
          <label css={label} htmlFor="location">
            실험 장소 <span style={{ color: `${colors.textAlert}` }}>*</span>
          </label>
          <input css={input} type="text" id="location" placeholder="성균관대학교" />
        </div>

        {/* 소요 시간 */}
        <div>
          <label css={label} htmlFor="time">
            소요 시간 <span style={{ color: `${colors.textAlert}` }}>*</span>
          </label>
          <div css={radioGroup}>
            <input css={input} type="text" id="frequency" placeholder="실험 횟수 입력" />
            <input
              css={input}
              type="text"
              id="duration"
              placeholder={timeChecked ? '본문 참고' : '1회당 시간 입력'}
              disabled={timeChecked}
            />
          </div>
          <CheckboxWithIcon
            checked={timeChecked}
            onChange={() => {
              setTimeChecked((prev) => !prev);
            }}
            label="본문 참고"
          />
        </div>
      </form>
    </div>
  );
};

export default OutlineSection;

export const outlineLayout = css`
  height: 57.6rem;
`;

export const outlineFormLayout = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 10.2rem 10.2rem 21.4rem;

  grid-column-gap: 3.2rem;
  grid-row-gap: 2.8rem;

  margin: 0 auto;
`;

const inputWithIcon = css`
  display: flex;
  align-items: center;
  position: relative;
`;

const iconStyle = css`
  position: absolute;
  right: 1.6rem;
`;

export const radioGroup = css`
  display: flex;
  gap: 15px;
`;

export const radioLabel = css`
  display: flex;
  align-items: center;
  gap: 5px;
`;
