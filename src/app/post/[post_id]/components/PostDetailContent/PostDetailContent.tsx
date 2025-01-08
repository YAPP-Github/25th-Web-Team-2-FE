import { postContentLayout, postContentWrapper } from './PostDetailContent.styles';
import { POST_CONTENT } from '../../constants/postContentData';
import formattedContentText from '../../utils/formattedContentText';

function PostDetailContent() {
  return (
    <div css={postContentLayout}>
      <h3>실험 안내</h3>
      <div css={postContentWrapper}>{formattedContentText(POST_CONTENT.content || '')}</div>
    </div>
  );
}

export default PostDetailContent;
