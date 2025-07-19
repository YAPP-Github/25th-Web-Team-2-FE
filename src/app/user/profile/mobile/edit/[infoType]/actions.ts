'use server';

import { revalidatePath } from 'next/cache';

import { PATH } from '@/constants/path';

export async function revalidateProfilePage() {
  revalidatePath(PATH.profile);
}
