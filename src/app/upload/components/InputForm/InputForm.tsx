import { input } from '@/app/upload/components/UploadContainer/UploadContainer';

interface InputFormProps {
  id: string;
  field: {
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: VoidFunction;
  };
  fieldState: {
    error?: {
      message?: string;
    };
  };
  placeholder?: string;
  type?: string;
}

const InputForm = ({ field, fieldState, placeholder, type = 'text', id }: InputFormProps) => {
  return (
    <>
      <input
        {...field}
        id={id}
        css={input}
        type={type}
        placeholder={placeholder}
        value={field.value || ''}
      />
      {fieldState.error && (
        <p style={{ color: 'red', marginTop: '0.5rem' }}>{fieldState.error.message}</p>
      )}
    </>
  );
};

export default InputForm;
