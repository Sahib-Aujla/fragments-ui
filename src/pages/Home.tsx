import { useEffect, useState } from 'react';
import { getUser } from '../auth';
import { getUserFragments } from '../api';
import { Link } from 'react-router-dom';
import { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';

interface Props extends WithAuthenticatorProps {
  isPassedToWithAuthenticator: boolean;
}

interface Fragment {
  id: string;
  type: string;
  size: number;
  created: string;
  updated: string;
}

export default function Home({ isPassedToWithAuthenticator, signOut, user }: Props) {
  if (!isPassedToWithAuthenticator) {
    throw new Error(`isPassedToWithAuthenticator was not provided`);
  }

  const [fragments, setFragments] = useState<Fragment[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const user = await getUser();
      if (user) {
        const userFragments = await getUserFragments(user);
        if (userFragments) {
          setFragments(userFragments.fragments);
        }
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <h1>Hello {user?.username}</h1>
      <button style={{ margin: '2rem 0' }} onClick={signOut}>
        Sign out
      </button>

      <hr />

      <button style={{ margin: '2rem 0' }}>
        <Link to="/addfragment">Add Fragment</Link>
      </button>

      <hr />

      <h2>Existing Fragments</h2>
      {fragments.length > 0 ? (
        fragments?.map((fragment, i) => (
          <>
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '2rem',
                margin: '1rem',
              }}
            >
              <p>Fragment Id: {fragment.id}</p>
              <p>Type: {fragment.type}</p>
              <p>Size: {fragment.size}</p>
              <p>Created: {new Date(fragment.created).toLocaleString()}</p>
              <p>Updated: {new Date(fragment.updated).toLocaleString()}</p>

              <button onClick={() => navigate('/details/' + fragment.id)}>Details</button>
            </div>
            <hr />
          </>
        ))
      ) : (
        <p>No existing fragments found.</p>
      )}
    </>
  );
}
