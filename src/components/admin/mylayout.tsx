// in src/MyLayout.js
import { Layout } from 'react-admin';

import { MyAppBar } from './myappbar';
export const MyLayout = (props:any) => <Layout {...props} appBar={MyAppBar} />;