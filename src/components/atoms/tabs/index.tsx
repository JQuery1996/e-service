import React, { useState } from "react";
import { Box, Tabs as MaterialUiTabs, Tab } from "@mui/material";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

interface ITabs {
    listOfTabs: {
        label: string;
        element: React.ReactNode;
        icon?:
            | string
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | undefined;
    }[];
}

export function Tabs({ listOfTabs }: ITabs) {
    const [currentTab, setCurrentTab] = useState<number>(0);
    function handleTabChange(event: React.SyntheticEvent, selectedTab: number) {
        setCurrentTab(selectedTab);
    }
    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <MaterialUiTabs
                    value={currentTab}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    {listOfTabs.map(({ label, element, icon }, index) => (
                        <Tab
                            icon={icon}
                            key={index}
                            label={label}
                            sx={{ fontWeight: "bold" }}
                            {...a11yProps}
                        />
                    ))}
                </MaterialUiTabs>
            </Box>
            {listOfTabs.map((tab, index) => (
                <TabPanel key={index} value={currentTab} index={index}>
                    {tab.element}
                </TabPanel>
            ))}
        </Box>
    );
}
