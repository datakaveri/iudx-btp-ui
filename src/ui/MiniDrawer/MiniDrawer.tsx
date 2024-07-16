"use client";

import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import iudx_logo from "./iudx-logo.png";
import iitk_logo from "./iitk.png";
import iisc_logo from "./iisc_logo.png";

import { ReactNode, Suspense, useState } from "react";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import Link from "next/link";
import { Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LogoutButton from "@/ui/Authentication/LogoutButton";
import LoginButton from "@/ui/Authentication/LoginButton";
import { useUser } from "@auth0/nextjs-auth0/client";
import { usePathname } from "next/navigation";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import KeycloakComponent from "../keycloak/KeycloakComponent";

const drawerLinks = [
	{ path: "observe", name: "Observe" },
	{
		path: "forecast",
		name: "Forecast / Estimation",
	},
	{
		path: "scenario_analysis",
		name: "Scenario Analysis",
	},
];

const drawerIcons = [
	<RemoveRedEyeIcon key={0} />,
	<SsidChartIcon key={1} />,
	<AnalyticsIcon key={2} />,
];

const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

interface Props {
	children: ReactNode;
}

export default function MiniDrawer({ children }: Props) {
	const theme = useTheme();
	const [open, setOpen] = useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

	const pathname = usePathname();

	return (
		<>
			<CssBaseline />
			<AppBar
				position="absolute"
				style={{
					marginBottom: "30px",
				}}
				open={open}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: 5,
							...(open && { display: "none" }),
						}}
					>
						<MenuIcon />
					</IconButton>

					<div
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
							width: "100%",
							alignItems: "center",
						}}
					>
						<div>
							<Link href={`/home`}>
								<Image
									style={{
										marginRight: "30px",
										marginTop: "5px",
										marginBottom: "5px",
									}}
									src={iudx_logo}
									alt="iudx-logo"
									width={100}
								/>
							</Link>
							<Link href={`/home`}>
								<Image
									style={{
										marginRight: "30px",
										marginTop: "5px",
										marginBottom: "5px",
									}}
									src={iisc_logo}
									alt="iisc-logo"
									width={50}
								/>
							</Link>
							<Link href={`/home`}>
								<Image
									style={{
										marginTop: "5px",
										marginBottom: "5px",
										marginRight: "30px",
									}}
									src={iitk_logo}
									alt="iitk-logo"
									width={50}
								/>
							</Link>
						</div>
						<Tooltip title="Profile">
							<IconButton
								color="inherit"
								onClick={handleOpenUserMenu}
								sx={{ p: 2 }}
							>
								<PermIdentityOutlinedIcon />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{children}
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={open}>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "rtl" ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{drawerLinks.map((link, index) => (
						<Link
							style={{
								textDecoration: "none",
								color: "black",
							}}
							key={index}
							href={`/home/${link.path}`}
						>
							<ListItem
								key={link}
								disablePadding
								sx={{ display: "block" }}
							>
								<ListItemButton
									selected={pathname.includes(
										`/home/${link.path}`
									)}
									sx={{
										minHeight: 48,
										justifyContent: open
											? "initial"
											: "center",
										px: 2.5,
									}}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : "auto",
											justifyContent: "center",
										}}
									>
										{drawerIcons[index]}
									</ListItemIcon>
									<ListItemText
										primary={link.name}
										sx={{ opacity: open ? 1 : 0 }}
									/>
								</ListItemButton>
							</ListItem>
						</Link>
					))}
				</List>
			</Drawer>
			<DrawerHeader />
		</>
	);
}
