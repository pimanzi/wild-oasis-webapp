'use server';
import { format } from 'date-fns';
import { auth, signIn, signOut } from '../_components/auth';
import { supabase } from './supabase';
import { revalidatePath } from 'next/cache';
import { getBookings } from './data-service';
import { redirect } from 'next/navigation';
export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');
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

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');
  const bookings = await getBookings(session.user.guestId);
  const bookingsId = bookings.map((booking) => booking.id);
  if (!bookingsId.includes(bookingId))
    throw new Error('you are not allowed to delete this booking');
  const { data, error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);

  if (error) {
    throw new Error('Booking could not be deleted');
  }
  revalidatePath('/account/reservations');
}

export async function updateBooking(formData) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');
  const bookings = await getBookings(session.user.guestId);
  const bookingsId = bookings.map((booking) => booking.id);
  if (!bookingsId.includes(Number(formData.get('bookingId'))))
    throw new Error('you are not allowed to update this booking');

  const updatedBooking = {
    numGuests: formData.get('numGuests'),
    observations: formData.get('observations'),
  };
  const { data, error } = await supabase
    .from('bookings')
    .update(updatedBooking)
    .eq('id', Number(formData.get('bookingId')))
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }

  revalidatePath('/account/reservations');
  revalidatePath(
    `/account/reservations/edit/${Number(formData.get('bookingId'))}`
  );

  redirect('/account/reservations');
}
