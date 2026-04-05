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
  valorIngresso?: number | string;
  image?: string;
  latitude?: number;
  longitude?: number;
}

export interface Ingresso {
  id?: string;
  eventoId: string;
  usuarioId: string;
  quantidade: number;
  valorTotal: number;
  dataCompra: string;
  codigoIngresso: string;
  evento?: Evento; // Para incluir dados do evento
}

export interface usuario {
    id: string;
    nome: string;
    email: string;
    senha: string;
}
