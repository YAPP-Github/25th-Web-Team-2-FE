import React from 'react';


import Icon from '@components/Icon';
import AreaTooltip from '@join/components/AreaTooltip';
import { colors } from '@styles/colors';

import {
  itemLabel,
  itemLabelWrapper,
  itemTitle,
  itemTitleWrapper,
  profileItemWrapper,
} from './ProfileItem.css';

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
