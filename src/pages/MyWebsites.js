import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Link as MuiLink } from '@mui/material';

// List of websites to display
const websites = [
    { label: 'Radarr', url: 'http://192.168.50.222:7878/' },
    { label: 'Sonarr', url: 'http://192.168.50.222:8989/' },
    { label: 'Transmission', url: 'http://192.168.50.222:3000/' },
    { label: 'Jellyfin', url: 'http://192.168.50.222:8096/web/#/home.html' },
    { label: 'qBittorrent', url: 'http://192.168.50.222:8080/' },
];

/**
 * Page component that shows a simple card grid of personal web services.
 * Clicking on a card will open the target in a new browser tab.
 */
const MyWebsites = () => {
    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                我的網頁
            </Typography>
            <Grid container spacing={2}>
                {websites.map(({ label, url }) => (
                    <Grid item xs={12} sm={6} md={4} key={url}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {label}
                                </Typography>
                                <MuiLink href={url} target="_blank" rel="noopener noreferrer">
                                    {url}
                                </MuiLink>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default MyWebsites; 