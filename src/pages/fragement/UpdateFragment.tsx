import { useParams } from 'react-router-dom';

const UpdateFragment = () => {
  const { id } = useParams();

  return <div>{id}</div>;
};

export default UpdateFragment;
