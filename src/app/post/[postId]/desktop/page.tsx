import { fetchExperimentPost } from '../server/fetchExperimentPost';
import ExperimentPostContainer from './components/ExperimentPostContainer/ExperimentPostContainer';

interface DesktopPageProps {
  params: { postId: string };
}

export default async function ExperimentPostDesktopPage({ params }: DesktopPageProps) {
  const { postId } = params;

  const { postDetailData, applyMethodData } = await fetchExperimentPost(postId);

  return (
    <ExperimentPostContainer postDetailData={postDetailData} applyMethodData={applyMethodData} />
  );
}
