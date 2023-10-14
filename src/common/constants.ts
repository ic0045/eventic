
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

/*
* Nome dos parâmetros em banco
*/
export enum ParametroName{
    SIMILARIDADE_MIN = "similaridade_min"
}


export enum NotificarEm {
    uma_hora_antes = 'Uma hora antes do evento',
    um_dia_antes = 'Um dia antes do evento',
}
