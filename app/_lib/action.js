'use server';
import { format } from 'date-fns';
import { auth, signIn, signOut } from '../_components/auth';
import { supabase } from './supabase';
import { revalidatePath } from 'next/cache';
export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}

export async function updateGuest(formData) {
  const session = await auth();
  const nationalID = formData.get('nationalID');
  const [nationality, countryFlag] = formData.get('nationality').split('%');

  if (!/^[a-zA-Z0-9]{6,20}$/.test(nationalID))
    throw new Error('Please provide a valid national ID');

  const updateData = {
    nationality,
    countryFlag,
    nationalID,
  };
  const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId);
  if (error) {
    throw new Error('Guest could not be updated');
  }

  revalidatePath('/account/profile');
}
