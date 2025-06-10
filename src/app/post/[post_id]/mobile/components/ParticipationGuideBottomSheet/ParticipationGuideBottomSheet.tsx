import {
  participationGuideBottomSheetLayout,
  bottomSheetTitle,
} from './ParticipationGuideBottomSheet.css';
import useApplyMethodQuery from '../../../hooks/useApplyMethodQuery';

import Button from '@/components/Button/Button';

const ParticipationGuideBottomSheet = ({
  onConfirm,
  postId,
}: {
  onConfirm: VoidFunction;
  postId: string;
}) => {
  /* 공고 지원 방법 조회 */
  const { data: applyMethodData, isLoading: isLoadingApply } = useApplyMethodQuery({ postId });

  // todo 로딩 상태 및 EmptyView 추가 예정
  if (isLoadingApply) {
    return <div>로딩 중...</div>;
  }
  if (!applyMethodData) return <div>데이터 없음</div>;

  return (
    <section className={participationGuideBottomSheetLayout}>
      <h2 className={bottomSheetTitle}>참여 방법</h2>
      <p>{applyMethodData.content}</p>

      <div>
        <Button onClick={onConfirm} variant="dark" size="small" height={'5.6rem'}>
          확인
        </Button>
      </div>
    </section>
  );
};

export default ParticipationGuideBottomSheet;
