import { useRouter } from 'next/navigation';

import ListBottomSheet, {
  ListBottomSheetItem,
} from '@/components/BottomSheet/ListBottomSheet/ListBottomSheet';
import { PATH } from '@/constants/path';
import { logout } from '@/lib/auth-utils';
import { logoutUser } from '@/lib/mixpanelClient';

interface MypageBottomSheetProps {
  onClose: () => void;
}

const MypageBottomSheet = ({ onClose }: MypageBottomSheetProps) => {
  const router = useRouter();

  const handleClickProfile = () => {
    onClose();
    router.push(PATH.profile);
  };

  const handleLogout = async () => {
    onClose();
    logoutUser();
    await logout();
  };

  const items = [
    {
      text: '내 정보 수정',
      onClick: handleClickProfile,
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
