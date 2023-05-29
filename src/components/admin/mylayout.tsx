// in src/MyLayout.js
import { Layout } from 'react-admin';

import { MyAppBar } from './myappbar';
import { MyMenu } from './mymenu';
export const MyLayout = (props:any) => <Layout {...props} appBar={MyAppBar} menu={MyMenu} appBarAlwaysOn style={{backgroundColor: '#F0F2F5'}}/>;