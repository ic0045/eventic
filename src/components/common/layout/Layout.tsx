// import styles from './layout.module.css'
import { FunctionComponent } from "react";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import { Container } from "@mui/material";

interface LayoutProps {
  children: JSX.Element;
}

export const Layout: FunctionComponent<LayoutProps> = (props: LayoutProps) => {
  return (
    <Container maxWidth="xl">
      <Header />
      {props.children}
      <Footer />
    </Container>
  );
};
