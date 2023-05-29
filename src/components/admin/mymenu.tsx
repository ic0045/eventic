import { Menu, useResourceDefinitions } from 'react-admin';
import HomeIcon from '@mui/icons-material/Home';

export const MyMenu = () => {
    const resources = useResourceDefinitions();
   return ( <Menu>
        <Menu.Item to="/" primaryText="Página Inicial" leftIcon={<HomeIcon />}/>
        {Object.keys(resources).map(name => (
                <Menu.ResourceItem key={name} name={name} />
            ))}
   </Menu>
)
}