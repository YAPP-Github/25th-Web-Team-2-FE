import { postContentLayout, postContentWrapper } from './PostDetailContent.css';
import { UseQueryExperimentDetailsAPIResponse } from '../../hooks/useExperimentDetailsQuery';
import { formattedContentText } from '../../PostPage.utils';

interface PostDetailContentProps {
  postDetailData: UseQueryExperimentDetailsAPIResponse;
}

const PostDetailContent = ({ postDetailData }: PostDetailContentProps) => {
  return (
    <div className={postContentLayout}>
      <h3>실험 안내</h3>
      <div className={postContentWrapper}>{formattedContentText(postDetailData.content || '')}</div>
    </div>
  );
};

export default PostDetailContent;
