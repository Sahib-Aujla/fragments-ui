import { useEffect, useState } from 'react';
import { getUser } from '../auth';
import { getUserFragments } from '../api';
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

      <button style={{ margin: '2rem 0' }} onClick={() => navigate('/addfragment')}>
        Add Fragment
      </button>

      <hr />

      <h2>Existing Fragments</h2>
      {fragments.length > 0 ? (
        fragments?.map((fragment, i) => (
          <div key={i}>
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '2rem',
                margin: '1rem',
              }}
            >
              <p>
                <strong>Fragment Id:</strong> {fragment.id}
              </p>
              <p>
                <strong>Type:</strong>
                {fragment.type}
              </p>
              <p>
                <strong>Size: </strong>
                {fragment.size}
              </p>
              <p>
                <strong>Created:</strong> {new Date(fragment.created).toLocaleString()}
              </p>
              <p>
                <strong>Updated:</strong> {new Date(fragment.updated).toLocaleString()}
              </p>

              <button onClick={() => navigate('/details/' + fragment.id)}>Details</button>
            </div>
            <hr />
          </div>
        ))
      ) : (
        <p>No existing fragments found.</p>
      )}
    </>
  );
}
