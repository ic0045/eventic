
export interface UsuarioPostRequest {
    primeiro_nome: string,
    segundo_nome: string,
    email: string,
    senha: string,
    permissao: string,
    celular?: string,
    cpf?: string,
    cep?: string,
    foto_perfil: string
}
