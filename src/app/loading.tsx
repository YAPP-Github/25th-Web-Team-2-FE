import { commonStatusLayout, commonStatusText } from './common-status.css';

import DefaultLayout from '@/components/layout/DefaultLayout/DefaultLayout';
import Spinner from '@/components/Spinner/Spinner';

export default function Loading() {
  return (
    <DefaultLayout>
      <div className={commonStatusLayout}>
        <Spinner />
        <p className={commonStatusText}>로딩중</p>
      </div>
    </DefaultLayout>
  );
}
