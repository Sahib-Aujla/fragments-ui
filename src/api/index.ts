// src/api.js
import { User } from "../models";

// fragments microservice API to use, defaults to localhost:8080 if not set in env
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8081";

/**
 * Given an authenticated user, request all fragments for this user from the
 * fragments microservice (currently only running locally). We expect a user
 * to have an `idToken` attached, so we can send that along with the request.
 */
export async function getUserFragments(user: User) {
  console.log("Requesting user fragments data...");
  try {
    const res = await fetch(`${apiUrl}/v1/fragments`, {
      // Generate headers with the proper Authorization bearer token to pass.
      // We are using the `authorizationHeaders()` helper method we defined
      // earlier, to automatically attach the user's ID token.
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Successfully got user fragments data", { data });
    return data;
  } catch (err) {
    console.error("Unable to call GET /v1/fragment", { err });
  }
}

export async function postUserFragment(user: User, text: string) {
  try {
    const res = await fetch(`${apiUrl}/v1/fragments`, {
      method: "POST",
      headers: {
        ...user.authorizationHeaders(),
        "Content-Type": "text/plain",
      },
      body: text,
    });
    console.log(await res.json());
  } catch (error) {
    console.error("Unable to call Post v1/fragments", { error });
  }
}
