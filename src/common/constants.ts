
export enum ApiResource {
    CATEGORIAS = 'categorias',
    USUARIOS = 'usuarios',
    EVENTOS = 'eventos',
    INSCRICOES = 'inscricoes',
    PARAMETRO = 'parametro',
    RECOMENDACOES = 'recomendacoes'
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

/*
* Tipos de recomendações de eventos
*/
export enum TipoRecomendacao{
    HIBRIDA = 1,
    FILTRAGEM_COLABORATIVA = 2,
    SIMLIARIDADE_COSSENO = 3,
    DIVERSOS = 4,
    HIBRIDA_DIVERSOS = 5,
    FILTRAGEM_COLABORATIVA_DIVERSOS = 6,
    SIMLIARIDADE_COSSENO_DIVERSOS = 7,
}
