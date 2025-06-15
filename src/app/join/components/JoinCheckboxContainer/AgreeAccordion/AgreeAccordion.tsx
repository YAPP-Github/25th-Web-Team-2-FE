'use client';

import * as Accordion from '@radix-ui/react-accordion';

import { accordionChevron, accordionContent, accordionTrigger } from './AgreeAccordion.css';

import Icon from '@/components/Icon';

interface AgreeAccordionProps {
  value: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
}

const AgreeAccordion = ({ value, trigger, content }: AgreeAccordionProps) => {
  return (
    <Accordion.Item value={value}>
      <Accordion.Header>
        <Accordion.Trigger className={accordionTrigger}>
          {trigger}
          <Icon icon="Chevron" width={20} height={20} className={accordionChevron} aria-hidden />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className={accordionContent}>{content}</Accordion.Content>
    </Accordion.Item>
  );
};

export default AgreeAccordion;
