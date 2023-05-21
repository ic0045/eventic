import * as React from 'react';
import { AppBar, RefreshIconButton, TitlePortal } from 'react-admin';
import Box from '@mui/material/Box';


export const MyAppBar = () => (
    <AppBar color="primary" style={{marginTop: 100}}>
        <TitlePortal />
        <Box flex="1" />
    </AppBar>
);