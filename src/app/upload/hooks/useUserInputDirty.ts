import { useMemo } from 'react';

import { UploadExperimentPostSchemaType } from '@/schema/upload/uploadExperimentPostSchema';

// form 필드에서 사용되는 기본값 타입
type FormBaseValue = string | number | boolean | null | undefined;
// 배열 또는 객체로 구성된 필드 타입
type FormStructuredValue = FormBaseValue[] | { [key: string]: FormValue };

// 폼에서 사용될 수 있는 모든 필드의 타입
type FormValue = FormBaseValue | FormStructuredValue;

const useUserInputDirty = (values: UploadExperimentPostSchemaType): boolean => {
  return useMemo(() => {
    const autoFilledFields: (keyof UploadExperimentPostSchemaType)[] = ['leadResearcher', 'place']; // 자동 입력 필드

    // 사용자가 입력한 값이 유효한지 체크
    const hasValidUserInput = (value: FormValue): boolean => {
      if (value === null || value === undefined) return false;
      if (typeof value === 'string') return value.trim() !== '';
      if (typeof value === 'number') return true;
      if (typeof value === 'boolean') return value === true;
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'object') {
        return Object.values(value).some((v) => hasValidUserInput(v));
      }
      return false;
    };

    // 유효한 값이 하나라도 있으면 true
    return (Object.entries(values) as [keyof UploadExperimentPostSchemaType, FormValue][]).some(
      ([key, value]) => {
        if (autoFilledFields.includes(key)) return false;
        return hasValidUserInput(value);
      },
    );
  }, [values]);
};

export default useUserInputDirty;
