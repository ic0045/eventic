
export interface EventoPostRequest {
    descricao: string,
    localizacao: string,
    data_inicial: string,
    titulo: string,
    destaque?: string,
    imagem?: string,
    data_final?: string,
    imagem_url: string,
    link_titulo?: string,
    tipo: string,
    usuario_id: string,
    link_mais_informacoes?: string,
    categoria_id?: number    
}
