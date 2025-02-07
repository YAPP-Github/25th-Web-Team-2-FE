import Banner from './home/components/Banner/Banner';
import ExperimentPostContainer from './home/components/ExperimentPostContainer/ExperimentPostContainer';

import DefaultLayout from '@/components/layout/DefaultLayout/DefaultLayout';

export default function Home() {
  return (
    <DefaultLayout>
      <Banner />
      <ExperimentPostContainer />
    </DefaultLayout>
  );
}
