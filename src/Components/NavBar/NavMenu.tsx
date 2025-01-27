import { FC } from "react";
import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Button } from "../../UI-Components/Button/Button";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useRoleBasedView } from "../../Hooks/useRoleBasedView";
import useAuth from "../../Hooks/useAuth";
import { ConditionalLink } from "../../UI-Components/ConditionalLink/ConditionalLink";

type NavMenuProps = {};

export const NavMenu = ({}: NavMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateFromMenu = (path: string) => {
    handleClose();
    navigate(path);
  };

  return (
    <div className="flex gap-6 sm:gap-3 items-center">
      <ConditionalLink condition redirect="/services">
        <Button customType="transparent">
          <span className="text-surface-navbarText">Services</span>
        </Button>
      </ConditionalLink>
      <ConditionalLink condition redirect="/about">
        <Button customType="transparent">
          <span className="text-surface-navbarText">About</span>
        </Button>
      </ConditionalLink>
      <ConditionalLink condition redirect="/contact">
      <Button customType="transparent">
        <span className="text-surface-navbarText">Contact</span>
      </Button>
      </ConditionalLink>
      
      <Button customType="primary" size="small" onClick={logout}>
        Log Out
      </Button>
    </div>
  );
};
