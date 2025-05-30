import Banner from '../components/Banner/Banner';
import ExperimentPostContainer from '../components/ExperimentPostContainer/ExperimentPostContainer';

import DefaultLayout from '@/components/layout/DefaultLayout/DefaultLayout';

export default function Home() {
  return (
    <DefaultLayout>
      <Banner />
      <ExperimentPostContainer />
    </DefaultLayout>
  );
}
