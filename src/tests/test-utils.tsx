import { render, type RenderOptions } from '@testing-library/react';
import { FormProvider, useForm, UseFormProps } from 'react-hook-form';

import Providers from '@/providers/Providers';

export const customWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Providers session={null}>{children}</Providers>;
};

export const customRender = (ui: React.ReactNode, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: customWrapper, ...options });

export const renderWithForm = (
  ui: React.ReactNode,
  options?: {
    formProps?: UseFormProps;
    renderOptions?: Omit<RenderOptions, 'wrapper'>;
  },
) => {
  const FormWrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm(options?.formProps);
    return (
      <Providers session={null}>
        <FormProvider {...methods}>{children}</FormProvider>
      </Providers>
    );
  };

  return render(ui, { wrapper: FormWrapper, ...options?.renderOptions });
};
