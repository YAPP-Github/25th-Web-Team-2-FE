import DefaultLayout from '@/components/layout/DefaultLayout/DefaultLayout';

import Banner from './home/components/Banner/Banner';
import PostContainer from './home/components/PostContainer/PostContainer';

export default function Home() {
  return (
    <DefaultLayout>
      <Banner />
      <PostContainer />
    </DefaultLayout>
  );
}
