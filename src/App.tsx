import "./App.css";
import { Amplify } from "aws-amplify";

import {
  withAuthenticator,
  WithAuthenticatorProps,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure({
  Auth: {
    region: "us-east-1",

    // Amazon Cognito User Pool ID
    userPoolId: import.meta.env.VITE_AWS_COGNITO_POOL_ID,

    // Amazon Cognito App Client ID (26-char alphanumeric string)
    userPoolWebClientId: import.meta.env.VITE_AWS_COGNITO_CLIENT_ID,

    // Hosted UI configuration
    oauth: {
      // Amazon Hosted UI Domain
      domain: import.meta.env.VITE_AWS_COGNITO_HOSTED_UI_DOMAIN,

      scope: ["email", "phone", "openid"],

      redirectSignIn: import.meta.env.VITE_OAUTH_SIGN_IN_REDIRECT_URL,
      redirectSignOut: import.meta.env.VITE_OAUTH_SIGN_OUT_REDIRECT_URL,

      // We're using the Access Code Grant flow (i.e., `code`)
      responseType: "code",
    },
  },
});

interface Props extends WithAuthenticatorProps {
  isPassedToWithAuthenticator: boolean;
}

function App({ isPassedToWithAuthenticator, signOut, user }: Props) {
  if (!isPassedToWithAuthenticator) {
    throw new Error(`isPassedToWithAuthenticator was not provided`);
  }

  return (
    <>
      <h1>Hello {user?.username}</h1>
      <button onClick={signOut}>Sign out</button>
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
