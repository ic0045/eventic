import { NextPage } from "next";
import { EventoAPI } from '@app/apis/EventoAPI';
import Home from '@app/components/home';
import styles from "./minhasinscricoes.module.css";

export default function MinhasInscricoes() {

  return (
    <Home home={false}></Home>
  );
};