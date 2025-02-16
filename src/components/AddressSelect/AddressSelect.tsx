import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import {
  areaFilterContainer,
  areaFilterWrapper,
  filterTitle,
  filterTitleWrapper,
  requiredStar,
} from './AddressSelect.css';

import JoinSelect from '@/app/join/components/Participant/JoinInfoStep/JoinSelect/JoinSelect';
import { FilterOption } from '@/app/join/JoinPage.types';

interface AddressSelectProps<T extends FieldValues> {
  title: string;
  control: Control<T>;
  region: Path<T>;
  area: Path<T>;
  regionOptions: FilterOption[];
  areaOptions: FilterOption[];
  onChangeRegion: (value: string) => void;
  onChangeArea: (value: string) => void;
  isRequired?: boolean;
  tooltip?: React.ReactNode;
}

const AddressSelect = <T extends FieldValues>({
  title,
  control,
  region,
  area,
  regionOptions,
  areaOptions,
  onChangeRegion,
  onChangeArea,
  isRequired = false,
  tooltip,
}: AddressSelectProps<T>) => (
  <div className={areaFilterContainer}>
    <div className={filterTitleWrapper}>
      <span className={filterTitle}>{title}</span>
      {isRequired && <span className={requiredStar}>*</span>}
      {tooltip}
    </div>
    <div className={areaFilterWrapper}>
      <Controller
        name={region}
        control={control}
        render={({ field, fieldState }) => (
          <JoinSelect
            value={field.value}
            onChange={(value) => onChangeRegion(value)}
            placeholder="시·도"
            options={regionOptions}
            isError={Boolean(fieldState.error) && !field.value}
          />
        )}
      />

      <Controller
        name={area}
        control={control}
        render={({ field, fieldState }) => (
          <JoinSelect
            value={field.value}
            onChange={(value) => onChangeArea(value)}
            placeholder="시·군·구"
            options={areaOptions}
            isError={Boolean(fieldState.error) && !field.value}
          />
        )}
      />
    </div>
  </div>
);

export default AddressSelect;
