import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento, Categoria, Ingresso } from '../models/agenda.model';

@Injectable({ providedIn: 'root' })
export class AgendaService {
  private http = inject(HttpClient);
  private readonly URL_EVENTOS = 'http://localhost:3000/eventos';
  private readonly URL_CATEGORIAS = 'http://localhost:3000/categorias';
  private readonly URL_INGRESSOS = 'http://localhost:3000/ingressos';

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

  // Métodos para ingressos
  getIngressos(): Observable<Ingresso[]> {
    return this.http.get<Ingresso[]>(this.URL_INGRESSOS);
  }

  getIngressosPorUsuario(usuarioId: string): Observable<Ingresso[]> {
    return this.http.get<Ingresso[]>(`${this.URL_INGRESSOS}?usuarioId=${usuarioId}`);
  }

  comprarIngresso(ingresso: Omit<Ingresso, 'id'>): Observable<Ingresso> {
    return this.http.post<Ingresso>(this.URL_INGRESSOS, ingresso);
  }

  cancelarIngresso(id: string): Observable<void> {
    return this.http.delete<void>(`${this.URL_INGRESSOS}/${id}`);
  }
}
