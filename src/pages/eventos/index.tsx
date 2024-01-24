import { EventoAPI } from '@app/apis/EventoAPI';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { GetServerSideProps } from 'next';
import Home from '@app/components/home';
import { EventoRecomendacao, EventoPorCategoriaRecomendacao, Categoria } from '../../../app';
import { Evento } from '@app/server/entities/evento.entity';


export default function HomePage({ data, categorias, eventosCategoria, userId }: { data: EventoRecomendacao[], categorias: Categoria[], eventosCategoria: Array<EventoPorCategoriaRecomendacao>, userId : string | null }) {
    return (
            <Home data={data} categorias={categorias} eventosCategoria={eventosCategoria} home={true} userId={userId}></Home>
    )
}

export const getServerSideProps: GetServerSideProps = async ({req,res }) => {
    const api = process.env.PUBLIC_URL;
    const session = await getServerSession(req, res, authOptions);

    // Pega os Eventos
    let data = await EventoAPI.findLast(0,15);

    let eventosRecs : EventoRecomendacao[] = [];
    for(let evento of data){
        let recs : Evento[] =  session != null?
        await EventoAPI.getRecomendacoes(evento.id, session.user.id) 
        : 
        await EventoAPI.getRecomendacoes(evento.id, null);
        eventosRecs.push({evento: evento, recomendacoes: recs});
    }

    // let eventosRecs : EventoRecomendacao[] = await data.map( async (evento: Evento) : EventoRecomendacao => {
    //     let recs : Evento[] =  session != null?
    //     await EventoAPI.getRecomendacoes(evento.id, session.user.id) 
    //     : 
    //     await EventoAPI.getRecomendacoes(evento.id, null);
    //     console.log("--> " + typeof recs)
    //     return {evento: evento, recomendacoes: recs};
    // });

    data = eventosRecs;

    // Pega as Categorias
    const resCategoria = await fetch(`${api}/api/categorias`)
    const categorias = await resCategoria.json()

    // Pega os Eventos por Categoria
    const eventosCategoria = []
    for (const categoria of categorias) {
        const res = await fetch(`${api}/api/eventos?categoria_id=${categoria.id}`);
        const newData : Evento[]  = await res.json();

        let eventosArray = [];
        for(let evento of newData){
            let recs : Evento[] =  session != null?
            await EventoAPI.getRecomendacoes(evento.id, session.user.id) 
            : 
            await EventoAPI.getRecomendacoes(evento.id, null);
            eventosArray.push({evento: evento, recomendacoes: recs});
            // eventosCategoria.push({ nome: categoria.nome, eventos: {evento: evento, recomendacoes: recs} })
        }
        eventosCategoria.push({nome: categoria.nome, eventos: eventosArray});

        // const eventosRecs : {evento : Evento, recomendacoes : Evento[]}[] = await newData.map( async (evento: Evento) : Promise<{evento : Evento, recomendacoes : Evento[]}> => {
        //     const recs : Evento[] =  session != null?
        //     await EventoAPI.getRecomendacoes(evento.id, session.user.id) 
        //     : 
        //     await EventoAPI.getRecomendacoes(evento.id, null);
        //     return {evento: evento, recomendacoes: recs};
        // })
        // eventosCategoria.push({ nome: categoria.nome, eventos: eventosRecs })
    }


    return {
        props: {
            data,
            categorias,
            eventosCategoria,
            userId: session != null? session.user.id : null
        },
    }
}
