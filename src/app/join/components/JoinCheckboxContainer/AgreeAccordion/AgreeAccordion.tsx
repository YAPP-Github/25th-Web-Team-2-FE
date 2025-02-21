'use client';

import * as Accordion from '@radix-ui/react-accordion';

import { accordionContent, accordionTrigger } from './AgreeAccordion.css';

interface AgreeAccordionProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
}

const AgreeAccordion = ({ trigger, content }: AgreeAccordionProps) => {
  return (
    <Accordion.Root type="single" collapsible>
      <Accordion.Item value="item">
        <Accordion.Header>
          <Accordion.Trigger className={accordionTrigger}>{trigger}</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className={accordionContent}>{content}</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default AgreeAccordion;
