import { CSSProperties } from 'react';

import { containerStyle } from './icon.styled';
import * as icons from './icons';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: keyof typeof icons;
  width?: number;
  height?: number;
  rotate?: number;
  cursor?: CSSProperties['cursor'];
  color?: string;
}

export default function Icon({
  icon,
  cursor = 'initial',
  width = 24,
  height = 24,
  rotate,
  className,
  color,
  ...props
}: IconProps) {
  const IconComponent = icons[icon as keyof typeof icons];

  return (
    <div css={containerStyle({ width, height, rotate, cursor })}>
      <IconComponent
        {...props}
        className={`icon ${className || ''}`.trim()}
        width={width}
        height={height}
        color={color}
      />
    </div>
  );
}
