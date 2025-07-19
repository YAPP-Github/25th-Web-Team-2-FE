import ListBottomSheet, {
  ListBottomSheetItem,
} from '@/components/BottomSheet/ListBottomSheet/ListBottomSheet';

import { NotReadyMenu } from '@/components/MobileNotReadyModal/MobileNotReadyModal';
import { logout } from '@/lib/auth-utils';
import { logoutUser } from '@/lib/mixpanelClient';

interface MypageBottomSheetProps {
  isResearcher: boolean;
  handleSelectMenu: (menu: Exclude<NotReadyMenu, 'edit'>) => void;
  onClose: () => void;
}

const MypageBottomSheet = ({ isResearcher, handleSelectMenu, onClose }: MypageBottomSheetProps) => {
  const handleClickProfile = () => {
    onClose();
    handleSelectMenu('profile');
  };

  const handleClickMyPosts = () => {
    onClose();
    handleSelectMenu('myPosts');
  };

  const handleLogout = async () => {
    onClose();
    logoutUser();
    await logout();
  };

  const items = [
    {
      text: '내 정보',
      onClick: handleClickProfile,
    },
    {
      text: '내가 쓴 글',
      onClick: handleClickMyPosts,
      condition: isResearcher,
    },
    {
      text: '로그아웃',
      onClick: handleLogout,
      variant: 'danger',
    },
  ] satisfies ListBottomSheetItem[];

  return <ListBottomSheet items={items} />;
};

export default MypageBottomSheet;
