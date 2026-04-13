import React from 'react';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Link as MuiLink,
    Chip,
    Stack,
} from '@mui/material';

const host = window.location.hostname || '192.168.50.222';

// Auto-collected web UIs running on this machine
const websites = [
    { label: 'Media Management Frontend', port: 3000, path: '/', note: 'React App' },
    { label: 'PotatoMusic', port: 5173, path: '/', note: 'Music frontend' },
    { label: 'CouchDB', port: 5984, path: '/', note: 'DB admin/API (auth required)' },
    { label: 'Radarr', port: 7878, path: '/', note: 'Movie management' },
    { label: 'Media API (port 8000)', port: 8000, path: '/', note: 'Web/API endpoint' },
    { label: 'PotatoMusic Backend (port 8001)', port: 8001, path: '/', note: 'API endpoint' },
    { label: 'Koel', port: 8003, path: '/', note: 'Music server' },
    { label: 'qBittorrent', port: 8080, path: '/', note: 'Torrent WebUI' },
    { label: 'Jellyfin', port: 8096, path: '/web/', note: 'Media server' },
    { label: 'Service UI (port 8191)', port: 8191, path: '/', note: 'Web endpoint' },
    { label: 'Service UI (port 8781)', port: 8781, path: '/', note: 'Web/API endpoint' },
    { label: 'Sonarr', port: 8989, path: '/', note: 'TV management' },
    { label: 'Prowlarr', port: 9696, path: '/', note: 'Indexer management' },
    { label: 'HK Parking Map', port: 18080, path: '/', note: 'Parking visualization' },
    { label: 'OpenClaw Control', port: 18789, path: '/', note: 'Agent control panel' },
    { label: 'HA Sensor Dashboard', port: 18888, path: '/', note: 'HA temp/humidity dashboard' },
].map(item => ({ ...item, url: `http://${host}:${item.port}${item.path}` }));

const MyWebsites = () => {
    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                我的網頁
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                顯示本機目前可用的網站入口（使用目前主機 IP: {host}）
            </Typography>
            <Grid container spacing={2}>
                {websites.map(({ label, url, port, note }) => (
                    <Grid item xs={12} sm={6} md={4} key={url}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                    <Typography variant="h6">{label}</Typography>
                                    <Chip size="small" label={`:${port}`} />
                                </Stack>
                                <Typography variant="body2" sx={{ mb: 1, opacity: 0.75 }}>
                                    {note}
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
