import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneFragment, getOneFragmentMetaData } from '../../api';
import { getUser } from '../../auth';

interface Fragment {
  id: string;
  type: string;
  size: number;
  created: string;
  updated: string;
}

const DetailFragment = () => {
  const { id } = useParams();
  const [fragment, setFragment] = useState<Fragment>();
  const [fragmentData, setFragmentData] = useState<{ id: string; data: string }>();

  const navigate = useNavigate();
  useEffect(() => {
    async function getFragment() {
      const user = await getUser();
      if (user && id) {
        const res = await getOneFragment(user, id);
        const res2 = await getOneFragmentMetaData(user, id);
        console.log(res2);
        setFragment(res2);
        setFragmentData(res);
      }
    }
    getFragment();
  }, [id]);
  return (
    <>
      <div style={{ margin: '2rem' }}>
        <h1 style={{ padding: '1rem' }}>Fragment Details</h1>
        {fragment !== undefined && (
          <>
            <p>Fragment Id : {fragment.id}</p>
            <p>Fragment Size : {fragment.size}</p>
            <p>Fragment Type : {fragment.type}</p>
            <p>Fragment Created : {new Date(fragment.created).toLocaleString()}</p>
            <p>Fragment Updated : {new Date(fragment.updated).toLocaleString()}</p>

            <hr />
            <p>Fragment data: {fragmentData?.data}</p>
          </>
        )}
      </div>

      <div style={{ margin: '2rem' }}>
        <button onClick={() => navigate('/')}>Home Page</button>
      </div>
    </>
  );
};

export default DetailFragment;
