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
  const [fragmentData, setFragmentData] = useState<string | Blob>();

  const navigate = useNavigate();
  useEffect(() => {
    async function getFragment() {
      const user = await getUser();
      if (user && id) {
        const res = await getOneFragment(user, id);
        const res2 = await getOneFragmentMetaData(user, id);
        console.log(res2);
        console.log({ res });

        setFragment(res2);
        setFragmentData(res?.data);
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

            {fragment.type.startsWith('image/') ? (
              <img
                src={URL.createObjectURL(
                  new Blob([fragmentData as unknown as Blob], { type: fragment.type })
                )}
                alt="Fragment"
              />
            ) : (
              <p>Fragment data: {String(fragmentData)}</p>
            )}
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
