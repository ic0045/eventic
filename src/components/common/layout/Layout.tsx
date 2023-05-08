// import styles from './layout.module.css'
import { FunctionComponent } from "react"
import { Header } from '../header/Header'
import { Footer } from '../footer/Footer'

interface LayoutProps {
    children: JSX.Element
}

export const Layout: FunctionComponent<LayoutProps> = (props: LayoutProps) => {

    return (
            <div>
                <Header />
                { props.children }
                <Footer />
            </div>
    )
} 