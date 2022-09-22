import {
    Avatar,
    ListItemIcon,
    Menu,
    MenuItem,
    Stack,
    Typography,
    Link,
    Paper,
} from "@mui/material";
import { FC } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { INavSettings, settings } from "constants/layout";
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
                        src={require("assets/images/notification.png")}
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
                        {authenticatedUser?.username ?? t("guest")}
                    </Typography>
                </Stack>
                <ExpandMoreIcon
                    sx={{ display: { xs: "none", md: "inherit" } }}
                    color="primary"
                />
            </Stack>

            <Menu
                sx={{ mt: 5 }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                dir="rtl"
                open={Boolean(anchorElUser)}
                onClose={handleCloseMenu}
                PaperProps={{
                    elevation: 10,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: { xs: "5%", md: "50%" },
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "top" }}
            >
                {settings(Boolean(authenticatedUser)).map(
                    ({ name, path, sx, icon }: INavSettings) => (
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
                        >
                            <ListItemIcon>{icon}</ListItemIcon>
                            <Typography textAlign="center" sx={sx}>
                                {t(name)}
                            </Typography>
                        </MenuItem>
                    ),
                )}
            </Menu>
        </div>
    );
};
