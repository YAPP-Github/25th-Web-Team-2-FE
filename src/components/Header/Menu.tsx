import * as Select from '@radix-ui/react-select';
import Link from 'next/link';
import { useState } from 'react';

import { contentContainer, selectItem, triggerWrapper } from './Menu.css';

import { ParticipantResponse, ResearcherResponse } from '@/apis/login';
import Icon from '@/components/Icon';
import useSessionStorage from '@/hooks/useSessionStorage';
import { isResearcherInfo } from '@/utils/typeGuard';

interface MenuProps {
  userInfo: ParticipantResponse | ResearcherResponse;
}

const Menu = ({ userInfo }: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { clear } = useSessionStorage();

  const logout = () => {
    clear();
    window.location.href = '/';
  };

  return (
    <Select.Root onOpenChange={(open) => setIsOpen(open)}>
      <Select.Trigger className={triggerWrapper}>
        <span>{userInfo.memberInfo.name}</span>
        <Select.Icon>
          <Icon
            icon="TriangleArrow"
            width={20}
            height={20}
            rotate={isOpen ? 0 : 180}
            cursor="pointer"
          />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className={contentContainer}
          position="popper"
          sideOffset={4}
          align="center"
        >
          <Select.Group>
            <Link href="/user/profile" className={selectItem}>
              내 정보 수정
            </Link>
            {isResearcherInfo(userInfo) && (
              <Link href="/my-posts" className={selectItem}>
                내가 쓴 글
              </Link>
            )}
            <Select.Label className={selectItem} onClick={logout}>
              로그아웃
            </Select.Label>
          </Select.Group>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default Menu;
