import SelectInput from '../SelectInput/SelectInput';

interface DurationSelectProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  referToDetailsChecked?: boolean;
}

export const durationMinutesOptions = [
  { label: '30분 미만', value: 'LESS_30M' },
  { label: '약 30분', value: 'ABOUT_30M' },
  { label: '약 1시간', value: 'ABOUT_1H' },
  { label: '약 1시간 30분', value: 'ABOUT_1H30M' },
  { label: '약 2시간', value: 'ABOUT_2H' },
  { label: '약 2시간 30분', value: 'ABOUT_2H30M' },
  { label: '약 3시간', value: 'ABOUT_3H' },
  { label: '약 3시간 30분', value: 'ABOUT_3H30M' },
  { label: '약 4시간', value: 'ABOUT_4H' },
];

const DurationSelect = ({ value, onChange, referToDetailsChecked }: DurationSelectProps) => {
  return (
    <SelectInput
      value={value}
      onChange={onChange}
      options={durationMinutesOptions}
      placeholder="1회당 시간 입력"
      referToDetailsChecked={referToDetailsChecked}
    />
  );
};

export default DurationSelect;
