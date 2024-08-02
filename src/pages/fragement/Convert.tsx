import { useNavigate, useParams } from 'react-router-dom';
import { getUser } from '../../auth';
import { getOneFragment } from '../../api';
import { useEffect, useState } from 'react';

const Convert = () => {
  const [fragmentData, setFragmentData] = useState<string | Blob>();

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function getFragment() {
      const user = await getUser();
      if (user && id) {
        const res = await getOneFragment(user, id);

        console.log({ res });

        setFragmentData(res?.data);
      }
    }
    getFragment();
  }, [id]);
  return (
    <div>
      <h1>Converted Data</h1>
      <h2>Fragment id: {id}</h2>
      <hr />
      <p>Fragment data: {String(fragmentData)}</p>
      {/* {fragment.type.startsWith('image/') ? (
        <img
          src={URL.createObjectURL(
            new Blob([fragmentData as unknown as Blob], { type: fragment.type })
          )}
          alt="Fragment"
        />
      ) : (
        <p>Fragment data: {String(fragmentData)}</p>
      )} */}

      <button
        onClick={() => {
          navigate(`/details/${id?.split('.')[0]}`);
        }}
      >Back</button>
    </div>
  );
};

export default Convert;
