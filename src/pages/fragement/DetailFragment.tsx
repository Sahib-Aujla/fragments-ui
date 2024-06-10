import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneFragment } from '../../api';
import { getUser } from '../../auth';

const DetailFragment = () => {
  const { id } = useParams();
  const [fragment, setFragment] = useState<{ id: string; data: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    async function getFragment() {
      const user = await getUser();
      if (user && id) {
        const res = await getOneFragment(user, id);
        setFragment(res);
      }
    }
    getFragment();
  }, [id]);
  return (
    <>
      <div style={{ margin: '2rem' }}>
        <h1 style={{ padding: '1rem' }}>Fragment Details</h1>
        <p>Fragment Id : {fragment?.id}</p>
        <p>Fragment data: {fragment?.data}</p>
        <p>Fragmetn size: {fragment?.data?.length}</p>
      </div>
      <div style={{ margin: '2rem' }}>
        <button onClick={() => navigate('/')}>Home Page</button>
      </div>
    </>
  );
};

export default DetailFragment;
