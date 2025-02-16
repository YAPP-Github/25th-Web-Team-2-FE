import EditExperimentPost from './components/EditExperimentPost';

const EditPostPage = ({ params }: { params: { post_id: string } }) => {
  return <EditExperimentPost params={params} />;
};

export default EditPostPage;
