import { SvgIcon, SxProps } from "@mui/material";
import { ReactNode } from "react";
import { ReactComponent as service } from "assets/images/service.svg";

import {
    Login as LoginIcon,
    Logout as LogoutIcon,
    ManageAccounts as ManageAccoutIcon,
    Description as DescriptionIcon,
    MiscellaneousServices as MiscellaneousServicesIcon,
} from "@mui/icons-material";
export interface INavSettings {
    name: string;
    path: string;
    sx?: SxProps;
    icon?: ReactNode;
}

const COLOR = "primary";

export const settings = (isAuthenticated: boolean): INavSettings[] => {
    const items: INavSettings[] = [
        {
            name: "my_account",
            path: "/profile",
            icon: <ManageAccoutIcon color={COLOR} />,
        },
        {
            name: "uploaded_documents",
            path: "/documents",
            icon: <DescriptionIcon color={COLOR} />,
        },
        {
            name: "my_services",
            path: "/service/requested",
            icon: <MiscellaneousServicesIcon color={COLOR} />,
        },
    ];

    if (isAuthenticated) {
        items.push({
            name: "logout",
            path: "/auth/logout",
            sx: { color: "error.main" },
            icon: <LoginIcon color={COLOR} />,
        });
    } else {
        items.push({
            name: "login",
            path: "/auth/login",
            sx: { color: "primary.main", fontWeight: 600 },
            icon: <LogoutIcon color={COLOR} />,
        });
    }

    return items;
};
