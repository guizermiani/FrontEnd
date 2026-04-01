import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaService } from '../../services/agenda.service';
import { Evento } from '../../models/agenda.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-agenda-lista',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './agenda-lista.component.html'
})
export class AgendaListaComponent implements OnInit {
  private agendaService = inject(AgendaService);
  eventos = signal<Evento[]>([]);
  eventoSelecionado = signal<Evento | null>(null);

  ngOnInit() {
    this.carregarEventos();
  }

  carregarEventos() {
    this.agendaService.getEventos().subscribe(res => this.eventos.set(res));
  }

  detalhesEvento(evento: Evento) {
  this.eventoSelecionado.set(evento);

  const modal = new (window as any).bootstrap.Modal(
    document.getElementById('modalEvento')
  );
  modal.show();
}
}



