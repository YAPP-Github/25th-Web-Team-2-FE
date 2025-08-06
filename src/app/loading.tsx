import { loadingLayout, loadingText } from './loading.css';

import DefaultLayout from '@/components/layout/DefaultLayout/DefaultLayout';
import Spinner from '@/components/Spinner/Spinner';

export default function Loading() {
  return (
    <DefaultLayout>
      <div className={loadingLayout}>
        <Spinner />
        <p className={loadingText}>로딩중</p>
      </div>
    </DefaultLayout>
  );
}
