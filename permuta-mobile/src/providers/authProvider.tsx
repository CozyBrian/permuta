import { useAppSelector } from "@/hooks";
import { useRouter, useSegments, useRootNavigation } from "expo-router";
import React, { useEffect, useState } from "react";

function useProtectedRoute(isAuth: boolean) {
  const segments = useSegments();
  const router = useRouter();
  const [isNavigationReady, setNavigationReady] = useState(false);
  const rootNavigation = useRootNavigation();

  useEffect(() => {
    const unsubscribe = rootNavigation?.addListener("state", (event) => {
      setNavigationReady(true);
    });
    return function cleanup() {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [rootNavigation]);

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!isNavigationReady) {
      return;
    }

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !isAuth &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/");
    } else if (isAuth && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/(main)/home");
    }
  }, [segments, router, isAuth, isNavigationReady]);
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  useProtectedRoute(isAuthenticated);

  return <>{children}</>;
};

export default AuthProvider;
