export interface User {
    username: string;
    idToken: string;
    accessToken: string;
    authorizationHeaders: (type?: string) => HeadersInit;
}
