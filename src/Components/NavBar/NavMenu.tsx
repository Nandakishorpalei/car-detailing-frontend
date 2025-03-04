import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { RootState } from "../../store/store";
import { Button } from "../../UI-Components/Button/Button";
import { ConditionalLink } from "../../UI-Components/ConditionalLink/ConditionalLink";
import { UserDetails } from "../UserDetails/UserDetails";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { AddCustomer } from "../AddCustomer/AddCustomer";
import { AddService } from "../AddService/AddService";

export const NavMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { logout } = useAuth();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const [showSigninModal, setShowSigninModal] = useState(false);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [showAddService, setShowAddService] = useState(false);
  const location = useLocation();
  const isExplore = location.pathname === "/explore";
  const isAdmin = user?.role === "admin";

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const openAddCustomer = () => {
    setShowAddCustomer(true);
    handleMenuClose();
  };

  return (
    <div className="flex gap-2 items-center">
      {isAuthenticated && (
        <Button size="small" onClick={() => setShowAddService(true)}>
          <div className="text-text-60">Add a Service</div>
        </Button>
      )}
      <IconButton
        onClick={handleMenuOpen}
        className="all:unset p-[3px] border border-solid border-neutral-10 hover:bg-surface-lighter-grey text-neutral bg-white disabled:text-neutral-20  disabled:bg-white rounded box-border drop-shadow-button transition-all"
      >
        <MenuIcon className="text-surface-navbarText" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            marginTop: "8px",
            width: "200px",
          },
        }}
      >
        <MenuItem
          onClick={handleMenuClose}
          component={Link}
          to="/explore"
          className="text-text-100"
        >
          Explore
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose}
          component={Link}
          to="/myservices"
          className="text-text-100"
        >
          {isAdmin ? "All Services" : "My Services"}
        </MenuItem>
        {!isAdmin && (
          <MenuItem
            onClick={handleMenuClose}
            component={Link}
            to="/contact"
            className="text-text-100"
          >
            Contact
          </MenuItem>
        )}
        {isAdmin && (
          <MenuItem onClick={openAddCustomer} className="text-text-100">
            Add Customer
          </MenuItem>
        )}
        {isAuthenticated ? (
          <MenuItem onClick={logout} className="text-text-100">
            Log Out
          </MenuItem>
        ) : (
          !isExplore && (
            <MenuItem
              onClick={() => setShowSigninModal(true)}
              className="text-text-100"
            >
              Sign in
            </MenuItem>
          )
        )}
      </Menu>
      <AddService open={showAddService} setOpen={setShowAddService} />
      <AddCustomer open={showAddCustomer} setOpen={setShowAddCustomer} />
      <UserDetails open={showSigninModal} setOpen={setShowSigninModal} />
    </div>
  );
};
