import { useRouter, useSegments } from "expo-router";
import React from "react";

const user = false;

function useProtectedRoute() {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      // router.replace("/");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      // router.replace("/(main)/home");
    }
  }, [segments, router]);
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useProtectedRoute();

  return <>{children}</>;
};

export default AuthProvider;
