import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export const useExperimentDuration = (durationChecked: boolean) => {
  const { setValue } = useFormContext();

  // 소요 시간 본문 참고 여부
  const [isDurationChecked, setIsDurationChecked] = useState(durationChecked);

  // 체크박스 변경 핸들러
  const handleDurationCheckboxChange = () => {
    const newCheckedState = !isDurationChecked;
    setIsDurationChecked(newCheckedState);

    // 체크된 경우 값 초기화

    if (newCheckedState) {
      setValue('timeRequired', null, { shouldValidate: true, shouldDirty: true });
    } else {
      setValue('timeRequired', '');
    }
  };

  useEffect(() => {
    setIsDurationChecked(durationChecked);
  }, [durationChecked]);

  return {
    isDurationChecked,
    handleDurationCheckboxChange,
  };
};
