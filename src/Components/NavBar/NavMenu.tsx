import { FC, useState } from "react";
import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Button } from "../../UI-Components/Button/Button";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";
import { useRoleBasedView } from "../../Hooks/useRoleBasedView";
import useAuth from "../../Hooks/useAuth";
import { ConditionalLink } from "../../UI-Components/ConditionalLink/ConditionalLink";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { UserDetails } from "../UserDetails/UserDetails";

type NavMenuProps = {};

export const NavMenu = ({}: NavMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [showSigninModal, setShowSigninModal] = useState(false);
  const location = useLocation();
  const isExplore = location.pathname === "/explore";

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
      <ConditionalLink redirect="/explore">
        <Button customType="transparent">
          <span className="text-surface-navbarText">Explore</span>
        </Button>
      </ConditionalLink>
      <ConditionalLink redirect="/myservices">
        <Button customType="transparent">
          <span className="text-surface-navbarText">My services</span>
        </Button>
      </ConditionalLink>
      <ConditionalLink redirect="/contact">
        <Button customType="transparent">
          <span className="text-surface-navbarText">Contact</span>
        </Button>
      </ConditionalLink>

      {isAuthenticated && (
        <Button customType="primary" size="small" onClick={logout}>
          Log Out
        </Button>
      )}
      {!isAuthenticated && !isExplore && (
        <Button
          customType="primary"
          size="small"
          onClick={() => setShowSigninModal(true)}
        >
          Sign in
        </Button>
      )}
      <UserDetails open={showSigninModal} setOpen={setShowSigninModal} />
    </div>
  );
};
