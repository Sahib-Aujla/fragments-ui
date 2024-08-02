// src/api.js
import { User } from '../models';

// fragments microservice API to use, defaults to localhost:8080 if not set in env
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';

/**
 * Given an authenticated user, request all fragments for this user from the
 * fragments microservice (currently only running locally). We expect a user
 * to have an `idToken` attached, so we can send that along with the request.
 */

export async function getUserFragments(user: User) {
  console.log('Requesting user fragments data...');
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/?expand=1`, {
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} with ${res.statusText}`);
    }
    const data = await res.json();
    console.log('Successfully got user fragments data', { data });
    return data;
  } catch (err) {
    console.error('Unable to call GET /v1/fragment', { err });
  }
}

export async function getOneFragment(user: User, id: string) {
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}`, {
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} with ${res.statusText}`);
    }
    const contentType = res.headers.get('Content-Type');
    const data =
      contentType && contentType.startsWith('image/') ? await res.blob() : await res.text();
    //const data=res
    console.log('Successfully got user fragment data for ' + id, { data });
    return { id, data };
  } catch (err) {
    console.error('Unable to call GET /v1/fragment', { err });
  }
}

export async function getOneFragmentMetaData(user: User, id: string) {
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}/info`, {
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} with ${res.statusText}`);
    }

    const data = await res.json();
    console.log({ data });
    return data;
  } catch (err) {
    console.error('Unable to call GET /v1/fragment', { err });
  }
}

export async function postUserFragment(user: User, formData: FormData) {
  try {
    const data: { [key: string]: string | File } = {};
    formData.forEach((value, key) => {
      console.log(`key ${key}, value ${value}`);
      data[key] = value;
    });

    console.log(data);
    const res = await fetch(`${apiUrl}/v1/fragments`, {
      method: 'POST',
      headers: {
        ...user.authorizationHeaders(),
        'Content-Type': String(data?.type),
      },
      body: data.file ? data.file : data.text,
    });
    console.log(res);

    const resp = await res.json();
    return resp;
  } catch (error) {
    console.error('Unable to call Post v1/fragments', { error });
  }
}

export async function deletePost(user: User, id: string) {
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}`, {
      method: 'DELETE',
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} with ${res.statusText}`);
    }
    return true;
  } catch (error) {
    console.error('Unable to call Delete v1/fragments', { error });
    return false;
  }
}
