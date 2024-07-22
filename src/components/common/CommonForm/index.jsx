import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, Box, Typography, Snackbar, Alert } from '@mui/material';

import styles from './CommonForm.module.scss';

import { validateForm } from '../../../utils/validation.js';

const CommonForm = ({ title = "" }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        email: '',
        phoneNumber: '',
        password: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        document.body.style.backgroundColor = '#B9D514';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        setErrors({});
        setSnackbarMessage('');
        setSnackbarSeverity('success');
        const validationErrors = validateForm(formData, title);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setLoading(false);
            return;
        }
        try {
            if (title === "Sign Up") {
                const response =  await fetch('http://localhost:8000/api/register-user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        mobileNumber: formData.phoneNumber,
                        password: formData.password,
                    }),
                })
                const responseData = await response.json();
                console.log('Response data:', responseData.user._id);
                sessionStorage.setItem('userId', responseData.user._id);
                if(responseData.success) {
                    setSnackbarSeverity('success');
                    setSnackbarMessage('User registered successfully. Please check your email for verification.');
                    navigate(`/profile/${responseData.user._id}`, { state: { id: responseData.user._id } });
                } else {
                    setSnackbarSeverity('error');
                    setSnackbarMessage('An error occurred. Please try again later.');
                }
            }
        } catch (error) {
            console.log('Error:', error);
            console.error(error);
            setSnackbarSeverity('error');
            setSnackbarMessage('An error occurred. Please try again later.');
        } finally {
            setSnackbarOpen(true);
            setLoading(false);
            setFormData({
                firstName: '',
                lastName: '',
                companyName: '',
                email: '',
                phoneNumber: '',
                password: '',
                message: '',
            });
            setErrors({});
        }
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box className={title === "Become a Partner" ? styles.signupFormPartner : styles.signupContainer}>
            <Box component="form" className={styles.signupForm} onSubmit={handleSubmit}>
                <Typography variant="h2" className={styles.title}>{title}</Typography>
                {(title === "Sign Up" || title === "Become a Partner") && (
                    <Grid container spacing={2} className={styles.inputGroup}>
                        <Grid item xs={12} sm={6}>
                            <input
                                type="text"
                                placeholder="First Name"
                                className={`${styles.inputField} ${errors.firstName ? styles.errorInput : ''}`}
                                name='firstName'
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                required
                            />
                            {errors.firstName && <Typography color="error">{errors.firstName}</Typography>}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <input
                                type="text"
                                placeholder="Last Name"
                                className={`${styles.inputField} ${errors.lastName ? styles.errorInput : ''}`}
                                name='lastName'
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                required
                            />
                            {errors.lastName && <Typography color="error">{errors.lastName}</Typography>}
                        </Grid>
                    </Grid>
                )}
                <Grid container spacing={2}>
                    {title === "Become a Partner" && (<Grid item xs={12} className={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="Company name"
                            className={`${styles.inputField} ${errors.companyName ? styles.errorInput : ''}`}
                            name='companyName'
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            required
                        />
                        {errors.companyName && <Typography color="error">{errors.companyName}</Typography>}
                    </Grid>)}
                    <Grid item xs={12} className={styles.inputGroup}>
                        <input
                            type="email"
                            placeholder="Email Address"
                            className={`${styles.inputField} ${errors.email ? styles.errorInput : ''}`}
                            name='email'
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                        {errors.email && <Typography color="error">{errors.email}</Typography>}
                    </Grid>
                    {(title === "Sign Up" || title === "Become a Partner") && (
                        <Grid item xs={12} className={styles.inputGroup}>
                            <input
                                type="tel"
                                placeholder="Phone No"
                                className={`${styles.inputField} ${errors.phoneNumber ? styles.errorInput : ''}`}
                                name='phoneNumber'
                                value={formData.phoneNumber}
                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                required
                            />
                            {errors.phoneNumber && <Typography color="error">{errors.phoneNumber}</Typography>}
                        </Grid>
                    )}
                    {(title === "Sign Up" || title === "Login") && (
                        <Grid item xs={12} className={styles.inputGroup}>
                            <input
                                type="password"
                                placeholder="Password"
                                className={`${styles.inputField} ${errors.password ? styles.errorInput : ''}`}
                                name='password'
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                            {errors.password && <Typography color="error">{errors.password}</Typography>}
                        </Grid>
                    )}
                    {title === "Become a Partner" && (<Grid item xs={12} className={styles.inputGroup}>
                        <textarea
                            type="Text"
                            placeholder="Message"
                            className={`${styles.inputField} ${errors.message ? styles.errorInput : ''}`}
                            style={{ height: "120px" }}
                            multiline
                            name='message'
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                        />
                        {errors.message && <Typography color="error">{errors.message}</Typography>}
                    </Grid>)}
                </Grid>
                <Button type='submit' variant="outlined" className={styles.submitButton}>{loading ? 'Submitting...' : 'Submit'}</Button>
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CommonForm;
