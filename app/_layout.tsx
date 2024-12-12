import { useRouter } from 'expo-router';
import { Stack } from 'expo-router/stack';
import { useEffect } from 'react';

export default function Layout() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/tabs');
  }, [router]);

  return (
    <Stack screenOptions={{
        headerShown: false,
    }}>
    </Stack>
  );
}
