
export enum ApiResource {
    CATEGORIAS = 'categorias',
    USUARIOS = 'usuarios',
    EVENTOS = 'eventos',
    INSCRICOES = 'inscricoes',
}

export enum FormMode {
    EDIT,
    CREATE
}

/*
*  Níveis de permissão de usuário
*/
export enum Permissao {
    admin = 'admin', 
    servidor = 'servidor',
    visitante = 'visitante',
}


export enum NotificarEm {
    UMA_HORA_ANTES = 'uma_hora_antes',
    UM_DIA_ANTES = 'um_dia_antes',
}