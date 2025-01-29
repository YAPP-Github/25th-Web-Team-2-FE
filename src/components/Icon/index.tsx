'use client';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { iconContainer, dynamicVars, iconDynamicStyle } from './icon.css';
import * as icons from './icons';

export interface CustomSVGProps extends React.SVGProps<SVGSVGElement> {
  subcolor?: string;
}

type Cursor = 'initial' | 'default' | 'pointer' | 'notAllowed' | undefined;

interface IconProps extends CustomSVGProps {
  icon: keyof typeof icons;
  width?: number;
  height?: number;
  rotate?: 0 | 90 | 180 | 270;
  cursor?: Cursor;
  color?: string;
}

export default function Icon({
  icon,
  cursor = 'initial',
  width = 24,
  height = 24,
  rotate = 0,
  className,
  color,
  subcolor,
  ...props
}: IconProps) {
  const IconComponent = icons[icon];

  return (
    <div
      className={iconContainer({
        rotate,
        cursor,
      })}
    >
      <IconComponent
        {...props}
        className={`${iconDynamicStyle} ${className || ''}`.trim()}
        style={assignInlineVars({
          [dynamicVars.width]: `${width}px`,
          [dynamicVars.height]: `${height}px`,
        })}
        color={color}
        subcolor={subcolor}
      />
    </div>
  );
}
