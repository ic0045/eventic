import { useState, useEffect, FunctionComponent, ReactElement, JSXElementConstructor } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { NextComponentType, NextPage, NextPageContext } from 'next';

type Props = {
    children:  NextPage
  }

const RouteGuard = (props: {
    children: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
  }) => {
    const router = useRouter();
    const session = useSession();
    const [authorized, setAuthorized] = useState(false);
    const publicPaths = ['/auth/login', '/cadastrousuario'];
    const { children } = props;

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function authCheck(url: string) {
        // redirect to login page if accessing a private page and not logged in 
        const path = url.split('?')[0];
        if (!session.data?.user && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/auth/login',
                query: { returnUrl: router.asPath }
            });
        } else {
            setAuthorized(true);
        }
        
    }

    return authorized ? children : null;
}

export default RouteGuard

