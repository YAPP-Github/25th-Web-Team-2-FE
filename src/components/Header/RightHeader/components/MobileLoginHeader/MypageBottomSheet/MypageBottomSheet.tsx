import { logout } from '@/lib/auth-utils';
import { logoutUser } from '@/lib/mixpanelClient';
import { listItem, mypageBottomSheetLayout } from './MypageBottomSheet.css';

type NotReadyMenu = 'profile' | 'upload' | 'edit' | 'myPosts';

interface MypageBottomSheetProps {
  isResearcher: boolean;
  handleSelectMenu: (menu: NotReadyMenu) => void;
  onClose: () => void;
}

const MypageBottomSheet = ({ isResearcher, handleSelectMenu, onClose }: MypageBottomSheetProps) => {
  const handleClickProfile = () => {
    handleSelectMenu('profile');
    onClose();
  };

  const handleClickMyPosts = () => {
    handleSelectMenu('myPosts');
    onClose();
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
