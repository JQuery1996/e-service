import { useState, MouseEvent } from "react";

function useMenuToggle() {
  const [anchorEl, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElUser(null);
  };
  return { anchorEl, handleOpenMenu, handleCloseMenu };
}

export default useMenuToggle;
