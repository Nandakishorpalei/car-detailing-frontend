import { FC } from "react";
import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Button } from "../../UI-Components/Button/Button";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useRoleBasedView } from "../../Hooks/useRoleBasedView";

interface INavMenuProps {}

export const NavMenu: FC<INavMenuProps> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { isCustomer, isSeller } = useRoleBasedView();

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
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        className="mt-2"
      >
        <MenuItem onClick={() => navigateFromMenu("/files")}>Files</MenuItem>
        <MenuItem onClick={() => navigateFromMenu("/products")}>
          Products
        </MenuItem>
        {isSeller && (
          <MenuItem onClick={() => navigateFromMenu("/myproducts")}>
            My Products
          </MenuItem>
        )}
        {isSeller && (
          <MenuItem onClick={() => navigateFromMenu("/productupload")}>
            Upload Product
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};
