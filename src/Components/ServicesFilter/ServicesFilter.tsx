import { Filter, MultiSelectFilter } from "../../UI-Components/Filter/Filter";
import { Chip } from "../../UI-Components/Chips/Chips";

import { useGetFilterOptionsQuery } from "../../store/api/serviceDetails";

export const ServicesFilter = ({
  updateFilter,
  values,
}: {
  updateFilter: <
    S extends
      | "USERNAME"
      | "MODEL"
      | "COLOR"
      | "REGISTRATION_NUMBER"
      | "WORK_STATUS"
      | "YEAR",
  >(
    name: S,
    newValue: {
      USERNAME: string[];
      MODEL: string[];
      COLOR: string[];
      REGISTRATION_NUMBER: string[];
      WORK_STATUS: string[];
      YEAR: string[];
    }[S]
  ) => void;
  values: {
    USERNAME: string[];
    MODEL: string[];
    COLOR: string[];
    REGISTRATION_NUMBER: string[];
    WORK_STATUS: string[];
    YEAR: string[];
  };
}) => {
  const updateFilterCallback =
    (name: Parameters<typeof updateFilter>[0]) =>
    (newValues: Parameters<typeof updateFilter>[1]) => {
      updateFilter(name, newValues);
    };
  const { data } = useGetFilterOptionsQuery();

  return (
    <Filter.Root
      defaultValue="MODEL"
      title="Filters"
      capsule={
        <>
          {values?.MODEL.length > 0 && (
            <Chip
              onClose={() => updateFilter("MODEL", [])}
              isActive
              filterType="MODEL"
            >
              Model ({values.MODEL.length})
            </Chip>
          )}

          {values?.USERNAME.length > 0 && (
            <Chip
              onClose={() => updateFilter("USERNAME", [])}
              isActive
              filterType="USERNAME"
            >
              User ({values.USERNAME.length})
            </Chip>
          )}

          {values?.COLOR.length > 0 && (
            <Chip
              onClose={() => updateFilter("COLOR", [])}
              isActive
              filterType="COLOR"
            >
              Color ({values.COLOR.length})
            </Chip>
          )}

          {values?.REGISTRATION_NUMBER.length > 0 && (
            <Chip
              onClose={() => updateFilter("REGISTRATION_NUMBER", [])}
              isActive
              filterType="REGISTRATION_NUMBER"
            >
              Registration ({values.REGISTRATION_NUMBER.length})
            </Chip>
          )}

          {values?.WORK_STATUS.length > 0 && (
            <Chip
              onClose={() => updateFilter("WORK_STATUS", [])}
              isActive
              filterType="WORK_STATUS"
            >
              Status ({values.WORK_STATUS.length})
            </Chip>
          )}
          {values?.YEAR.length > 0 && (
            <Chip
              onClose={() => updateFilter("YEAR", [])}
              isActive
              filterType="YEAR"
            >
              Year ({values.YEAR.length})
            </Chip>
          )}
        </>
      }
    >
      <Filter.Portal>
        <Filter.List>
          <Filter.ListItem value="MODEL">Model</Filter.ListItem>
          <Filter.ListItem value="USERNAME">User</Filter.ListItem>
          <Filter.ListItem value="COLOR">Colour</Filter.ListItem>
          <Filter.ListItem value="REGISTRATION_NUMBER">
            Registration Number
          </Filter.ListItem>
          <Filter.ListItem value="WORK_STATUS">Status</Filter.ListItem>
          <Filter.ListItem value="YEAR">Year</Filter.ListItem>
        </Filter.List>
        <Filter.Body value="MODEL" block>
          <MultiSelectFilter
            isSearchable
            onChange={updateFilterCallback("MODEL")}
            options={
              data?.filterOptions.models.map((model) => ({
                label: model,
                value: model,
              })) || []
            }
            selected={values?.MODEL}
          />
        </Filter.Body>
        <Filter.Body value="USERNAME" block>
          <MultiSelectFilter
            isSearchable
            onChange={updateFilterCallback("USERNAME")}
            options={
              data?.filterOptions.usernames.map((user) => ({
                label: user,
                value: user,
              })) || []
            }
            selected={values?.USERNAME}
          />
        </Filter.Body>
        <Filter.Body value="COLOR" block>
          <MultiSelectFilter
            isSearchable
            onChange={updateFilterCallback("COLOR")}
            options={
              data?.filterOptions.colors.map((color) => ({
                label: color,
                value: color,
              })) || []
            }
            selected={values?.COLOR}
          />
        </Filter.Body>
        <Filter.Body value="REGISTRATION_NUMBER" block>
          <MultiSelectFilter
            isSearchable
            onChange={updateFilterCallback("REGISTRATION_NUMBER")}
            options={
              data?.filterOptions.registration_numbers.map((number) => ({
                label: number,
                value: number,
              })) || []
            }
            selected={values?.REGISTRATION_NUMBER}
          />
        </Filter.Body>
        <Filter.Body value="WORK_STATUS" block>
          <MultiSelectFilter
            isSearchable
            onChange={updateFilterCallback("WORK_STATUS")}
            options={[
              {
                label: "pending",
                value: "pending",
              },
              {
                label: "in progress",
                value: "in_progress",
              },
              {
                label: "completed",
                value: "completed",
              },
              {
                label: "rejected",
                value: "rejected",
              },
            ]}
            selected={values?.WORK_STATUS}
          />
        </Filter.Body>
        <Filter.Body value="YEAR" block>
          <MultiSelectFilter
            isSearchable
            onChange={updateFilterCallback("YEAR")}
            options={
              data?.filterOptions.years.map((year) => ({
                label: year,
                value: year.toString(),
              })) || []
            }
            selected={values?.YEAR}
          />
        </Filter.Body>
      </Filter.Portal>
    </Filter.Root>
  );
};
