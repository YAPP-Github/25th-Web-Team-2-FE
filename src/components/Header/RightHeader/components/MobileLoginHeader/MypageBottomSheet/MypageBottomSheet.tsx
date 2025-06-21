import { listItem, mypageBottomSheetLayout } from './MypageBottomSheet.css';

import { logout } from '@/lib/auth-utils';
import { logoutUser } from '@/lib/mixpanelClient';

type NotReadyMenu = 'profile' | 'upload' | 'edit' | 'myPosts';

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

  return (
    <section className={mypageBottomSheetLayout}>
      <button className={listItem} onClick={handleClickProfile}>
        내 정보
      </button>

      {isResearcher && (
        <button className={listItem} onClick={handleClickMyPosts}>
          내가 쓴 글
        </button>
      )}
      <button className={listItem} onClick={handleLogout}>
        로그아웃
      </button>
    </section>
  );
};

export default MypageBottomSheet;
