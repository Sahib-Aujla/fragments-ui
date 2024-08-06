import { useNavigate, useParams } from 'react-router-dom';
import { getUser } from '../../auth';
import { getOneFragment } from '../../api';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { typeState } from '../../state';

const Convert = () => {
  const [fragmentData, setFragmentData] = useState<string | Blob>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [gType, setGType] = useRecoilState(typeState);

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
      <h1>Converted Data to {gType}</h1>
      <h2>Fragment id: {id}</h2>
      <hr />
      {/* <p>Fragment data: {String(fragmentData)}</p> */}
      {gType.startsWith('image/') ? (
        <img
          src={URL.createObjectURL(new Blob([fragmentData as unknown as Blob], { type: gType }))}
          alt="Fragment"
        />
      ) : (
        <p>Fragment data: {String(fragmentData)}</p>
      )}

      <button
        onClick={() => {
          navigate(`/details/${id?.split('.')[0]}`);
        }}
      >
        Back
      </button>
    </div>
  );
};

export default Convert;
