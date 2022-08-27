import * as React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { SiTwitter } from 'react-icons/si';
import { Button } from '@/components/Elements';
import { Notifications } from '@/components/Notifications';
import { useAuth } from '@/features/auth';
import { Seo } from '@/features/misc';
import { queryClient } from '@/lib/react-query';
import type { WithChildren } from '@/types';

const ErrorFallback = () => {
  return (
    <div
      role="alert"
      className="w-screen h-screen flex justify-center items-center"
    >
      <Button
        variant="secondary"
        size="lg"
        onClick={() => window.location.assign(window.location.origin)}
        className="w-40"
      >
        Refresh
      </Button>
    </div>
  );
};

const AuthLoader = ({ children }: WithChildren) => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <SiTwitter size={64} className="fill-sky-500" />
      </div>
    );
  }

  return <>{children}</>;
};

type AppProviderProps = WithChildren;

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        {process.env.NODE_ENV !== 'test' && (
          <ReactQueryDevtools position="bottom-right" />
        )}
        <Seo />
        <Notifications />
        <AuthLoader>{children}</AuthLoader>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
