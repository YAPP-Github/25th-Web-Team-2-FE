import ListBottomSheet, {
  ListBottomSheetItem,
} from '@/components/BottomSheet/ListBottomSheet/ListBottomSheet';

import { PATH } from '@/constants/path';
import { logout } from '@/lib/auth-utils';
import { logoutUser } from '@/lib/mixpanelClient';
import { useRouter } from 'next/navigation';

interface ProfileBottomSheetProps {
  onClose: () => void;
}

const ProfileBottomSheet = ({ onClose }: ProfileBottomSheetProps) => {
  const router = useRouter();

  const goToLeave = () => {
    onClose();
    router.push(PATH.leave);
  };

  const handleLogout = async () => {
    onClose();
    logoutUser();
    await logout();
  };

  const items = [
    {
      text: '로그아웃',
      onClick: handleLogout,
    },

    {
      text: '회원 탈퇴',
      onClick: goToLeave,
      variant: 'danger',
    },
  ] satisfies ListBottomSheetItem[];

  return <ListBottomSheet items={items} />;
};

export default ProfileBottomSheet;
