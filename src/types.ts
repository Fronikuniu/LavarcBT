export type Image = {
  builder: string;
  createdAt: Date;
  desc: string;
  id: number;
  imageSrc: string;
  imagePath: string;
  imgurAlbum: string;
  price: number;
  sale: number;
  title: string;
};
export type Member = {
  name: string;
  memberSrc: string;
  about: string;
  discord: string;
};
export type User = {
  avatar: string;
  avatarPath: string;
  createdAt: Date;
  email: string;
  isAdmin?: boolean;
  isOnline: boolean;
  name: string;
  uid: string;
};
export type LoggedUser = {
  accessToken: string;
  auth: Record<string, unknown>;
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: {
    createdAt: string;
    creationTime: string;
    lastLoginAt: string;
    lastSignInTime: string;
  };
  phoneNumber: number | null;
  photoURL: string;
  proactiveRefresh: {
    errorBackoff: number;
    isRunning: boolean;
    timerId: string | number | null;
    user: LoggedUser;
  };
  providerData: {
    displayName: string;
    email: string;
    phoneNumber: string | number | null;
    photoURL: string;
    providerId: string;
    uid: string;
  }[];
  providerId: string;
  reloadListener: string | null;
  reloadUserInfo: {
    createdAt: string;
    displayName: string;
    email: string;
    emailVerified: false;
    lastLoginAt: string;
    lastRefreshAt: string;
    localId: string;
    passwordHash: string;
    passwordUpdatedAt: number;
    photoUrl: string;
    providerUserInfo: {
      displayName: string;
      email: string;
      federatedId: string;
      photoUrl: string;
      providerId: string;
      rawId: string;
    }[];
    validSince: string;
  };
  stsTokenManager: {
    accessToken: string;
    expirationTime: number;
    refreshToken: string;
    isExpired: boolean;
  };
  tenantId: string | null;
  uid: string;
  refreshToken: string;
};
export type LoginData = {
  name: string;
  email: string;
  password: string;
};
export type FormErrors = {
  [key: string]: {
    [key: string]: string;
  };
};
export interface LoginErrors {
  'auth/missing-email': 'Missing email.';
  'auth/wrong-password': 'The password provided is not valid.';
  'auth/user-not-found': 'The member with the given email does not exist.';
}
