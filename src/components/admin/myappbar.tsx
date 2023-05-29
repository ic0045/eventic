import * as React from 'react';
import { AppBar, RefreshIconButton, TitlePortal } from 'react-admin';
import Box from '@mui/material/Box';


export const MyAppBar = () => (
    <AppBar elevation={0} color="transparent" position='static' alwaysOn>
        <TitlePortal />
        <Box flex="1" />
    </AppBar>
);