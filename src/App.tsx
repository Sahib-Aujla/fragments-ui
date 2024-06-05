import "./App.css";
import { Amplify } from "aws-amplify";

import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import Home from "./pages/Home";

Amplify.configure({
  Auth: {
    region: "us-east-1",

    // Amazon Cognito User Pool ID
    userPoolId: import.meta.env.VITE_AWS_COGNITO_POOL_ID,

    // Amazon Cognito App Client ID (26-char alphanumeric string)
    userPoolWebClientId: import.meta.env.VITE_AWS_COGNITO_CLIENT_ID,
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export default withAuthenticator(Home, {
  signUpAttributes: ["email", "name"],
});

export async function getStaticProps() {
  return {
    props: {
      isPassedToWithAuthenticator: true,
    },
  };
}
