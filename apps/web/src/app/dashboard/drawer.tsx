import {
    Drawer,
    Divider,
    List,
    ListItemIcon,
    ListItemText,
    IconButton,
    Box,
    Typography,
    ListItemButton,
} from '@mui/material';
import {
    Event,
    AttachMoney,
    BarChart,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { styled } from '@mui/material/styles';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    minHeight: 56,
    justifyContent: 'space-between',
    backgroundColor: '#4d4d74',
    color: '#fff',
}));

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-selected': {
        backgroundColor: theme.palette.action.selected,
    },
}));

interface DrawerComponentProps {
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
    handleDrawerClose: () => void;
    open: boolean;
    theme: any;
    drawerWidth: number;
    setSelectedMenu: (menu: string) => void;
}

const DrawerComponent = ({
    mobileOpen,
    handleDrawerToggle,
    handleDrawerClose,
    open,
    theme,
    drawerWidth,
    setSelectedMenu,
}: DrawerComponentProps) => {
    return (
        <>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        backgroundColor: '#4d4d74',
                        color: '#fff',
                    },
                }}
            >
                {drawerContent(handleDrawerClose, theme, setSelectedMenu)}
            </Drawer>
            <Drawer
                variant="persistent"
                open={open}
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        backgroundColor: '#4d4d74',
                        color: '#fff',
                    },
                }}
            >
                {drawerContent(handleDrawerClose, theme, setSelectedMenu)}
            </Drawer>
        </>
    );
};

const drawerContent = (
    handleDrawerClose: () => void,
    theme: any,
    setSelectedMenu: (menu: string) => void,
) => (
    <Box>
        <DrawerHeader>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Link href="/" passHref>
                    <img
                        src="/appLogo.png"
                        alt="Logo"
                        style={{
                            height: '32px',
                            marginRight: '8px',
                            marginLeft: '7px',
                            filter: 'invert(1)',
                        }}
                    />
                </Link>
                <Typography variant="h6" component="div">
                    Eventbriter
                </Typography>
            </Box>
            <IconButton onClick={handleDrawerClose} sx={{ color: 'inherit' }}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
        </DrawerHeader>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
        <List sx={{ mt: 2.5 }}>
            <CustomListItemButton onClick={() => setSelectedMenu('Statistics')}>
                <ListItemIcon sx={{ color: 'inherit' }}>
                    <BarChart />
                </ListItemIcon>
                <ListItemText primary="Statistics" />
            </CustomListItemButton>
            <CustomListItemButton onClick={() => setSelectedMenu('Events')}>
                <ListItemIcon sx={{ color: 'inherit' }}>
                    <Event />
                </ListItemIcon>
                <ListItemText primary="Events" />
            </CustomListItemButton>
            <CustomListItemButton onClick={() => setSelectedMenu('Transactions')}>
                <ListItemIcon sx={{ color: 'inherit' }}>
                    <AttachMoney />
                </ListItemIcon>
                <ListItemText primary="Transactions" />
            </CustomListItemButton>
        </List>
        <Box
            sx={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                right: 16,
                textAlign: 'center',
            }}
        >
            <Typography variant="body2">
                Mini Project
            </Typography>
        </Box>
    </Box>
);

export default DrawerComponent;