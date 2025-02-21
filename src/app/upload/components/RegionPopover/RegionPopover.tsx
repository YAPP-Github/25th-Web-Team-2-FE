import * as Popover from '@radix-ui/react-popover';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

import {
  popoverContent,
  popoverLayout,
  regionList,
  regionButton,
  activeRegionButton,
  subRegionList,
  subRegionButton,
  placeholderText,
  regionPopoverContainer,
  uploadInputField,
} from './RegionPopover.css';

import Icon from '@/components/Icon';
import { UPLOAD_REGION } from '@/constants/uploadRegion';

interface RegionPopoverProps {
  regionPopoverProps: {
    isOpenRegionPopover: boolean;
    selectedRegion: string | null;
    selectedSubRegion: string | null;
    onOpenRegionPopover: (open: boolean) => void;
    onRegionSelect: (region: string) => void;
    onSubRegionSelect: (subRegion: string) => void;
    error?: FieldError;
    field?: {
      onBlur: VoidFunction;
    };
  };
}

const RegionPopover = forwardRef<HTMLDivElement, RegionPopoverProps>(
  ({ regionPopoverProps }, ref) => {
    const {
      isOpenRegionPopover,
      onOpenRegionPopover,
      onRegionSelect,
      onSubRegionSelect,
      selectedRegion,
      selectedSubRegion,
      error,
      field,
    } = regionPopoverProps;

    const regionData = selectedRegion
      ? UPLOAD_REGION.find((region) => region.value === selectedRegion) || null
      : UPLOAD_REGION.find((region) => region.value === 'SEOUL') || null;

    const handleSubRegionSelect = (subRegionLabel: string) => {
      const selectedRegion = UPLOAD_REGION.find((region) =>
        region.children.some((subRegion) => subRegion.label === subRegionLabel),
      );

      if (selectedRegion) {
        onRegionSelect(selectedRegion.value);
      }

      onSubRegionSelect(subRegionLabel);
    };

    return (
      <Popover.Root open={isOpenRegionPopover} onOpenChange={onOpenRegionPopover}>
        <Popover.Trigger asChild>
          <div
            ref={ref}
            className={regionPopoverContainer}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === ' ') {
                e.preventDefault();
                onOpenRegionPopover(!isOpenRegionPopover);
              }
            }}
          >
            <div
              role="button"
              className={uploadInputField({
                error: !!error,
                isOpen: isOpenRegionPopover,
              })}
            >
              <span
                className={placeholderText({ hasValue: !!(selectedRegion && selectedSubRegion) })}
              >
                {selectedRegion && selectedSubRegion
                  ? `${regionData?.label} ${selectedSubRegion}`
                  : '지역구 선택'}
              </span>
              <span style={{ marginLeft: '1rem' }}>
                <Icon
                  icon="Chevron"
                  width={24}
                  height={24}
                  rotate={isOpenRegionPopover ? 180 : 0}
                />
              </span>
            </div>
          </div>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            sideOffset={6}
            className={popoverContent}
            onFocusOutside={() => {
              field?.onBlur();
              onOpenRegionPopover(false);
            }}
            onInteractOutside={() => {
              field?.onBlur();
              onOpenRegionPopover(false);
            }}
          >
            <div className={popoverLayout}>
              {/* 지역 */}
              <div className={regionList}>
                {UPLOAD_REGION.map((region) => (
                  <button
                    key={region.value}
                    className={`${regionButton} ${
                      selectedRegion === region.value ? activeRegionButton : ''
                    }`}
                    onClick={() => onRegionSelect(region.value)}
                  >
                    {region.label}
                  </button>
                ))}
              </div>

              {/* 시 / 구 / 군 */}
              <div className={subRegionList}>
                {regionData?.children.map((subRegion) => (
                  <button
                    key={subRegion.value}
                    className={`${subRegionButton} ${
                      selectedSubRegion === subRegion.label ? activeRegionButton : ''
                    }`}
                    onClick={() => handleSubRegionSelect(subRegion.label)}
                  >
                    {subRegion.label}
                  </button>
                ))}
              </div>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  },
);

RegionPopover.displayName = 'RegionPopover';

export default RegionPopover;
