import Banner from './home/components/Banner/Banner';
import PostContainer from './home/components/PostContainer/PostContainer';

import DefaultLayout from '@/components/layout/DefaultLayout/DefaultLayout';

export default function Home() {
  return (
    <DefaultLayout>
      <Banner />
      <PostContainer />
    </DefaultLayout>
  );
}
