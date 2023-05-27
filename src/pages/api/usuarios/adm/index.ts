/*
*   SUBSTITUÍDO PELO REACT-ADMIN
*/

// import type { NextApiRequest, NextApiResponse } from 'next'
// import { UsuarioRepo } from '@app/server/database'
// import {UsuarioValidator} from '../util';
// import { hashPassword } from '../../auth/auth';
// import { getToken } from "next-auth/jwt";
// /*
// *   Rotas para gerência de usuários.
// *   Restrição:       Usuário logado
// *   Nível de acesso: Admin
// */
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<any>
// ) { 
//     const token = await getToken({req}) as any;
//     if(!token) 
//         res.status(401).send("É necessário estar autenticado.");
//     else if(token.permissao != 'admin')
//         res.status(401).send("É necessário ter nível de acesso administrador para esta função.");
//     else{

//     /*
//     *   Obtém usuários. Inclui eventos cujo usuário é criador.
//     *   Query Params:   id, primeiro_nome, segundo_nome, email, permissao
//     *   Body:           None
//     */
//     if(req.method === 'GET'){
//         const {id, primeiro_nome, segundo_nome, email, permissao} = req.query;
//         const where : { [key:string]: any} = {};
        
//         if(id) where.id = id;
//         if(primeiro_nome) where.name = primeiro_nome;
//         if(segundo_nome) where.segundoNome = segundo_nome;
//         if(email){
//             if(typeof email === 'string') where.email = email.toLocaleLowerCase();
//             else where.email = email[0].toLocaleLowerCase();
//         }
//         if(permissao) where.permissao = permissao;

//         try{
//             const usuarios = await UsuarioRepo.find({where: where, relations:{
//                 eventos: true
//             }});
//             res.status(200).json(usuarios);
//         }catch(e){res.status(500).json(e) }
//     }

//     /*
//     *   Atualiza o perfil de um usuário.
//     *   Query Params:   None
//     *   Body:           (Required): "id", "primeiro_nome","segundo_nome",
//     *                   "email_confirmado","celular","foto_perfil","cpf"
//     *                   "email","permissao"
//     *                   (Optional): "senha"                       
//     */
//     else if(req.method === 'PUT'){
//         let [valid, errorMsg] = UsuarioValidator.validateAdminPutPerfil(req.body);

//         if(!req.body.id){
//             valid = false;
//             errorMsg = "Atributo pendente: id";
//         }

//         if(valid){
//             try{
//                 let usuario = await UsuarioRepo.findOne({where: {id: req.body.id}}); 
//                 if(usuario == null){
//                     res.status(400).json(`Não foi encontrado usuário de id: ${req.body.id}`);
//                 }else{

//                     const {primeiro_nome, segundo_nome, celular,
//                         cpf, foto_perfil, senha, email, permissao} = req.body;

//                     usuario.primeiroNome = primeiro_nome;
//                     usuario.segundoNome = segundo_nome;
//                     usuario.celular = celular;
//                     usuario.email = email;
//                     usuario.cpf = cpf;
//                     usuario.fotoPerfil = foto_perfil;
//                     usuario.permissao = permissao;
//                     if(senha) usuario.senha = await hashPassword(senha);
//                     usuario.updatedAt = new Date();

//                     usuario = await UsuarioRepo.save(usuario);
//                     res.status(200).json(usuario);
//                 }
//             }catch(e){ res.status(500).json(e) }

//         } else{ res.status(400).json({errorMsg}) }
//     }
    
//     else if(req.method === 'DELETE'){
//         const {id} = req.query;
//         if(id){
//             try{
//                 await UsuarioRepo.delete(id);
//                 res.status(200).json("Usuario deletado com sucesso");
//             }catch(e){ res.status(500).json(e); }
//         }else{ res.status(400).json("Faltando id de usuário")}
//     }

//     }
// }