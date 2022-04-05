export type Image = {
  doc_id?: string;
  builder?: string;
  createdAt?: Date;
  desc?: string;
  id: number;
  imageSrc: string;
  imagePath?: string;
  imgurAlbum?: string;
  price?: number;
  sale?: number;
  title: string;
};
export type Member = {
  name: string;
  memberSrc: string;
  about: string;
  discord: string;
};
export type UserData = {
  avatar: string;
  avatarPath: string;
  createdAt: Date;
  email: string;
  isAdmin?: boolean;
  isOnline: boolean;
  name: string;
  uid: string;
};
export type Opinion = {
  doc_id?: string;
  community: string;
  created: Date;
  from: string;
  username?: string;
  id: string;
  isAccepted: boolean;
  opinion: string;
  rate: number;
};
export type MessageT = {
  createdAt: Date;
  from: string;
  media?: string;
  messageText?: string;
  to: string;
};
export type LastMessage = {
  createdAt: Date;
  from: string;
  media?: string;
  messageText?: string;
  to: string;
  unread: boolean;
};
export type LoginData = {
  name: string;
  email: string;
  password: string;
};
export type EditProfileBasicProps = {
  username: string;
  email: string;
  status: boolean;
};
export type EditProfilePasswordProps = {
  password: string;
  repeatPassword: string;
};
export interface GalleryFormImage extends Image {
  image: FileList;
}
export interface LoginErrors {
  'auth/missing-email': 'Missing email.';
  'auth/wrong-password': 'The password provided is not valid.';
  'auth/user-not-found': 'The member with the given email does not exist.';
}
