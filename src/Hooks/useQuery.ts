import React, { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import { parse } from "qs";

export const useQuery = (): URLSearchParams => {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

interface UpdateQueryParams {
  query: string;
  value: string | number | null;
}

type UpdateMultipleQueryParams = UpdateQueryParams[];

export const useUpdateQuery = () => {
  const { search } = useLocation();
  const initialQueryState = parse(search, {
    ignoreQueryPrefix: true,
  }) as Record<string, string | number | null>;

  const [queryState, setQueryState] =
    useState<Record<string, string | number | null>>(initialQueryState);

  return {
    update: useCallback(({ query, value }: UpdateQueryParams) => {
      setQueryState((prev) => ({
        ...prev,
        [query]: value,
      }));
    }, []),

    updateMultiple: useCallback((queries: UpdateMultipleQueryParams) => {
      setQueryState((prev) => {
        const newQueryState = { ...prev };
        queries.forEach(({ query, value }: UpdateQueryParams) => {
          newQueryState[query] = value;
        });
        return newQueryState;
      });
    }, []),

    queryState,
  };
};
