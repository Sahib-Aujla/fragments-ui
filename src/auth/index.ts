import { Auth } from "aws-amplify";
import {User} from '../models'


export async function getUser(): Promise<User | null> {
    try {
        const currentAuthenticatedUser = await Auth.currentAuthenticatedUser();

        const username = currentAuthenticatedUser.username;
        const idToken = currentAuthenticatedUser.signInUserSession.idToken.jwtToken;
        const accessToken = currentAuthenticatedUser.signInUserSession.accessToken.jwtToken;

        return {
            username,
            idToken,
            accessToken,
            authorizationHeaders: (type = 'application/json'): HeadersInit => {
                const headers: HeadersInit = { 'Content-Type': type };
                headers['Authorization'] = `Bearer ${idToken}`;
                return headers;
            },
        };
    } catch (err) {
        console.log(err);
        return null;
    }
}
