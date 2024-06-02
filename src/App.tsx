import "./App.css";
import { Amplify } from "aws-amplify";

import {
  withAuthenticator,
  WithAuthenticatorProps,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { getUser } from "./auth";
import { getUserFragments } from "./api";
import { useEffect } from "react";
import { Link } from "react-router-dom";

Amplify.configure({
  Auth: {
    region: "us-east-1",

    // Amazon Cognito User Pool ID
    userPoolId: import.meta.env.VITE_AWS_COGNITO_POOL_ID,

    // Amazon Cognito App Client ID (26-char alphanumeric string)
    userPoolWebClientId: import.meta.env.VITE_AWS_COGNITO_CLIENT_ID,

   
  },
});

interface Props extends WithAuthenticatorProps {
  isPassedToWithAuthenticator: boolean;
}

function App({ isPassedToWithAuthenticator, signOut,user }: Props) {
  if (!isPassedToWithAuthenticator) {
    throw new Error(`isPassedToWithAuthenticator was not provided`);
  }


  useEffect(() => {
    async function fetchData() {
      const user = await getUser();
      if (user) {
        const userFragments = await getUserFragments(user);
        console.log(userFragments);
      }
    }

    fetchData();
  }, []);
  
  return (
    <>
      <h1>Hello {user?.username}</h1>
      <button onClick={signOut}>Sign out</button>

      <hr />
      <button><Link to="/addfragment">Add Fragment</Link></button>


    </>
  );
}

export default withAuthenticator(App, {
  signUpAttributes: ["email", "name"],
});

export async function getStaticProps() {
  return {
    props: {
      isPassedToWithAuthenticator: true,
    },
  };
}
