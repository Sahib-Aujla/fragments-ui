import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePost, getOneFragment, getOneFragmentMetaData } from '../../api';
import { getUser } from '../../auth';
import { toast, ToastContainer } from 'react-toastify';

interface Fragment {
  id: string;
  type: string;
  size: number;
  created: string;
  updated: string;
}

const validConversions: { [key: string]: string[] } = {
  'text/plain': ['text/plain'],
  'text/markdown': ['text/markdown', 'text/html', 'text/plain'],
  'text/html': ['text/html', 'text/plain'],
  'text/csv': ['text/csv', 'text/plain', 'application/json'],
  'application/json': ['application/json', 'application/x-yaml', 'text/plain'],
  'image/png': ['image/png', 'image/jpeg', 'image/gif', 'image/avif', 'image/webp'],
  'image/jpeg': ['image/png', 'image/jpeg', 'image/gif', 'image/avif', 'image/webp'],
  'image/gif': ['image/png', 'image/jpeg', 'image/gif', 'image/avif', 'image/webp'],
  'image/avif': ['image/png', 'image/jpeg', 'image/gif', 'image/avif', 'image/webp'],
  'image/webp': ['image/png', 'image/jpeg', 'image/gif', 'image/avif', 'image/webp'],
};

const mType: { [key: string]: string } = {
  'text/plain': 'txt',
  'text/markdown': 'md',
  'text/html': 'html',
  'text/csv': 'csv',
  'application/json': 'json',

  'application/x-yaml': 'yml',
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/webp': 'webp',
  'image/avif': 'avif',
  'image/gif': 'gif',
};

const DetailFragment = () => {
  const { id } = useParams();
  const [fragment, setFragment] = useState<Fragment>();
  const [fragmentData, setFragmentData] = useState<string | Blob>();
  const [type, setType] = useState('');
  const [conversion, setConversion] = useState('text/plain');
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
        setConversion(res2.type);
        setType(validConversions[conversion][0]);
        setFragmentData(res?.data);
      }
    }
    getFragment();
  }, [id]);

  const handleDelete = async () => {
    try {
      const user = await getUser();
      if (user && id) {
        const res = await deletePost(user, id);
        if (res === true) {
          toast.success('Success Notification!', {
            position: 'top-right',
          });
          await new Promise((resolve) => setTimeout(resolve, 1000));
          navigate('/');
        }
      }
    } catch (error) {
      console.log('unable to delete fragment');
    }
  };
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

      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (type) {
              const ext = mType[type];
              navigate(`/convert/${id}.${ext}`);
            }
          }}
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '5',
            width: '100%',
          }}
        >
          <select
            name="type"
            onChange={(e) => setType(e.target.value)}
            style={{ margin: '1rem 0.5rem', padding: '1rem', width: '80%' }}
          >
            {validConversions[conversion].map((val) => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>
          <button style={{ margin: '1rem 0' }} type="submit">
            Convert Data
          </button>
        </form>
      </div>
      <div
        style={{
          margin: '2rem',
          display: 'flex',
          width: '100%',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <button onClick={() => navigate('/')}>Home Page</button>
        <button style={{ color: 'red' }} onClick={handleDelete}>
          Delete
        </button>
        <button onClick={() => navigate(`/update/${id}`)}>Update</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default DetailFragment;
