import EditExperimentPost from './components/EditExperimentPost';

const EditPostPage = ({ params }: { params: { postId: string } }) => {
  return <EditExperimentPost params={params} />;
};

export default EditPostPage;
