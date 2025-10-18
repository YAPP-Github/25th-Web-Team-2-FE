import ExperimentPostCardListContainer from '../ExperimentPostCardListContainer/ExperimentPostCardListContainer';

import { ExperimentPostListFilters } from '@/apis/post';
import { fetchExperimentPosts } from '@/app/home/server/fetchExperimentPosts';
import { fetchParticipantInfo } from '@/app/home/server/fetchParticipantInfo';

interface ExperimentPostSectionProps {
  searchParams: {
    [k in keyof ExperimentPostListFilters]?: string;
  };
}

const ExperimentPostSection = async ({ searchParams }: ExperimentPostSectionProps) => {
  const initialPosts = await fetchExperimentPosts({ searchParams });
  const participantInfo = await fetchParticipantInfo();

  return (
    <ExperimentPostCardListContainer
      initialPosts={initialPosts}
      participantInfo={participantInfo}
    />
  );
};

export default ExperimentPostSection;
