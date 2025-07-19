'use client';

import { FormProvider, useWatch } from 'react-hook-form';

import EditFormLayout from '../EditFormLayout/EditFormLayout';

import { ParticipantResponse } from '@/apis/login';
import { JOIN_REGION, JOIN_SUB_REGION } from '@/app/join/JoinPage.constants';
import {
  filterTitle,
  filterTitleWrapper,
  joinAreaFilterContainer,
  joinAreaFilterWrapper,
  requiredStar,
} from './AddressEditForm.css';
import JoinSelect from '@/app/join/desktop/Participant/JoinInfoStep/JoinSelect/JoinSelect';
import AreaTooltip from '@/app/join/components/AreaTooltip/AreaTooltip';
import SaveButton from '../SaveButton';
import { useFormProfileEdit } from '../../hooks/useFormProfileEdit';

interface AddressEditFormProps {
  userInfo: ParticipantResponse;
}

const AddressEditForm = ({ userInfo }: AddressEditFormProps) => {
  const { form, isLoading, onSubmit } = useFormProfileEdit(userInfo);

  const selectedRegion = useWatch({ name: 'basicAddressInfo.region', control: form.control });
  const selectedAdditionalRegion = useWatch({
    name: 'additionalAddressInfo.region',
    control: form.control,
  });

  return (
    <FormProvider {...form}>
      <EditFormLayout
        title="실험에 참여할 지역을 골라주세요"
        description="입력해주신 정보를 바탕으로 참여 가능한 실험 목록을 메일로 안내드릴게요"
      >
        {/* 거주 지역 */}
        <div className={joinAreaFilterContainer}>
          <div className={filterTitleWrapper}>
            <span className={filterTitle}>거주 지역</span>
            <span className={requiredStar}>*</span>
          </div>
          <div className={joinAreaFilterWrapper}>
            <JoinSelect
              value={form.watch('basicAddressInfo.region')}
              onChange={(value) => {
                form.setValue('basicAddressInfo.region', value);
                form.setValue('basicAddressInfo.area', '');
              }}
              placeholder="시·도"
              options={JOIN_REGION}
              isError={Boolean(form.formState.errors.basicAddressInfo?.region)}
            />
            <JoinSelect
              value={form.watch('basicAddressInfo.area')}
              onChange={(value) => form.setValue('basicAddressInfo.area', value)}
              placeholder="시·군·구"
              options={JOIN_SUB_REGION[selectedRegion] || []}
              isError={Boolean(form.formState.errors.basicAddressInfo?.area)}
            />
          </div>
        </div>

        {/* 추가 활동 지역 */}
        <div className={joinAreaFilterContainer}>
          <div className={filterTitleWrapper}>
            <span className={filterTitle}>추가 활동 지역</span>
            <AreaTooltip />
          </div>
          <div className={joinAreaFilterWrapper}>
            <JoinSelect
              value={form.watch('additionalAddressInfo.region')}
              onChange={(value) => {
                form.setValue('additionalAddressInfo.region', value);
                form.setValue('additionalAddressInfo.area', '');
              }}
              placeholder="시·도"
              options={JOIN_REGION}
              isError={Boolean(form.formState.errors.additionalAddressInfo?.region)}
            />
            <JoinSelect
              value={form.watch('additionalAddressInfo.area')}
              onChange={(value) => form.setValue('additionalAddressInfo.area', value)}
              placeholder="시·군·구"
              options={JOIN_SUB_REGION[selectedAdditionalRegion || ''] || []}
              isError={Boolean(form.formState.errors.additionalAddressInfo?.area)}
            />
          </div>
        </div>

        <SaveButton
          onSave={onSubmit}
          fields={[
            'basicAddressInfo.region',
            'basicAddressInfo.area',
            'additionalAddressInfo.region',
            'additionalAddressInfo.area',
          ]}
          isLoading={isLoading}
        />
      </EditFormLayout>
    </FormProvider>
  );
};

export default AddressEditForm;
