// src/EventsLayout.js

import React from 'react';
import { Grid } from '@mui/material';
import './EventsLayout.scss';

const EventsLayout = () => {
    return (
        <Grid container className="layout">
            <Grid item xs={12} sm={6} md={6} lg={6}>
                <div className="clipped-container">
                    <div className="clipped-element"></div>
                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
                <div className="clipped-container1">
                    <div className="clipped-element1"></div>
                </div>
                <div className="clipped-container2">
                    <div className="clipped-element2"></div>
                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
                <div className="clipped-container-3">
                    <div className="clipped-element-3"></div>
                </div>
            </Grid>
            <Grid item xs={12} sm={8} md={8} lg={8}>
                <div className="clipped-container-4">
                    <div className="clipped-element-4">
                        <div className="event-text-container">
                            <span className="event-text">Events</span>
                            <span className="event-text">Events</span>
                            <span className="event-text">Events</span>
                            <span className="event-text">Evens</span>
                            <span className="event-text">Evens</span>
                            <span className="event-text">Evens</span>
                            <span className="event-text">Evens</span>
                        </div>
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} sm={8} md={8} lg={8}>
                <div className="clipped-container-5">
                    <div className="clipped-element-5"></div>
                </div>
            </Grid>
        </Grid>
    );
};

export default EventsLayout;
