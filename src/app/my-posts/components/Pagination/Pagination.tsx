// 'use client';
import * as React from 'react';

import {
  pagination,
  paginationContent,
  paginationItem,
  paginationLink,
  active,
  paginationPrevious,
  paginationNext,
  paginationEllipsis,
} from './Pagination.css';

import Icon from '@/components/Icon';
import { a11yHidden } from '@/styles/a11y.css';
import { colors } from '@/styles/colors';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={`${pagination} ${className}`}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={`${paginationContent} ${className}`} {...props} />
  ),
);
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={`${paginationItem} ${className}`} {...props} />
  ),
);
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<'a'>;

const PaginationLink = ({ className, isActive, ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={`${paginationLink} ${isActive ? active : ''} ${className}`}
    {...props}
  />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="이전 페이지"
    className={`${paginationPrevious} ${className}`}
    {...props}
  >
    <Icon icon="Chevron" color={colors.icon02} rotate={90} />
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="다음 페이지" className={`${paginationNext} ${className}`} {...props}>
    <Icon icon="Chevron" color={colors.icon02} rotate={270} />
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span aria-hidden className={`${paginationEllipsis} ${className}`} {...props}>
    ∙∙∙
    <span className={a11yHidden}>더 많은 페이지</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
