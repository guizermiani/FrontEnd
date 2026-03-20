import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento, Categoria } from '../models/agenda.model';

@Injectable({ providedIn: 'root' })
export class AgendaService {
  private http = inject(HttpClient);
  private readonly URL_EVENTOS = 'http://localhost:3000/eventos';
  private readonly URL_CATEGORIAS = 'http://localhost:3000/categorias';

  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.URL_EVENTOS);
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.URL_CATEGORIAS);
  }

  salvarEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.URL_EVENTOS, evento);
  }
  
  excluirEvento(id: string): Observable<void> {
    return this.http.delete<void>(`${this.URL_EVENTOS}/${id}`);
  }
}
