import { Control, Controller, UseFormReset } from 'react-hook-form';

import { checkFormContainer, checkFormItem } from './LeaveReasonForm.css';

import JoinInput from '@/app/join/components/JoinInput/JoinInput';
import { LeaveSchemaType } from '@/schema/profile/LeaveSchema';

const LEAVE_REASONS = [
  { label: '연구 활동 또는 실험 참여를 중단했어요', value: 'RESEARCH_STOPPED' },
  { label: '보안이 걱정돼요', value: 'SECURITY_CONCERN' },
  { label: '필요한 기능이 없어요', value: 'NO_NECESSARY_FUNCTION' },
  { label: '메일이 너무 자주 와요', value: 'TOO_MANY_EMAILS' },
  { label: '사이트를 이용하기 불편해요', value: 'INCONVENIENT_SITE' },
  { label: '기타 (직접 입력)', value: 'OTHER' },
] as const;

interface LeaveReasonFormProps {
  control: Control<LeaveSchemaType>;
  reset: UseFormReset<LeaveSchemaType>;
}

const LeaveReasonForm = ({ control, reset }: LeaveReasonFormProps) => {
  return (
    <div className={checkFormContainer}>
      <Controller
        name="reasonType"
        control={control}
        render={({ field }) => (
          <>
            {LEAVE_REASONS.map((reason) => {
              return (
                <label key={reason.value} className={checkFormItem}>
                  <input
                    {...field}
                    type="radio"
                    value={reason.value}
                    onChange={(e) => {
                      field.onChange(reason.value);

                      if (field.value === 'OTHER' && e.target.value !== field.value) {
                        reset({ reasonType: reason.value, reason: '' });
                      }
                    }}
                  />
                  <span>{reason.label}</span>
                </label>
              );
            })}
            {field.value === 'OTHER' && (
              <JoinInput<LeaveSchemaType>
                name="reason"
                control={control}
                placeholder="사유를 입력해주세요"
                type="textarea"
                isCount
                count={300}
              />
            )}
          </>
        )}
      />
    </div>
  );
};

export default LeaveReasonForm;
