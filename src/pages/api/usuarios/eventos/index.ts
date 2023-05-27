import type { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '@app/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { InscricaoRepo } from '@app/server/database';

/*
*   Rota para obter eventos que o usuário da sessão está inscrito
*   Restrição:       Nenhuma
*   Nível de acesso: Todos
*/
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if(req.method === 'GET'){
        const session = await getServerSession(req,res,authOptions);
        if(!session){
            res.status(401).json({errorMsg: "Usuário não logado."});
            return;
        }
        try{
        const eventos = [];
            const inscricoes = await InscricaoRepo.find({where: {usuario: {id: session.user.id} }, relations: {evento:true}});
            for(let insc of inscricoes)
                eventos.push(insc.evento)
            res.status(200).json(eventos);
        }catch(e){res.status(500).json({errorMsg: e})}
    }
}