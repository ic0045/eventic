
export enum ApiResource {
    CATEGORIAS = 'categorias',
    USUARIOS = 'usuarios',
    EVENTOS = 'eventos',
    INSCRICOES = 'inscricoes',
    PARAMETRO = 'parametro',
}

export enum FormMode {
    EDIT,
    CREATE
}

/*
*  Níveis de permissão de usuário
*/
export enum PermissaoEnum {
    admin = 'Administrador', 
    servidor = 'Servidor',
    visitante = 'Visitante',
}


export enum NotificarEm {
    uma_hora_antes = 'Uma hora antes do evento',
    um_dia_antes = 'Um dia antes do evento',
}
