
import { ExperimentPostListFilters } from '@apis/post';
import { fetchExperimentPosts } from '@home/server/fetchExperimentPosts';
import { fetchParticipantInfo } from '@home/server/fetchParticipantInfo';

import ExperimentPostCardListContainer from '../ExperimentPostCardListContainer';

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
