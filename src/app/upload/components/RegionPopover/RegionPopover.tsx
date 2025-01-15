import * as Popover from '@radix-ui/react-popover';
import { css, Theme } from '@emotion/react';
import { UPLOAD_REGION } from '@/constants/uploadRegion';
import { input } from '../UploadContainer/UploadContainer';
import {
  popoverInput,
  popoverContent,
  popoverLayout,
  regionList,
  regionButton,
  activeRegionButton,
  subRegionList,
  subRegionButton,
} from './RegionPopover.styles';

interface RegionPopoverProps {
  regionPopoverProps: {
    isOpenRegionPopover: boolean;
    selectedRegion: string | null;
    selectedSubRegion: string | null;
    onOpenRegionPopover: (open: boolean) => void;
    onRegionSelect: (region: string) => void;
    onSubRegionSelect: (subRegion: string) => void;
  };
}

const RegionPopover = ({ regionPopoverProps }: RegionPopoverProps) => {
  const {
    isOpenRegionPopover,
    onOpenRegionPopover,
    onRegionSelect,
    onSubRegionSelect,
    selectedRegion,
    selectedSubRegion,
  } = regionPopoverProps;

  const regionData = selectedRegion
    ? UPLOAD_REGION.find((region) => region.value === selectedRegion) || null
    : UPLOAD_REGION.find((region) => region.value === 'SEOUL') || null;

  return (
    <Popover.Root open={isOpenRegionPopover} onOpenChange={onOpenRegionPopover}>
      <Popover.Trigger asChild>
        <input
          css={(theme) => [input, popoverInput(theme, isOpenRegionPopover)]}
          type="text"
          id="location"
          placeholder="지역구 선택"
          value={
            selectedRegion && selectedSubRegion ? `${regionData?.label} ${selectedSubRegion}` : ''
          }
          readOnly
        />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content sideOffset={6} css={popoverContent}>
          <div css={popoverLayout}>
            {/* 지역 */}
            <div css={regionList}>
              {UPLOAD_REGION.map((region) => (
                <button
                  key={region.value}
                  css={[regionButton, selectedRegion === region.value && activeRegionButton]}
                  onClick={() => onRegionSelect(region.value)}
                >
                  {region.label}
                </button>
              ))}
            </div>

            {/* 시 / 구 / 군 */}
            <div css={subRegionList}>
              {regionData?.children.map((subRegion) => (
                <button
                  key={subRegion.value}
                  css={[
                    subRegionButton,
                    selectedSubRegion === subRegion.label && activeRegionButton,
                  ]}
                  onClick={() => onSubRegionSelect(subRegion.label)}
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
};

export default RegionPopover;
