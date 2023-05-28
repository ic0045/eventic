import { NextPage } from "next";
import { EventoAPI } from '@app/apis/EventoAPI';
import Home from '@app/components/home';
import styles from "./minhasinscricoes.module.css";

export default function MinhasInscricoes({ data, categorias, eventosCategoria }: { data: Evento[], categorias: Categoria[], eventosCategoria: Array<EventoPorCategoria> }) {

  return (
    <Home data={data} categorias={categorias} eventosCategoria={eventosCategoria} home={false}></Home>
  );
};

export async function getServerSideProps() {
  const api = process.env.PUBLIC_URL

  // Pega os Eventos
  const data = await EventoAPI.findLast(0,100);

  // Pega as Categorias
  const resCategoria = await fetch(`${api}/api/categorias`)
  const categorias = await resCategoria.json()

  // Pega os Eventos por Categoria
  const eventosCategoria = []
  for (const categoria of categorias) {
      const res = await fetch(`${api}/api/eventos?categoria_id=${categoria.id}`);
      const newData = await res.json();
      eventosCategoria.push({ nome: categoria.nome, eventos: newData })
  }


  return {
      props: {
          data,
          categorias,
          eventosCategoria
      },
  }
}
