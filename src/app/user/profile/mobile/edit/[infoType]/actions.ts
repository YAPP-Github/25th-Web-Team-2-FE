'use server';

import { PATH } from '@/constants/path';
import { revalidatePath } from 'next/cache';

export async function revalidateProfilePage() {
  revalidatePath(PATH.profile);
}
