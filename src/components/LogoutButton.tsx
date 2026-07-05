'use client';

import { useRouter } from 'next/navigation';
import { logout } from '@/app/actions/auth';

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push('/login');
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors"
    >
      Logout
    </button>
  );
}
