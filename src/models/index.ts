export interface User {
  username: string;
  idToken: string;
  accessToken: string;
  authorizationHeaders: (type?: string) => HeadersInit;
}

// created: "2024-06-04T23:54:54.608Z";
// id: "7d24e895-3591-4d2e-800c-af62161b4895";
// ownerId: "40847e4fe2d9ddba66f980abe48a25340b79934e47bf1a9ffe6bdee72ddabcd5";
// size: 3;
// type: "text/plain";
// updated: "2024-06-04T23:54:54.608Z";
export interface Fragment {
  created: string;
  id: string;
  ownerId: string;
  size: number;
  type: string;
  updated: string;
}
