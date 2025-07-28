'use server'

import { cookies } from 'next/headers';

export default async function retrieveRefreshToken(token: string) {
    const cookiesStore = await cookies();

    return cookiesStore.set('refresh_token', token);
}