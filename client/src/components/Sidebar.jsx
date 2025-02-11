import React from "react";
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    PieChartOutlined,
    Note,
    Category,
    SettingsAccessibility,
    Settings,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "@assets/profile.jpg";

const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />,
        roles: ["admin"],
    },
    {
        text: "Notes",
        icon: <Note />,
        roles: ["admin", "user"],
    },
    {
        text: "Category",
        icon: <Category />,
        roles: ["admin"],
    },
    {
        text: "NoteConfig",
        icon: <Settings />,
        roles: ["admin"],
    },
    {
        text: "Client Facing",
        icon: null,
        roles: ["admin"],
    },
    {
        text: "Products",
        icon: <ShoppingCartOutlined />,
        roles: ["admin"],
    },
    // {
    //   text: "Customers",
    //   icon: <Groups2Outlined />,
    //   roles: ["admin"],
    // },
    {
        text: "Transactions",
        icon: <ReceiptLongOutlined />,
        roles: ["admin"],
    },
    {
        text: "Geography",
        icon: <PublicOutlined />,
        roles: ["admin"],
    },
    {
        text: "Sales",
        icon: null,
        roles: ["admin"],
    },
    {
        text: "Overview",
        icon: <PointOfSaleOutlined />,
        roles: ["admin"],
    },
    {
        text: "Daily",
        icon: <TodayOutlined />,
        roles: ["admin"],
    },
    {
        text: "Monthly",
        icon: <CalendarMonthOutlined />,
        roles: ["admin"],
    },
    {
        text: "Breakdown",
        icon: <PieChartOutlined />,
        roles: ["admin"],
    },
    {
        text: "Management",
        icon: null,
        roles: ["admin"],
    },
    // {
    //   text: "Admin",
    //   icon: <AdminPanelSettingsOutlined />,
    //   roles: ["admin"],
    // },
    // {
    //   text: "Performance",
    //   icon: <TrendingUpOutlined />,
    //   roles: ["admin"],
    // },
];

const Sidebar = ({
    user,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
}) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSixing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth,
                        },
                    }}
                >
                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box display="flex" alignItems="center" gap="0.5rem">
                                    <Typography variant="h4" fontWeight="bold">
                                        BerryBouquets
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {navItems.map(({ text, icon, roles }) => {
                                if (user && !roles.includes(user.role)) {
                                    return;
                                }
                                if (!icon) {
                                    return (
                                        <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                                            {text}
                                        </Typography>
                                    );
                                }
                                const lcText = text.toLowerCase();

                                return (
                                    <ListItem
                                        key={text}
                                        disablePadding
                                        onClick={() => {
                                            navigate(`/${lcText}`);
                                            setActive(lcText);
                                        }}
                                    >
                                        <ListItemButton
                                            sx={{
                                                backgroundColor:
                                                    active === lcText
                                                        ? theme.palette.secondary[300]
                                                        : "transparent",
                                                color:
                                                    active === lcText
                                                        ? theme.palette.primary[600]
                                                        : theme.palette.secondary[100],
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    ml: "2rem",
                                                    color:
                                                        active === lcText
                                                            ? theme.palette.primary[600]
                                                            : theme.palette.secondary[200],
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === lcText && (
                                                <ChevronRightOutlined sx={{ ml: "auto" }} />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>

                    <Box position="absolute" bottom="2rem">
                        <Divider />
                        <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                            <Box
                                component="img"
                                alt="profile"
                                src={profileImage}
                                height="40px"
                                width="40px"
                                borderRadius="50%"
                                sx={{ objectFit: "cover" }}
                            />
                            <Box textAlign="left">
                                <Typography
                                    fontWeight="bold"
                                    fontSize="0.9rem"
                                    sx={{ color: theme.palette.secondary[100] }}
                                >
                                    {user.name}
                                </Typography>
                                <Typography
                                    fontSize="0.8rem"
                                    sx={{ color: theme.palette.secondary[200] }}
                                >
                                    Logged in as {user.role === "admin" ? "Admin" : "Note Taker"}
                                </Typography>
                            </Box>
                            <SettingsOutlined
                                sx={{
                                    color: theme.palette.secondary[300],
                                    fontSize: "25px ",
                                }}
                            />
                        </FlexBetween>
                    </Box>
                </Drawer>
            )}
        </Box>
    );
};

export default Sidebar;
