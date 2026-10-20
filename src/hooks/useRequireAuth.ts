// // hooks/useRequireAuth.ts
// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import { RootState } from '@/store/store';

// export default function useRequireAuth({ redirectIfAuthenticated = false } = {}) {
//   const router = useRouter();
//   const user = useSelector((state: RootState) => state.user.user);
//   const isRehydrated = useSelector((state: RootState) => state._persist?.rehydrated); // redux-persist hydration status
//   const isAuthenticated = !!user?.id;

//   useEffect(() => {
//     if (!isRehydrated) return; // ⏳ Wait for Redux to hydrate

//     // 🔒 Redirect logic only after rehydration
//     if (isAuthenticated && redirectIfAuthenticated) {
//       router.push('/');
//     } else if (!isAuthenticated && !redirectIfAuthenticated) {
//       router.push('/signin');
//     }
//   }, [isAuthenticated, isRehydrated, redirectIfAuthenticated, router]);

//   return { isAuthenticated: isRehydrated ? isAuthenticated : undefined, user };
// }

// hooks/useRequireAuth.ts
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store';

export default function useRequireAuth({ publicOnly = false } = {}) {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);
  const isRehydrated = useSelector((state: RootState) => state._persist?.rehydrated);
  const isAuthenticated = !!user?.id;

  useEffect(() => {
    if (!isRehydrated) return;

    if (isAuthenticated && publicOnly) {
      router.replace('/');
    }

    if (!isAuthenticated && !publicOnly) {
      router.replace('/signin');
    }
  }, [isAuthenticated, isRehydrated, publicOnly, router]);

  return {
    isAuthenticated: isRehydrated ? isAuthenticated : undefined,
    user,
  };
}

