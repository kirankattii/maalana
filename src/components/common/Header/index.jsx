import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useMediaQuery from '@mui/material/useMediaQuery';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';

import './Header.scss';
import Logo from '../../../assets/logo/logo.svg';
import { navLinks } from '../../../constants/helper.js';

const Header = ({ productLength }) => {
    const navigate = useNavigate();
    const [activeLink, setActiveLink] = useState('/');
    const isMobile = useMediaQuery('(max-width: 899px)');
    const [drawerOpen, setDrawerOpen] = useState(false);

    const userId = sessionStorage.getItem('userId');
    console.log(userId);

    const handleLinkClick = (link) => {
        setActiveLink(link);
        if (isMobile) {
            setDrawerOpen(false);
        }
    };

    const handleLogoClick = () => {
        navigate('/');
        if (isMobile) {
            setDrawerOpen(false); 
        }
    };

    // console.log('productLength', productLength);
    return (
        <header className="header">
            <div className="logo" onClick={handleLogoClick}>
                <img src={Logo} alt="Landmark Homes" />
            </div>
            {isMobile && (
                <Stack spacing={4} direction="row" alignItems="center">
                    <Badge badgeContent={4} color="secondary">
                        <Link to="/cart" className="iconButton">
                            <ShoppingCart />
                        </Link>
                    </Badge>
                    <Badge badgeContent={4} color="secondary">
                        <Link to="/wishlist" className="iconButton">
                            <FavoriteBorderIcon />
                        </Link>
                    </Badge>
                    <MenuIcon className="menu-icon" onClick={() => setDrawerOpen(true)} />
                </Stack>
            )}
            <nav className="nav">
                <ul>
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <Link
                                to={link.link}
                                className={link.link === activeLink ? 'active' : ''}
                                onClick={() => handleLinkClick(link.link)}
                            >
                                {link.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            {!isMobile && (

                <div className="icons">
                    <Stack spacing={4} direction="row">
                        <Badge badgeContent={4} color="secondary">
                            <Link to="/cart" className="iconButton">
                                <ShoppingCart />
                            </Link>
                        </Badge>
                        <Badge badgeContent={4} color="secondary">
                            <Link to="/wishlist" className="iconButton">
                                <FavoriteBorderIcon />
                            </Link>
                        </Badge>
                        <Link to={`/profile/${userId}`} className="iconButton">
                            <AccountCircle />
                        </Link>
                    </Stack>
                </div>
            )}
            {isMobile && (
                <>
                    <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                        <div className="drawer">
                            <List>
                                {navLinks.map((link) => (
                                    <ListItem
                                        key={link.id}
                                        button
                                        component={Link}
                                        to={link.link}
                                        selected={link.link === activeLink}
                                        onClick={() => handleLinkClick(link.link)}
                                    >
                                        <ListItemText primary={link.title} />
                                    </ListItem>
                                ))}
                                <ListItem button component={Link} to={`/profile/${userId}`}>
                                    <ListItemIcon>
                                        <AccountCircle />
                                    </ListItemIcon>
                                </ListItem>
                            </List>
                        </div>
                    </Drawer>
                </>
            )}
        </header>
    );
};

export default Header;
