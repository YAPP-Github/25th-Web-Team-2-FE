import { useController, useWatch, type Control } from 'react-hook-form';

import { formatDate } from '@/app/post/[postId]/utils/formatDate';
import Icon from '@/components/Icon';
import { UploadExperimentPostSchemaType } from '@/schema/upload/uploadExperimentPostSchema';

import {
  alarmAgreeHeader,
  alarmAgreeSection,
  alarmPreviewCard,
  alarmPreviewContentBox,
  alarmPreviewHeadline,
  alarmPreviewMetaRow,
  alarmPreviewSubInfo,
  alarmPreviewTitle,
  alarmPreviewWrapper,
  divider,
  rewardText,
} from './AlarmAgreeSection.css';
import CheckboxWithIcon from '../CheckboxWithIcon';

type AlarmAgreeSectionProps = {
  control: Control<UploadExperimentPostSchemaType>;
  isEdit?: boolean;
};

export const AlarmAgreeSection = ({ control, isEdit = false }: AlarmAgreeSectionProps) => {
  const { field } = useController({
    name: 'alarmAgree',
    control,
  });

  const [place, startDate, endDate, reward, title] = useWatch({
    control,
    name: ['place', 'startDate', 'endDate', 'reward', 'title'],
  });

  return (
    <section className={alarmAgreeSection}>
      <div className={alarmAgreeHeader}>
        <CheckboxWithIcon
          checked={field.value}
          onChange={() => field.onChange(!field.value)}
          label="성별·나이 조건에 맞는 참여자에게 아래와 같이 이메일로 알릴까요?"
          align="left"
          size="large"
          boldStyle
          disabled={isEdit}
        />
      </div>

      <div className={alarmPreviewWrapper({ checked: field.value })}>
        <div className={alarmPreviewCard}>
          <p className={alarmPreviewHeadline}>
            당신과 꼭 맞는 공고를 찾아왔어요! <span>🧚</span>
          </p>

          <div className={alarmPreviewMetaRow}>
            <Icon icon="Place" width={14} height={14} />
            <span>{place ? place : '비대면'}</span>
          </div>

          <div className={alarmPreviewContentBox}>
            <p className={alarmPreviewSubInfo}>
              <span>
                {startDate && endDate
                  ? startDate === endDate
                    ? startDate
                    : `${formatDate(startDate)} ~ ${formatDate(endDate)}`
                  : '본문 참고'}
              </span>
              <span className={divider}>|</span> <span className={rewardText}>{reward}</span>
            </p>

            <p className={alarmPreviewTitle}>{title?.trim() || '[공고 제목]'}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
