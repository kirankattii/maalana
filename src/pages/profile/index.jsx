import React, { useEffect, useState } from 'react';
import {
    Grid,
    Button,
    Avatar,
    Box,
    IconButton,
    Snackbar,
    Alert,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Pagination,
    Divider,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { PhotoCamera, AccountCircle, ShoppingCart, LocationOn, Favorite } from '@mui/icons-material';
import axios from 'axios';

import DeleteIcon from '@mui/icons-material/Delete';

import './Profile.scss';

const Profile = () => {
    const location = useLocation();
    const { id } = location.state || {};
    const ID = sessionStorage.getItem('userId');
    console.log("profile", id);
    console.log("profile1", ID);
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        gender: 'female',
        phone: '',
        email: ''
    });

    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [addresses, setAddresses] = useState({
        address: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
    });
    const [billingAddress, setBillingAddress] = useState({
        address: '',
        pincode: '',
        country: '',
        state: '',
        city: '',
        gst: ''
    });
    const [editProfile, setEditProfile] = useState(true);
    const [profileImage, setProfileImage] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
    const [activeSection, setActiveSection] = useState('myAccount');
    const [isChecked, setIsChecked] = useState(false);
    const [orders, setOrders] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [editAddress, setEditAddress] = useState(true);

    const ITEMS_PER_PAGE = 10;

    const [page, setPage] = useState(1);

 const userId = id === undefined ? ID : id;

    const fetchUserData = async () => {
        // Add logic to fetch user data
        const res = await fetch(`http://localhost:8000/api/get-single-user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        setProfile({
            ...profile,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            phone: data.user.mobileNumber,
            email: data.user.email,
            gender: data.user.gender,
            dob: data.user.dateofbirth ? data.user.dateofbirth.slice(0, 10) : ''
        });
        setProfileImage(data.user.userImage);
    };
    useEffect(() => {
        fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCheckBoxChange = (event) => {
        setIsChecked(event.target.checked);
        if (event.target.checked) {
            setBillingAddress(addresses);
        } else {
            setBillingAddress({
                address: '',
                pincode: '',
                country: '',
                state: '',
                city: '',
                gst: ''
            });
        }
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value
        });
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddresses({
            ...addresses,
            [name]: value
        });
    };


    const handleGenderChange = (gender) => {
        setProfile({
            ...profile,
            gender: gender
        });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPassword({
            ...password,
            [name]: value
        });
    };

    const handleImageChange = async (event, index) => {
        try {
            const file = event.target.files[0]

            if (file) {
                console.log('file', file);

                const compressedFile = await file

                const data = new FormData()
                data.append("file", compressedFile)
                data.append("upload_preset", "eq5btcc4")

                await axios
                    .post(
                        `https://api.cloudinary.com/v1_1/dtivafy25/image/upload`,

                        data
                    )
                    .then((response) => {
                        if (response.status === 200) {
                            const imageURL = response.data.url
                            setProfileImage(imageURL);
                        }
                    });
            }
        } catch (error) {
            console.log("image upload error", error)
        }
    }

    const saveProfile = async () => {
        if (!profile.firstName || !profile.lastName || !profile.phone || !profile.email) {
            setSnackbar({ open: true, message: 'Please fill all the required fields.', severity: 'error' });
            return;
        }
        if (userId) {
            try {
                const res = await fetch(`http://localhost:8000/api/update-user-by-id/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName: profile.firstName,
                        lastName: profile.lastName,
                        mobileNumber: profile.phone,
                        email: profile.email,
                        gender: profile.gender,
                        dateofbirth: profile.dob,
                        userImage: profileImage
                    }),
                })
                const data = await res.json();
                console.log('data', data);
                setProfile({
                    ...profile,
                    firstName: data.user.firstName,
                    lastName: data.user.lastName,
                    phone: data.user.mobileNumber,
                    email: data.user.email,
                    gender: data.user.gender
                });
                setProfileImage(data.user.userImage);
                setSnackbar({ open: true, message: 'Profile saved successfully.', severity: 'success' });
                setEditProfile(true);
            } catch (error) {
                console.error(error);
                setSnackbar({ open: true, message: 'An error occurred. Please try again later.', severity: 'error' });
                setEditProfile(false);

            } finally {
                setSnackbar({ open: true, message: 'Profile saved successfully.', severity: 'success' });
                setEditProfile(true);
            }
        }
    };

    const savePassword = () => {
        if (!password.oldPassword || !password.newPassword || !password.confirmPassword) {
            setSnackbar({ open: true, message: 'Please fill all the required fields.', severity: 'error' });
            return;
        }
        if (password.newPassword !== password.confirmPassword) {
            setSnackbar({ open: true, message: 'New passwords do not match.', severity: 'error' });
            return;
        }
        setSnackbar({ open: true, message: 'Password changed successfully.', severity: 'success' });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ open: false, message: '', severity: '', });
    };

    const handleSectionChange = async (section) => {
        setActiveSection(section);
        switch (section) {
            case 'myOrders':
                const responseMyOrders = await fetch(`http://localhost:8000/api/get-order-by-user-id/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const dataMyOrders = await responseMyOrders.json();
                setOrders(dataMyOrders.order);
                break;
            case 'myAddress':
                const responseMyAddress = await fetch(`http://localhost:8000/api/get-my-shiped-address/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const dataMyAddress = await responseMyAddress.json();
                if (dataMyAddress && dataMyAddress.shipedaddress.length > 0) {
                    setAddresses({
                        address: dataMyAddress.shipedaddress[0].address,
                        pincode: dataMyAddress.shipedaddress[0].pincode,
                        state: dataMyAddress.shipedaddress[0].state,
                        city: dataMyAddress.shipedaddress[0].city,
                        country: dataMyAddress.shipedaddress[0].country
                    });
                }
                break;
            case 'myWishlist':
                const responseMyWishlist = await fetch(`http://localhost:8000/api/get-my-wishlist-by-user-id/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const dataMyWishlist = await responseMyWishlist.json();
                setWishlist(dataMyWishlist.wishlist);
                break;
            default:
                break;
        }
    };

    const handleChange = (event, newPage) => {
        setPage(newPage);
    };

    // Calculate the current items to be displayed based on the page
    const currentOrders = orders.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    useEffect(() => {
        document.body.style.backgroundColor = '#B9D514';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    const handleEditProfile = () => {
        setEditProfile(false);
    };

    const handleEditAddress = () => {
        setEditAddress(false);
    };

    const handleAddressClick = async () => {
        if (!addresses.address || !addresses.city || !addresses.state || !addresses.pincode) {
            setSnackbar({ open: true, message: 'Please fill all the required fields.', severity: 'error' });
            return;
        };
        if (userId) {
            const response = await fetch(`http://localhost:8000/api/create-shiped-address`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    address: addresses.address,
                    city: addresses.city,
                    state: addresses.state,
                    pincode: addresses.pincode,
                    country: addresses.country
                }),
            });
            const data = await response.json();
            setAddresses({
                ...addresses,
                address: data.address,
                city: data.city,
                state: data.state,
                pincode: data.pincode,
                country: addresses.country
            })

            setSnackbar({ open: true, message: 'Address saved successfully.', severity: 'success' });
            setEditAddress(false);
        };
        setEditAddress(true);
        if (!isChecked) {
            const response = await fetch('http://localhost:8000/api/create-billing-address', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    address: billingAddress.address,
                    city: billingAddress.city,
                    state: billingAddress.state,
                    pincode: billingAddress.pincode,
                    country: billingAddress.country,
                    GSTNumber: billingAddress.gst
                }),
            });

            const data = await response.json();
            console.log('data', data);
            setBillingAddress({
                ...billingAddress,
                address: data.address,
                city: data.city,
                state: data.state,
                pincode: data.pincode,
                country: data.country,
                gst: data.GSTNumber
            })
        }
    };

    return (
        <Grid container className="profile-container" sx={{}}>
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
            <Grid item xs={12} className="profile-content">
                <Grid container spacing={5} className="profile-sections-container">
                    <Grid item xs={12} md={4} className="profile-sidebar">
                        <Button
                            variant="contained"
                            fullWidth
                            startIcon={
                                <AccountCircle  className="custom-account-circle" 
                                    sx={{
                                        color: '#B9D514 !important'
                                    }}
                                />}
                            onClick={() => handleSectionChange('myAccount')}
                            sx={{
                                backgroundColor: activeSection === 'myAccount' ? '#fff !important' : '#E7F0B8 !important',
                            }}
                        >
                            My Account
                        </Button>
                        <Button
                            variant="contained"
                            fullWidth
                            startIcon={
                                <ShoppingCart  className="custom-account-circle" 
                                    sx={{
                                        color: '#B9D514 !important'
                                    }} />}
                            onClick={() => handleSectionChange('myOrders')}
                            sx={{
                                backgroundColor: activeSection === 'myOrders' ? '#fff !important' : '#E7F0B8 !important',
                            }}
                        >
                            My Orders
                        </Button>
                        <Button
                            variant="contained"
                            fullWidth
                            startIcon={
                                <LocationOn  className="custom-account-circle" 
                                    sx={{
                                        color: '#B9D514 !important'
                                    }} />}
                            onClick={() => handleSectionChange('myAddress')}
                            sx={{
                                backgroundColor: activeSection === 'myAddress' ? '#fff !important' : '#E7F0B8 !important',
                            }}
                        >
                            My Address
                        </Button>
                        <Button
                            variant="contained"
                            fullWidth
                            startIcon={
                                <Favorite  className="custom-account-circle" 
                                    sx={{
                                        color: '#B9D514 !important'
                                    }} />}
                            onClick={() => handleSectionChange('wishlist')}
                            sx={{
                                backgroundColor: activeSection === 'wishlist' ? '#fff !important' : '#E7F0B8 !important',
                            }}
                        >
                            Wishlist
                        </Button>
                    </Grid>
                    {activeSection === 'myAccount' && (
                        <Grid item xs={12} md={4} className="profile-section">
                            <Box display="flex" justifyContent="end" alignItems="center">
                                <Button variant="outlined" className="edit-button" onClick={handleEditProfile}>Edit</Button>
                            </Box>
                            <Box display="flex" sx={{ gap: '30px' }}>
                                <Box position="relative" display="inline-block">
                                    <Avatar src={profileImage || "path_to_image.jpg"} alt={profile.firstName} className="profile-image" />
                                    <IconButton color="primary" className="upload-button" aria-label="upload picture" component="label">
                                        <input hidden accept="image/*" type="file" onChange={handleImageChange} disabled={editProfile} />
                                        <PhotoCamera sx={{ color: '#000' }} />
                                    </IconButton>
                                </Box>
                                <h5 style={{ marginTop: '35px', fontWeight: 'bold', fontSize: '20px' }}>{profile.firstName} <br /> <span style={{ fontSize: '10px' }}>change profile information</span></h5>
                            </Box>
                            <form>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={profile.firstName}
                                    onChange={handleProfileChange}
                                    required
                                    autoFocus
                                    disabled={editProfile}
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={profile.lastName}
                                    onChange={handleProfileChange}
                                    disabled={editProfile}
                                />
                                <input
                                    type="date"
                                    name="dob"
                                    placeholder="Date of Birth"
                                    value={profile.dob}
                                    onChange={handleProfileChange}
                                    disabled={editProfile}
                                />
                                <div>
                                    <label>Gender</label>
                                    <div>
                                        <Button
                                            variant={profile.gender === 'male' ? 'contained' : 'outlined'}
                                            onClick={() => handleGenderChange('male')}
                                            sx={{
                                                backgroundColor: profile.gender === 'male' ? '#B9D514' : 'transparent',
                                                border: '1px solid #B9D514',
                                                color: profile.gender === 'male' ? '#fff' : '#B9D514',
                                                boxShadow: 'none',
                                                '&:hover': {
                                                    backgroundColor: profile.gender === 'male' ? '#B9D514' : 'transparent',
                                                    color: '#000',
                                                    border: '1px solid #B9D514',
                                                    boxShadow: 'none',
                                                },
                                                width: '36%',
                                                borderRadius: '50px',
                                                transition: 'background-color 0.3s ease, color 0.3s ease',
                                            }}
                                            disabled={editProfile}
                                        >
                                            Male
                                        </Button>
                                        <Button
                                            variant={profile.gender === 'female' ? 'contained' : 'outlined'}
                                            onClick={() => handleGenderChange('female')}
                                            sx={{
                                                backgroundColor: profile.gender === 'female' ? '#B9D514' : 'transparent',
                                                border: '1px solid #B9D514',
                                                color: profile.gender === 'female' ? '#fff' : '#B9D514',
                                                boxShadow: 'none',
                                                marginLeft: '10px',
                                                '&:hover': {
                                                    backgroundColor: profile.gender === 'female' ? '#B9D514' : 'transparent',
                                                    color: '#000',
                                                    border: '1px solid #B9D514',
                                                    boxShadow: 'none',
                                                },
                                                borderRadius: '50px',
                                                width: '36%',
                                                transition: 'background-color 0.3s ease, color 0.3s ease',

                                            }}
                                            disabled={editProfile}
                                        >
                                            Female
                                        </Button>
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone No"
                                    value={profile.phone}
                                    onChange={handleProfileChange}
                                    disabled={editProfile}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={profile.email}
                                    onChange={handleProfileChange}
                                    disabled={editProfile}
                                />
                                <Button
                                    variant="contained"
                                    className='save-btn'
                                    onClick={saveProfile}
                                    disabled={editProfile}
                                    style={{ backgroundColor: editProfile ? 'gray !important' : '#B9D514 !important', color: 'white !important' }}
                                >
                                    {'Save'}
                                </Button>
                            </form>
                        </Grid>
                    )}
                    {/* {activeSection === 'myAccount' && (
                        <Grid item xs={12} md={4} className="password-section" sx={{ height: '339px !important' }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <h2>Change Password</h2>
                                <Button variant="outlined" className="edit-button">Edit</Button>
                            </Box>
                            <form>
                                <input
                                    type="password"
                                    name="oldPassword"
                                    placeholder="Old Password"
                                    value={password.oldPassword}
                                    onChange={handlePasswordChange}
                                />
                                <input
                                    type="password"
                                    name="newPassword"
                                    placeholder="New Password"
                                    value={password.newPassword}
                                    onChange={handlePasswordChange}
                                />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Re-write New Password"
                                    value={password.confirmPassword}
                                    onChange={handlePasswordChange}
                                />
                                <Button variant="contained" color="primary" className='save-btn' onClick={savePassword}>Save</Button>
                            </form>
                        </Grid>
                    )} */}
                    {activeSection === 'myOrders' && (
                        <Grid item xs={12} md={8} className="orders-section">
                            <Card sx={{ borderRadius: '45px !important' }}>
                                <CardContent>
                                    {orders.length > 0 ? (
                                        <>
                                            <TableContainer
                                                sx={{
                                                    overflowX: 'auto',
                                                    '@media (max-width: 760px)': {
                                                        display: 'block',
                                                    },
                                                }}
                                            >
                                                <Table
                                                    sx={{
                                                        '@media (max-width: 760px)': {
                                                            display: 'block',
                                                            width: '100%',
                                                        },
                                                    }}
                                                >
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell sx={{ backgroundColor: 'transparent', color: '#000', fontWeight: 'bold' }}>Product</TableCell>
                                                            <TableCell sx={{ backgroundColor: 'transparent', color: '#000', fontWeight: 'bold' }}>Date</TableCell>
                                                            <TableCell sx={{ backgroundColor: 'transparent', color: '#000', fontWeight: 'bold' }}>Status</TableCell>
                                                            <TableCell sx={{ backgroundColor: 'transparent', color: '#000', fontWeight: 'bold' }}>Price</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {currentOrders.map((order, index) => (
                                                            <TableRow
                                                                key={index}
                                                                sx={{
                                                                    '@media (max-width: 760px)': {
                                                                        display: 'block',
                                                                        marginBottom: '8px',
                                                                        borderBottom: '1px solid #ccc',
                                                                    },
                                                                }}
                                                            >
                                                                <TableCell
                                                                    sx={{
                                                                        '@media (max-width: 760px)': {
                                                                            display: 'block',
                                                                            position: 'relative',
                                                                            paddingLeft: '50%',
                                                                            borderBottom: '1px solid #eee',
                                                                            '&::before': {
                                                                                content: '"Product"',
                                                                                position: 'absolute',
                                                                                top: '6px',
                                                                                left: '6px',
                                                                                width: '45%',
                                                                                paddingRight: '10px',
                                                                                whiteSpace: 'nowrap',
                                                                                fontWeight: 'bold',
                                                                                color: 'text.primary',
                                                                            },
                                                                        },
                                                                    }}
                                                                >
                                                                    {order.product}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={{
                                                                        '@media (max-width: 760px)': {
                                                                            display: 'block',
                                                                            position: 'relative',
                                                                            paddingLeft: '50%',
                                                                            borderBottom: '1px solid #eee',
                                                                            '&::before': {
                                                                                content: '"Date"',
                                                                                position: 'absolute',
                                                                                top: '6px',
                                                                                left: '6px',
                                                                                width: '45%',
                                                                                paddingRight: '10px',
                                                                                whiteSpace: 'nowrap',
                                                                                fontWeight: 'bold',
                                                                                color: 'text.primary',
                                                                            },
                                                                        },
                                                                    }}
                                                                >
                                                                    {order.date}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={{
                                                                        color: order.status !== 'PENDING' ? 'text.primary !important' : 'red !important',
                                                                        '@media (max-width: 760px)': {
                                                                            display: 'block',
                                                                            position: 'relative',
                                                                            paddingLeft: '50%',
                                                                            borderBottom: '1px solid #eee',
                                                                            '&::before': {
                                                                                content: '"Status"',
                                                                                position: 'absolute',
                                                                                top: '6px',
                                                                                left: '6px',
                                                                                width: '45%',
                                                                                paddingRight: '10px',
                                                                                whiteSpace: 'nowrap',
                                                                                fontWeight: 'bold',
                                                                                color: 'text.primary',
                                                                            },
                                                                        },
                                                                    }}
                                                                >
                                                                    {order.status}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={{
                                                                        '@media (max-width: 760px)': {
                                                                            display: 'block',
                                                                            position: 'relative',
                                                                            paddingLeft: '50%',
                                                                            borderBottom: '1px solid #eee',
                                                                            '&::before': {
                                                                                content: '"Price"',
                                                                                position: 'absolute',
                                                                                top: '6px',
                                                                                left: '6px',
                                                                                width: '45%',
                                                                                paddingRight: '10px',
                                                                                whiteSpace: 'nowrap',
                                                                                fontWeight: 'bold',
                                                                                color: 'text.primary',
                                                                            },
                                                                        },
                                                                    }}
                                                                >
                                                                    {order.price}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            <Box mt={2} display="flex" justifyContent="center">
                                                <Pagination
                                                    count={Math.ceil(orders.length / ITEMS_PER_PAGE)}
                                                    page={page}
                                                    onChange={handleChange}
                                                />
                                            </Box>
                                        </>
                                    ) :
                                        <Box mt={2} display="flex" justifyContent="center">
                                            <p>No Orders Found</p>
                                        </Box>
                                    }
                                </CardContent>
                            </Card>
                        </Grid>
                    )}
                    {activeSection === "myAddress" && (
                        <Grid item xs={12} md={8} className="orders-section">
                            <Card sx={{ borderRadius: '10px !important' }}>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <h6 className='my-address'>My Address <br /><span style={{ fontSize: '12px' }}>Default Addresses Listed Below</span></h6>
                                        <Button variant="outlined" className="edit-button">Edit</Button>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} sx={{ padding: '10px 36px !important' }}>
                                        <h6 className='my-address'>Shipping Address:</h6>
                                        <Button variant="outlined" className="shipping-button" onClick={handleEditAddress}>Edit</Button>
                                    </Box>
                                    <form>
                                        <div>
                                            <input
                                                type="text"
                                                name="firstName"
                                                placeholder="First Name"
                                                value={profile.firstName}
                                                onChange={handleProfileChange}
                                                className='first-name-input'
                                                disabled={editAddress}
                                            />
                                            <input
                                                type="text"
                                                name="lastName"
                                                placeholder="Last Name"
                                                value={profile.lastName}
                                                onChange={handleProfileChange}
                                                className='last-name-input'
                                                disabled={editAddress}
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            name="phone"
                                            placeholder="Phone Number"
                                            value={profile.phone}
                                            onChange={handleProfileChange}
                                            disabled={editAddress}
                                        />
                                        <textarea
                                            type="text"
                                            name="address"
                                            placeholder="Address"
                                            value={addresses.address}
                                            className='address-input'
                                            disabled={editAddress}
                                            onChange={handleAddressChange}
                                        />

                                        <div>
                                            <input
                                                type="text"
                                                name="pincode"
                                                placeholder="Pincode"
                                                className='first-name-input'
                                                value={addresses.pincode}
                                                disabled={editAddress}
                                                onChange={handleAddressChange}
                                            />
                                            <input
                                                type="text"
                                                name="country"
                                                placeholder="Country"
                                                className='last-name-input'
                                                value={addresses.country}
                                                disabled={editAddress}
                                                onChange={handleAddressChange}
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                name="state"
                                                placeholder="State"
                                                className='first-name-input'
                                                value={addresses.state}
                                                disabled={editAddress}
                                                onChange={handleAddressChange}
                                            />
                                            <input
                                                type="text"
                                                name="city"
                                                placeholder="City"
                                                className='last-name-input'
                                                value={addresses.city}
                                                disabled={editAddress}
                                                onChange={handleAddressChange}
                                            />
                                        </div>
                                    </form>
                                    <Box display="flex" justifyContent="start" alignItems="center" mt={2} sx={{ padding: '10px 36px !important' }}>
                                        <h6 className='my-address'>Billing Address:
                                            <br />
                                            <input type="checkbox"
                                                style={{
                                                    margin: '9px 4px 0px 0px',
                                                    accentColor: isChecked ? '#B9D514' : 'initial',
                                                    accentBorder: `2px solid #B9D514`,
                                                    cursor: 'pointer'
                                                }}

                                                onChange={handleCheckBoxChange}
                                            />
                                            <span style={{ fontSize: '12px' }}>Use same as shipping address </span>
                                        </h6>
                                    </Box>
                                    <form>
                                        <div>
                                            <input
                                                type="text"
                                                name="firstName"
                                                placeholder="First Name"
                                                value={profile.firstName}
                                                onChange={handleProfileChange}
                                                className='first-name-input'
                                                disabled={editAddress}
                                            />
                                            <input
                                                type="text"
                                                name="lastName"
                                                placeholder="Last Name"
                                                value={profile.lastName}
                                                onChange={handleProfileChange}
                                                className='last-name-input'
                                                disabled={editAddress}
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            name="phone"
                                            placeholder="Phone Number"
                                            value={profile.phone}
                                            onChange={handleProfileChange}
                                            disabled={editAddress}
                                        />
                                        <textarea
                                            type="text"
                                            name="addess"
                                            placeholder="Address"
                                            value={billingAddress.address}
                                            onChange={(e) => setBillingAddress({ ...billingAddress, address: e.target.value })}
                                            disabled={editAddress}
                                        />

                                        <div>
                                            <input
                                                type="text"
                                                name="pincode"
                                                placeholder="Pincode"
                                                className='first-name-input'
                                                value={billingAddress.pincode}
                                                onChange={(e) => setBillingAddress({ ...billingAddress, pincode: e.target.value })}
                                                disabled={editAddress}
                                            />
                                            <input
                                                type="text"
                                                name="country"
                                                placeholder="Country"
                                                className='last-name-input'
                                                value={billingAddress.country}
                                                onChange={(e) => setBillingAddress({ ...billingAddress, country: e.target.value })}
                                                disabled={editAddress}
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                name="state"
                                                placeholder="State"
                                                className='first-name-input'
                                                value={billingAddress.state}
                                                onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })}
                                                disabled={editAddress}
                                            />
                                            <input
                                                type="text"
                                                name="city"
                                                placeholder="City"
                                                className='last-name-input'
                                                value={billingAddress.city}
                                                onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                                                disabled={editAddress}
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            name="gst"
                                            placeholder="GST Number"
                                            value={billingAddress.gst}
                                            onChange={(e) => setBillingAddress({ ...billingAddress, gst: e.target.value })}
                                            disabled={editAddress}
                                        />
                                        <Button variant="contained" className="save-btn" disabled={editAddress} onClick={handleAddressClick}>Save</Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </Grid>
                    )}
                    {activeSection === "wishlist" && (
                        <Grid item xs={12} md={8} className="orders-section">
                            <Card className="wishlist-item" sx={{ borderRadius: '10px !important', boxShadow: 'none !important' }}>
                                {wishlist.length === 0 ? (
                                    <CardContent className="empty-wishlist" sx={{ textAlign: 'center', padding: '20px' }}>
                                        <p style={{ fontWeight: '700', fontSize: '18px' }}>Your wishlist is empty.</p>
                                    </CardContent>
                                ) : (
                                    wishlist.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <CardContent className="item-details">
                                                <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="item-image"
                                                        style={{
                                                            width: '100%',
                                                            maxWidth: '144px',
                                                            borderRadius: '10px',
                                                        }}
                                                    />
                                                    <p className="item-name" style={{ fontWeight: '700' }}>{item.name}</p>
                                                    <p className="item-price">{item.price}</p>
                                                    <Button
                                                        variant="contained"
                                                        sx={{
                                                            backgroundColor: 'transparent !important',
                                                            color: '#000',
                                                            borderColor: '#B9D514',
                                                            borderRadius: '50px',
                                                        }}
                                                    >
                                                        Add to Cart
                                                    </Button>
                                                    <IconButton className="item-delete-btn">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box>
                                                {index < wishlist.length - 1 && (
                                                    <Divider
                                                        key={`divider-${index}`}
                                                        sx={{
                                                            margin: '37px 0px 0px',
                                                            borderWidth: '1px',
                                                            borderColor: '#B9D514',
                                                        }}
                                                    />
                                                )}
                                            </CardContent>
                                        </React.Fragment>
                                    ))
                                )}
                                {wishlist.length > 0 && (
                                    <Box mt={2} mb={2} display="flex" justifyContent="center">
                                        <Pagination
                                            count={Math.ceil(wishlist.length / ITEMS_PER_PAGE)}
                                            page={page}
                                            onChange={handleChange}
                                        />
                                    </Box>
                                )}
                            </Card>
                        </Grid>
                    )}

                </Grid>
            </Grid>
        </Grid>
    );
};

export default Profile;
