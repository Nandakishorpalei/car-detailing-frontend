import classNames from "classnames";
import { ChangeEvent, ReactNode, useContext, useId, useState } from "react";
import { FilterContext } from "./FilterContext";
import { Checkbox } from "../Checkbox/Checkbox";
import { Button } from "../Button/Button";
import { ArrowRight } from "../../Icons/ArrowRight";
import { Funnel } from "../../Icons/Funnel";
import DashboardContainer from "../DashboardContainer/DashboardContainer";
import { Search } from "../../Components/Search/Search";
import Dropdown from "../Dropdown/Dropdown";

const List = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-w-[220px] py-5 px-3 flex flex-col rounded-l-md bg-surface-lighter-grey gap-1 border-solid border-r border-l-0 border-b-0 border-t-0 border-purple-10">
      {children}
    </div>
  );
};

const Body = ({
  children,
  value,
  block = false,
}: {
  children: ReactNode;
  value: string;
  block?: boolean;
}) => {
  const { value: selectedListItem } = useContext(FilterContext);
  if (selectedListItem === value) {
    return (
      <div
        className={classNames("p-6 rounded-r-md overflow-auto", {
          "w-full": block,
        })}
      >
        {children}
      </div>
    );
  }
  return null;
};

const Portal = ({
  children,
  size = "regular",
}: {
  children: ReactNode;
  size?: "small" | "regular";
}) => {
  return (
    <Dropdown.Content
      onFocusOutside={(e) => e.preventDefault()}
      sideOffset={8}
      align="start"
      side="bottom"
      className={classNames(
        "flex w-[600px] rounded-md shadow-filter-shadow border border-solid !border-purple-10",
        {
          "h-[360px]": size === "small",
          "h-[440px]": size === "regular",
        }
      )}
    >
      {children}
    </Dropdown.Content>
  );
};

const Root = ({
  children,
  defaultValue,
  title = "Filters",
  capsule,
  trigger,
  onOpenChange: onOpenChangeFromProps,
  open: openFromProps,
}: {
  children: ReactNode;
  defaultValue: string;
  title?: ReactNode;
  capsule?: ReactNode;
  trigger?: ReactNode;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}) => {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(openFromProps || false);

  const onSelect = (value: string) => {
    if (value) {
      setValue(value);
    }
  };

  const onOpenChange = (open: boolean) => {
    setOpen(open);
    if (onOpenChangeFromProps) {
      onOpenChangeFromProps(open);
    }
  };

  return (
    <FilterContext.Provider
      value={{ value, onSelect, setOpen, open: openFromProps || open }}
    >
      <Dropdown.Root
        open={openFromProps || open}
        onOpenChange={onOpenChange}
        modal={false}
      >
        <div className="w-fit flex gap-2 h-full flex-wrap">
          <Dropdown.Trigger asChild>
            {trigger ? (
              trigger
            ) : (
              <div className="w-fit">
                <Button size="small" type="button">
                  <div className="flex gap-1.5 select-none">
                    <Funnel />
                    {title && <div className="text-text-60">{title}</div>}
                  </div>
                </Button>
              </div>
            )}
          </Dropdown.Trigger>
          {capsule && (
            <div className="border-0 border-l border-solid border-neutral-10 mt-1 h-6" />
          )}
          {capsule}
        </div>
        <Dropdown.Portal>{children}</Dropdown.Portal>
      </Dropdown.Root>
    </FilterContext.Provider>
  );
};

const ListItem = ({
  children,
  value,
}: {
  children: ReactNode;
  value: string;
}) => {
  const { value: selectedListItem, onSelect } = useContext(FilterContext);
  const isSelected = Boolean(selectedListItem === value);

  return (
    <Dropdown.Item
      onSelect={(e) => {
        e.preventDefault();
        onSelect(value);
      }}
      textValue=""
      className={classNames(
        "all:unset !px-4 py-2 h-[34px] items-center rounded !text-body flex justify-between hover:!bg-green transform transition-colors duration-500 ease-in-out",
        {
          "!bg-green text-text-100": isSelected,
          "text-text-60": !isSelected,
        }
      )}
    >
      <div>{children}</div>

      <div
        className={classNames(
          "transform -translate-x-4 transition-all duration-300 ease-in-out",
          { "translate-x-0": isSelected }
        )}
      >
        {isSelected && <ArrowRight color="black" stroke="1.4" />}
      </div>
    </Dropdown.Item>
  );
};

export const Filter = {
  Root: Root,
  Portal: Portal,
  List: List,
  ListItem: ListItem,
  Body: Body,
};

type Option = { label: string; value: string; disable?: boolean };

export const MultiSelectFilter = ({
  options,
  selected = [],
  onChange,
  onSearchValueChange,
  isSearchable = true,
  isSelectAll = true,
}: {
  options: Option[];
  selected?: string[];
  onChange: (newValues: string[]) => void;
  onSearchValueChange?: (searchValue: string) => void;
  isSearchable?: boolean;
  isSelectAll?: boolean;
}) => {
  const [searchValue, setSearch] = useState("");
  const infiniteScrollId = useId();
  const addOrRemoveOption = (e: ChangeEvent<HTMLInputElement>) => {
    const currentOption = options.find(({ value }) => value === e.target.name)!;

    if (e.target.checked) {
      const newSelected = new Set([...selected, currentOption.value]);
      return onChange(Array.from(newSelected));
    }

    const selectedOptionsExcludingCurrent = selected.filter(
      (v) => v !== currentOption?.value
    );

    onChange(selectedOptionsExcludingCurrent);
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (onSearchValueChange) {
      return onSearchValueChange(e.target.value);
    }

    setSearch(e.target.value);
  };

  const filterOptions = options.filter((o) =>
    searchValue
      ? o.label.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      : true
  );

  const selectAll = () => {
    if (selected.length === filterOptions.length) {
      return onChange([]);
    }

    const newSelected = filterOptions.map((o) => o.value);
    onChange(newSelected);
  };

  return (
    <DashboardContainer className="h-full gap-4">
      {isSearchable && (
        <DashboardContainer.Header>
          <Search onChange={onSearch} placeholder="Search" className="w-full" />
        </DashboardContainer.Header>
      )}
      <DashboardContainer.Content>
        <div className="h-full overflow-y-auto" id={infiniteScrollId}>
          {isSelectAll && (
            <div className="flex justify-between">
              <Checkbox
                onChange={selectAll}
                label="Select All"
                checked={options.every((o) => selected.includes(o.value))}
                name="select-all"
              />

              <Button
                customType="text"
                size="small"
                onClick={() => onChange([])}
              >
                <span className="text-text-30">Clear all</span>
              </Button>
            </div>
          )}

          {filterOptions.length === 0 ? (
            <div className="flex justify-center items-center h-40 text-text-60">
              No results found
            </div>
          ) : (
            <div className="space-y-1">
              {filterOptions.map(({ value, label, disable }) => (
                <Checkbox
                  key={value}
                  onChange={addOrRemoveOption}
                  name={value}
                  label={label}
                  checked={selected.includes(value)}
                  disabled={disable}
                />
              ))}
            </div>
          )}
        </div>
      </DashboardContainer.Content>
    </DashboardContainer>
  );
};
