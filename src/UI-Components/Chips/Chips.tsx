import classNames from "classnames";
import { Cross } from "../../Icons/Cross";
import { HTMLMotionProps, motion } from "framer-motion";
import { MouseEvent, ReactNode, useContext, useState } from "react";
import { Button } from "../Button/Button";
import { FilterContext } from "../Filter/FilterContext";

type ChipProps = {
  children: ReactNode;
  icon?: ReactNode;
  isActive?: boolean;
  isRemovable?: boolean;
  isFixedFilter?: boolean;
  size?: "regular" | "small";
  onClose?: () => void;
  onFixedFilterClick?: () => void;
  filterType?: string;
} & HTMLMotionProps<"button">;

export const Chip = ({
  children,
  isActive = false,
  size = "regular",
  isRemovable = true,
  isFixedFilter = false,
  icon,
  onClose,
  onFixedFilterClick,
  filterType,
  ...props
}: ChipProps) => {
  const [hover, setHover] = useState(false);
  const { setOpen, onSelect } = useContext(FilterContext);

  const onRemove = (e?: MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    onClose?.();
    setHover(false);
    setOpen(false);
  };

  const handleChipClick = () => {
    if (!filterType) {
      onRemove();
    }

    if (isActive && filterType) {
      onSelect?.(filterType);
      setOpen?.((open) => !open);
    }

    if (isFixedFilter && !isActive) {
      onFixedFilterClick?.();
    }
  };

  return (
    <motion.button
      layout
      key="chip"
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => !filterType && setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleChipClick}
      {...props}
      className={classNames(
        "all:unset flex gap-1 items-center text-body-sm text-text-60 border border-solid border-neutral-0 w-max hover:border-purple-20 hover:bg-purple-0 select-none rounded-3xl",
        {
          "h-6": size === "small",
          "h-8": size === "regular",
          "!border-purple-40 !bg-purple-0": isActive,
          "!border-surface-transparent !bg-surface-grey":
            isFixedFilter && !hover && !isActive,
          "!bg-red-10 !border-red-30": isActive && hover,
          "pl-3 pr-1.5": isActive && isRemovable,
          "px-3": !Boolean(isActive && isRemovable),
        }
      )}
    >
      {icon}
      {children}
      {isActive && isRemovable && (
        <Button
          onMouseEnter={() => filterType && setHover(true)}
          onMouseLeave={() => filterType && setHover(false)}
          onClick={onRemove}
          customType="transparent"
          size="small"
        >
          <Cross size="12" color="currentColor" />
        </Button>
      )}
    </motion.button>
  );
};
