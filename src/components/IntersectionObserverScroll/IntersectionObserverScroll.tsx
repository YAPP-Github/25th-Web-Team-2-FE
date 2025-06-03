import { Fragment, PropsWithChildren, RefObject, useEffect } from 'react';

interface IntersectionObserverScrollProps {
  observerRef: RefObject<HTMLDivElement>;
  fetchNextPage: () => void;
  threshold?: number;
  enabled?: boolean;
}

const IntersectionObserverScroll = ({
  children,
  observerRef,
  fetchNextPage,
  threshold = 0.1,
  enabled = false,
}: PropsWithChildren<IntersectionObserverScrollProps>) => {
  useEffect(() => {
    if (!observerRef.current) return;

    const observerElement = observerRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && enabled) {
          fetchNextPage();
        }
      },
      {
        threshold,
      },
    );

    observer.observe(observerRef.current);

    return () => {
      if (observerElement) observer.unobserve(observerElement);
    };
  }, [threshold, observerRef, enabled, fetchNextPage]);

  return (
    <Fragment>
      {children}
      <div
        ref={observerRef}
        style={{
          height: '1px',
          background: 'transparent',
        }}
      />
    </Fragment>
  );
};

export default IntersectionObserverScroll;
