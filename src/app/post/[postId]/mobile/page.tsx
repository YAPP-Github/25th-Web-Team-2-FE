import { fetchExperimentPost } from '../server/fetchExperimentPost';
import ExperimentPostMobileContainer from './components/ExperimentPostMobileContainer/ExperimentPostMobileContainer';

interface MobilePageProps {
  params: { postId: string };
}

export default async function ExperimentDetailPostMobilePage({ params }: MobilePageProps) {
  const { postId } = params;

  const { postDetailData, applyMethodData } = await fetchExperimentPost(postId);

  return (
    <ExperimentPostMobileContainer
      postId={postId}
      postDetailData={postDetailData}
      applyMethodData={applyMethodData}
    />
  );
}
