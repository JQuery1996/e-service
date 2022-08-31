import { SvgIcon, SxProps } from "@mui/material";
import { ReactNode } from "react";
import { ReactComponent as profile } from "assets/images/profile.svg";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { ReactComponent as service } from "assets/images/service.svg";
import { ReactComponent as logout } from "assets/images/logout.svg";
export interface settingNav {
    name: string;
    path: string;
    sx?: SxProps;
    icon?: ReactNode;
}
export const settings: settingNav[] = [
    {
        name: "my_account",
        path: "/profile",
        icon: <SvgIcon component={profile} inheritViewBox />,
    },
    {
        name: "uploaded_documents",
        path: "/documents",
        icon: <ArticleOutlinedIcon />,
    },
    {
        name: "my_services",
        path: "/service/requested",
        icon: <SvgIcon component={service} inheritViewBox />,
    },
    {
        name: "logout",
        path: "/",
        sx: { color: "error.dark" },
        icon: <SvgIcon component={logout} inheritViewBox />,
    },
];
