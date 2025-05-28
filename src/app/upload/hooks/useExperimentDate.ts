import { isBefore, startOfDay } from 'date-fns';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { parseDateString } from '../upload.utils';

export const useExperimentDate = (experimentDateChecked: boolean) => {
  const pathname = usePathname();
  const isEdit = pathname.startsWith('/edit');
  const { control, setValue, getValues } = useFormContext();

  // 기존 실험 일시 본문 참고 여부
  const [isExperimentDateChecked, setIsExperimentDateChecked] = useState(experimentDateChecked);

  // 실험 종료날짜가 과거면 변경 불가능
  const watchedEndDate = useWatch({ control, name: 'endDate' });
  const endDate = parseDateString(watchedEndDate);
  const today = startOfDay(new Date());
  const isEndDatePast = isEdit && endDate ? isBefore(endDate, today) : false;

  // 실험 일시 본문 참고 체크박스 변경에 따라 date 변경
  const handleExperimentDateCheckboxChange = () => {
    const newCheckedState = !isExperimentDateChecked;
    setIsExperimentDateChecked(newCheckedState);

    if (newCheckedState) {
      setValue('startDate', null, { shouldValidate: true, shouldDirty: true });
      setValue('endDate', null, { shouldValidate: true, shouldDirty: true });
    } else {
      setValue('startDate', undefined);
      setValue('endDate', undefined);
    }
  };

  useEffect(() => {
    setIsExperimentDateChecked(experimentDateChecked);
  }, [experimentDateChecked]);

  // 공고 수정 시 기존 날짜 datePicker에 적용
  const defaultDateRange = {
    from: getValues('startDate') ? new Date(getValues('startDate')) : undefined,
    to: getValues('endDate') ? new Date(getValues('endDate')) : undefined,
  };

  return {
    isExperimentDateChecked,
    isEndDatePast,
    handleExperimentDateCheckboxChange,
    defaultDateRange,
  };
};
