import SelectInput from '../SelectInput/SelectInput';

const countSelectOptions = [
  {
    label: '1회',
    value: '1',
  },
  {
    label: '2회',
    value: '2',
  },
  {
    label: '3회',
    value: '3',
  },
  {
    label: '4회',
    value: '4',
  },
  {
    label: '5회',
    value: '5',
  },
  {
    label: '6회',
    value: '6',
  },
  {
    label: '7회',
    value: '7',
  },
  {
    label: '8회',
    value: '8',
  },
  {
    label: '9회',
    value: '9',
  },
  {
    label: '10회',
    value: '10',
  },
];

interface CountSelectProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

const CountSelect = ({ value, onChange }: CountSelectProps) => {
  return (
    <SelectInput
      value={value}
      onChange={onChange}
      options={countSelectOptions}
      placeholder="실험 횟수 입력"
    />
  );
};

export default CountSelect;
