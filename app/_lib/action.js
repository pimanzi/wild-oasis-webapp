'use server';
import { signIn } from '../_components/auth';
export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export default signInAction;
