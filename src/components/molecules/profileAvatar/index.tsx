import {
    Avatar,
    ListItemIcon,
    Menu,
    MenuItem,
    Stack,
    Typography,
    Link,
} from "@mui/material";
import { FC } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { settingNav, settings } from "constants/layout";
import useMenuToggle from "utils/hooks/useMenuToggle";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import "../../../assets/css/main.css";
import { useAuth } from "utils/hooks/useAuth";
export interface ProfileAvatarProps {}

export const ProfileAvatar: FC<ProfileAvatarProps> = () => {
    const { authenticatedUser, logout } = useAuth();
    //Hook for toggle menu
    const {
        anchorEl: anchorElUser,
        handleOpenMenu,
        handleCloseMenu,
    } = useMenuToggle();
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="profile-icons-container">
            <Stack
                onClick={handleOpenMenu}
                sx={{ cursor: "pointer" }}
                alignItems={"center"}
                direction="row"
                spacing={1}
            >
                <Link href="#" className="notification">
                    <img
                        src={require("../../../assets/images/notification.png")}
                        alt="notification"
                        style={{ marginTop: 6 }}
                    ></img>
                </Link>
                <Avatar
                    alt="Remy Sharp"
                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=25"
                />
                <Stack
                    sx={{ display: { xs: "none", md: "inherit" } }}
                    alignItems={"baseline"}
                    direction="row"
                    spacing={0}
                >
                    <Typography color={"GrayText"}>{t("welcome")}. </Typography>
                    <Typography color="primary">
                        {authenticatedUser!.username}
                    </Typography>
                </Stack>
                <ExpandMoreIcon
                    sx={{ display: { xs: "none", md: "inherit" } }}
                    color="primary"
                />
            </Stack>

            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                dir="rtl"
                // keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseMenu}
            >
                {settings.map(({ name, path, sx, icon }: settingNav) => (
                    <MenuItem
                        key={name}
                        onClick={
                            name === "logout"
                                ? logout
                                : () => {
                                      navigate(path);
                                      handleCloseMenu();
                                  }
                        }
                        sx={sx}
                    >
                        <ListItemIcon>{icon}</ListItemIcon>
                        <Typography textAlign="center">{t(name)}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};
