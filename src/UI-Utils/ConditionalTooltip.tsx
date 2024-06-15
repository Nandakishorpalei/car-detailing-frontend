import React from "react";
import {ReactNode} from "react";
import {Tooltip} from "react-tooltip";

const ConditionalToolTip = ({
  condition,
  children,
}: {
  condition: any;
  children: ReactNode;
}) => {
  const ToolTipElement = condition ? Tooltip : React.Fragment;
  const props = condition ? {text: condition} : {};

  return <ToolTipElement {...props}>{children}</ToolTipElement>;
};

export default ConditionalToolTip;
