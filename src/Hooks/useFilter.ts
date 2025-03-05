import { useEffect, useState } from "react";
import { useQuery, useUpdateQuery } from "./UseQuery";

export const useFilters = <T extends {}>({
  initialValue,
  useQueryParams = false,
}: {
  initialValue: T;
  useQueryParams?: boolean;
}) => {
  const [value, setValue] = useState(initialValue);
  const query = useQuery();
  const { update, updateMultiple } = useUpdateQuery();

  const initialValueJSON = JSON.stringify(initialValue);

  useEffect(() => {
    if (useQueryParams) {
      updateMultiple(
        Object.entries(initialValue)
          .map(([key, value]) => ({
            query: key,
            value:
              (query.get(key) as string | number | null) ??
              (value as string | number | null),
          }))
          .filter((entry) => entry.value !== null)
      );
    }
  }, [initialValueJSON, useQueryParams]);

  const updateFilter = <S extends keyof T>(name: S, newValue: T[S]) => {
    if (useQueryParams) {
      update({ query: name as string, value: (newValue as string) || null });
    }

    setValue((value) => ({ ...value, [name]: newValue }));
  };

  const updateFilterCallback =
    (name: Parameters<typeof updateFilter>[0]) =>
    (newValues: Parameters<typeof updateFilter>[1]) => {
      updateFilter(name, newValues);
    };

  const queryStateValues = Object.keys(initialValue).reduce((acc, key) => {
    const queryValue = query.get(key as string);
    acc[key as keyof T] = (queryValue as T[keyof T]) || value[key as keyof T];
    return acc;
  }, {} as T);

  return {
    updateFilter,
    values: useQueryParams ? queryStateValues : value,
    getUpdateFilter: updateFilterCallback,
  };
};
