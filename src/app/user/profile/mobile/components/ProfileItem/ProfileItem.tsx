import React from 'react';

import {
  itemLabel,
  itemLabelWrapper,
  itemTitle,
  itemTitleWrapper,
  profileItemWrapper,
} from './ProfileItem.css';

import AreaTooltip from '@/app/join/components/AreaTooltip/AreaTooltip';
import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

interface ProfileItemProps {
  title: string;
  required?: boolean;
  label?: React.ReactNode;
  onClick?: () => void;
  isIcon?: boolean;
  rightElement?: React.ReactNode;
  isArrow?: boolean;
}

const ProfileItem = ({
  title,
  required,
  label,
  onClick,
  isIcon,
  rightElement,
  isArrow = true,
}: ProfileItemProps) => {
  return (
    <li className={profileItemWrapper} onClick={onClick}>
      <div className={itemTitleWrapper}>
        <span className={itemTitle}>{title}</span>
        {isIcon && <AreaTooltip />}
        {required && <span style={{ color: colors.textAlert }}>*</span>}
      </div>
      <div className={itemLabelWrapper}>
        <div className={itemLabel}>{label}</div>
        {rightElement}
        {isArrow && <Icon icon="Chevron" rotate={-90} />}
      </div>
    </li>
  );
};

export default ProfileItem;
