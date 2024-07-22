import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    // Avatar,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import CategoryIcon from '@mui/icons-material/Category';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// custom icon
import ProductIcon from '../ProductIcon/index.jsx';

import './AdminHeader.scss';

const AdminHeader = () => {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon /> },
        { text: 'Add Products', icon: <AddIcon /> },
        { text: 'Add New Category', icon: <CategoryIcon /> },
        { text: 'Products', icon: <ProductIcon /> },
    ];

    const accountItems = [
        // { text: 'Profile', icon: <AccountCircleIcon /> },
        { text: 'Logout', icon: <ExitToAppIcon /> },
    ]

    const handleNavigation = (index) => {
        console.log(index);
        if (index === 0) {
            navigate('/admin/dashboard');
        } else if (index === 1) {
            navigate('/admin/add-product');
        } else if (index === 2) {
            navigate('/admin/add-category');
        } else if (index === 3) {
            navigate('/admin/products');
        }
    };

    return (
        <>
            <AppBar position="static" className="admin-header">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className="title">
                        Admin Panel
                    </Typography>
                    {/* <div>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <Avatar alt="Admin User" src="/static/images/avatar/1.jpg" />
                        </IconButton>
                    </div> */}
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <div
                    className="drawer-container"
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <div className="drawer-header">
                        <IconButton onClick={toggleDrawer(false)} className="close-icon">
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {menuItems.map((item, index) => (
                            <ListItem button key={index} onClick={() => handleNavigation(index)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {accountItems.map((item, index) => (
                            <ListItem button key={index}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </>
    );
};

export default AdminHeader;
