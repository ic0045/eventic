import type { NextApiRequest, NextApiResponse } from 'next'
import { UsuarioRepo } from '@app/database'
import { Usuario } from '@app/entities/Usuario'
import { validateNotNullFields} from './util'
import { hashPassword } from '../login/validator'
import { AcessLevel } from '@app/utils/auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    if(req.method === 'POST'){
        const [valid, errorMsg] = validateNotNullFields(req.body);
        if(valid){
            try{
                const existingUsuario = await UsuarioRepo.findOne({where: {email: req.body.email}});
                if(!existingUsuario){
                    let usuario = Usuario.createFromObj(req.body);
                    usuario.permissao = AcessLevel.visitante; //admins não são criados por esta rota
                    usuario.senha = await hashPassword(usuario.senha);
                    usuario = await UsuarioRepo.save(usuario);
                    res.status(200).json({usuario});
                }
                else{ res.status(400).json("Já existe um usuario de email: "+req.body.email)}
            }catch(e){res.status(500).json(e)}
        }else{ res.status(400).json({errorMsg})}
    }
    
    else if(req.method === 'GET'){
        const {id, primeiro_nome, segundo_nome, email, permissao} = req.query;
        const where : { [key:string]: any} = {};
        
        if(id) where.id = id;
        if(primeiro_nome) where.name = primeiro_nome;
        if(segundo_nome) where.segundoNome = segundo_nome;
        if(email) where.email = email;
        if(permissao) where.permissao = permissao;

        try{
            const usuarios = await UsuarioRepo.find({where: where})
            res.status(200).json(usuarios);
        }catch(e){res.status(500).json(e) }
    }

    else if(req.method === 'PUT'){ //Não altera senha e nem permissão
        let [valid, errorMsg] = validateNotNullFields(req.body);

        if(!req.body.id){
            valid = false;
            errorMsg = "Atributo pendente: id";
        }

        if(valid){
            try{
                let usuario = await UsuarioRepo.findOne({where: {id: req.body.id}}); 
                if(usuario == null){
                    res.status(400).json(`Não foi encontrado usuário de id: ${req.body.id}`);
                }else{
                    const {primeiro_nome, segundo_nome, email, celular,
                        cpf, foto_perfil} = req.body;

                    if(primeiro_nome) usuario.name = primeiro_nome;
                    if(segundo_nome) usuario.segundoNome = segundo_nome;
                    if(celular)usuario.celular = celular;
                    if(email) usuario.email = email;
                    if(cpf) usuario.cpf = cpf;
                    if(foto_perfil) usuario.image = foto_perfil;
                    usuario.updatedAt = new Date();

                    usuario = await UsuarioRepo.save(usuario);
                    res.status(200).json(usuario);
                }
            }catch(e){ res.status(500).json(e) }

        } else{ res.status(400).json({errorMsg}) }
    }
    
    else if(req.method === 'DELETE'){
        const {id} = req.query;
        if(id){
            try{
                await UsuarioRepo.delete(id);
                res.status(200).json("Usuario deletado com sucesso");
            }catch(e){ res.status(500).json(e); }
        }else{ res.status(400).json("Faltando id de usuário")}
    }
}