export interface Categoria {
  id: string;
  nome: string;
}

export interface Evento {
  id?: string;
  titulo: string;
  data: string;
  local: string;
  categoriaId: string;
  descricao: string;
}

export interface usuario {
    id: string;
    nome: string;
    email: string;
    senha: string;
}
