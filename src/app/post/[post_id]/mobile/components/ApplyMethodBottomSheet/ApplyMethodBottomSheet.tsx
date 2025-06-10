import { applyMethodBottomSheetLayout } from './ApplyMethodBottomSheet.css';

import Button from '@/components/Button/Button';

const ApplyMethodBottomSheet = ({ onConfirm }: { onConfirm: VoidFunction }) => {
  return (
    <section className={applyMethodBottomSheetLayout}>
      <h2>참여 방법</h2>
      <p>아래 연락처로 성함 / 연락처 / 참여 가능한 날짜와 함께 메일을 보내주세요.</p>
      <p>teamdobby@gmail.com</p>
      <p>010-1234-5678</p>

      <div>
        <Button onClick={onConfirm} variant="dark" size="small" height={'5.6rem'}>
          확인
        </Button>
      </div>
    </section>
  );
};

export default ApplyMethodBottomSheet;
