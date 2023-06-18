import moment from 'moment'
import 'moment/locale/pt-br';

interface Evento {
    id: string
    descricao: string
    localizacao: string
    dataInicial: string
    titulo: string
    destaque: boolean
    imagemUrl: string
    createdAt: string
    updatedAt: string
    datafinal: string
    tipo: string
    linkMaisInfomacoes: string
}

interface EventoPorPeriodo {
    nome: string;
    eventos: Evento[];
}

interface EventoPorCategoria {
    nome: string;
    eventos: Evento[];
}

interface Categoria {
    id: string
    nome: string
    icone: string
}

interface ObjetoCategoria {
    eventosPorDiaAnteriores: Array<EventoPorPeriodo>
    eventosPorDiaNovos: Array<EventoPorPeriodo>
    eventosPorSemanaAnteriores: Array<EventoPorPeriodo>
    eventosPorSemanaNovos: Array<EventoPorPeriodo>
    eventosPorMesAnteriores: Array<EventoPorPeriodo>
    eventosPorMesNovos: Array<EventoPorPeriodo>
}

interface ListaCategorias {
    [key: string]: ObjetoCategoria;
}



function separaEventosPorPeriodo(eventos: Evento[], periodo: 'semana' | 'mes') {
    moment.locale('pt-br');
    const eventosPorPeriodo: Array<EventoPorPeriodo> = [];

    eventos.forEach((evento) => {
        let periodoIndex: number;
        let nomePeriodo: string;

        if (periodo === 'semana') {
            // periodoIndex = moment(evento.dataInicial).week();
            const dataInicioSemana = moment(evento.dataInicial).startOf('week').format('D [de] MMMM');
            const dataFimSemana = moment(evento.dataInicial).add(6, 'days').format('D [de] MMMM');
            nomePeriodo = `Semana de ${dataInicioSemana} a ${dataFimSemana}`;
        } else if (periodo === 'mes') {
            // periodoIndex = moment(evento.dataInicial).month();
            nomePeriodo = moment(evento.dataInicial).format('MMMM YYYY');
        } else {
            throw new Error('Período inválido. Escolha entre "semana" e "mes".');
        }

        if (!eventosPorPeriodo.find((p) => p.nome === nomePeriodo)) {
            eventosPorPeriodo.push({
              nome: nomePeriodo,
              eventos: [],
            });
          }
      
          const periodoObj = eventosPorPeriodo.find((p) => p.nome === nomePeriodo);
          if (periodoObj) {
            periodoObj.eventos.push(evento);
          }

        // if (!eventosPorPeriodo[periodoIndex]) {
        //     eventosPorPeriodo[periodoIndex] = {
        //         nome: nomePeriodo,
        //         eventos: [],
        //     };
        // }
        // eventosPorPeriodo[periodoIndex].eventos.push(evento);
    });

    return eventosPorPeriodo;
}


function organizaEventos(eventos: Evento[]) {

    // Ordena os eventos por data
    eventos = eventos.sort((a, b) =>
        new Date(a.dataInicial).getTime() -
        new Date(b.dataInicial).getTime()
    );  
    // Separando os eventos em dois arrays: um para as datas que já passaram e outro para as novas datas
    const eventosAntigos: Evento[] = eventos.filter(evento => new Date(evento.dataInicial).getTime() < Date.now());
    const eventosNovos: Evento[] = eventos.filter(evento => new Date(evento.dataInicial).getTime() >= Date.now());

    let eventosPorDiaAnteriores = [{ nome: '', eventos: [...eventosAntigos] }]
    let eventosPorDiaNovos = [{ nome: '', eventos: [...eventosNovos] }]

    let eventosPorSemanaAnteriores = separaEventosPorPeriodo(eventosAntigos, 'semana');
    let eventosPorSemanaNovos = separaEventosPorPeriodo(eventosNovos, 'semana');

    let eventosPorMesAnteriores = separaEventosPorPeriodo(eventosAntigos, 'mes');
    let eventosPorMesNovos = separaEventosPorPeriodo(eventosNovos, 'mes');

    return [eventosPorDiaAnteriores, eventosPorDiaNovos, eventosPorSemanaAnteriores, eventosPorSemanaNovos, eventosPorMesAnteriores, eventosPorMesNovos]
}


export function criaListaCategorias(eventosCategoria: Array<EventoPorCategoria>, data: Evento[]) {

    const eventosOrganizados = organizaEventos(data)
    let [eventosPorDiaAnteriores, eventosPorDiaNovos, eventosPorSemanaAnteriores, eventosPorSemanaNovos, eventosPorMesAnteriores, eventosPorMesNovos] = eventosOrganizados

    const listaCategorias: ListaCategorias = {
        Todas: {
            eventosPorDiaAnteriores: eventosPorDiaAnteriores,
            eventosPorDiaNovos: eventosPorDiaNovos,
            eventosPorSemanaAnteriores: eventosPorSemanaAnteriores,
            eventosPorSemanaNovos: eventosPorSemanaNovos,
            eventosPorMesAnteriores: eventosPorMesAnteriores,
            eventosPorMesNovos: eventosPorMesNovos
        }
    }

    for (const categoria of eventosCategoria) {
        const [eventosPorDiaAnteriores, eventosPorDiaNovos, eventosPorSemanaAnteriores, eventosPorSemanaNovos, eventosPorMesAnteriores, eventosPorMesNovos] = organizaEventos(categoria.eventos)
        const eventoOrganizado = {
            eventosPorDiaAnteriores: eventosPorDiaAnteriores,
            eventosPorDiaNovos: eventosPorDiaNovos,
            eventosPorSemanaAnteriores: eventosPorSemanaAnteriores,
            eventosPorSemanaNovos: eventosPorSemanaNovos,
            eventosPorMesAnteriores: eventosPorMesAnteriores,
            eventosPorMesNovos: eventosPorMesNovos
        }
        listaCategorias[categoria.nome] = eventoOrganizado
    }

    return listaCategorias
}