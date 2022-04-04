import { LoginErrors } from '../../types';

const loginErrors: LoginErrors = {
  'auth/missing-email': 'Missing email.',
  'auth/wrong-password': 'The password provided is not valid.',
  'auth/user-not-found': 'The member with the given email does not exist.',
};
export default loginErrors;
