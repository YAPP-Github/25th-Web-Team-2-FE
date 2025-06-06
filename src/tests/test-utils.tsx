import { render, type RenderOptions } from '@testing-library/react';

import Providers from '@/providers/Providers';

const customWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Providers session={null}>{children}</Providers>;
};

export const customRender = (ui: React.ReactNode, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: customWrapper, ...options });
