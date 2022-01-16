import { useEffect } from "react";
import * as Apollo from '@apollo/client';

type SubscriptionProps<TData, TVariables> = {
  subscriptionHook: (
    options?: Apollo.SubscriptionHookOptions<TData, TVariables>
  ) => {
    data?: TData
  },
  key: keyof TData,
  onChange: (response: TData) => void
};

export const useSubscription = <T, R>({
  subscriptionHook,
  key,
  onChange
}: SubscriptionProps<T, R>) => {
  const { data } = subscriptionHook();  
  useEffect(() => {
    if (data?.[key]) {
      onChange(data);
    }
  }, [data?.[key]]);
};
