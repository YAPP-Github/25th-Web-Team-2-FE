'use client';

import * as Accordion from '@radix-ui/react-accordion';

import { accordionChevron, accordionContent, accordionTrigger } from './AgreeAccordion.css';
import Icon from '@/components/Icon';

interface AgreeAccordionProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
}

const AgreeAccordion = ({ trigger, content }: AgreeAccordionProps) => {
  return (
    <Accordion.Root type="single" collapsible>
      <Accordion.Item value="item">
        <Accordion.Header>
          <Accordion.Trigger className={accordionTrigger}>
            {trigger}
            <Icon icon="Chevron" width={20} height={20} className={accordionChevron} aria-hidden />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className={accordionContent}>{content}</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default AgreeAccordion;
