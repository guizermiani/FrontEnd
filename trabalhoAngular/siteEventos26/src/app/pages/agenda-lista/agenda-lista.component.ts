import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AgendaService } from '../../services/agenda.service';
import { Evento, Categoria } from '../../models/agenda.model';

@Component({
  selector: 'app-agenda-lista',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './agenda-lista.component.html'
})
export class AgendaListaComponent implements OnInit {
  private agendaService = inject(AgendaService);
  private router = inject(Router);

  eventos = signal<Evento[]>([]);
  eventoSelecionado = signal<Evento | null>(null);
  categorias: Categoria[] = [];
  searchTerm = signal('');
  selectedCategoria = signal('');
  carrinho = signal<Evento[]>([]);

  eventosFiltrados = computed(() => {
    const texto = this.searchTerm().trim().toLowerCase();
    const categoria = this.selectedCategoria();
    return this.eventos().filter(evento => {
      const matchesTerm =
        !texto ||
        evento.titulo.toLowerCase().includes(texto) ||
        evento.local.toLowerCase().includes(texto) ||
        evento.descricao.toLowerCase().includes(texto);
      const matchesCategoria = !categoria || evento.categoriaId === categoria;
      return matchesTerm && matchesCategoria;
    });
  });

  ngOnInit() {
    this.carregarEventos();
    this.carregarCategorias();

    const saved = localStorage.getItem('carrinho');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Evento[];
        this.carrinho.set(parsed ?? []);
      } catch {
        this.carrinho.set([]);
      }
    }
  }

  carregarEventos() {
    this.agendaService.getEventos().subscribe(res => this.eventos.set(res));
  }

  carregarCategorias() {
    this.agendaService.getCategorias().subscribe(res => {
      this.categorias = res;
    });
  }

  limparFiltro() {
    this.searchTerm.set('');
    this.selectedCategoria.set('');
  }

  detalhesEvento(evento: Evento) {
    this.eventoSelecionado.set(evento);

    const modal = new (window as any).bootstrap.Modal(
      document.getElementById('modalEvento')
    );
    modal.show();
  }

  adicionarCarrinho(evento: Evento) {
    const existe = this.carrinho().some(item => item.id === evento.id);
    if (!existe) {
      this.carrinho.update(list => {
        const novo = [...list, evento];
        localStorage.setItem('carrinho', JSON.stringify(novo));
        return novo;
      });
    }
  }

  irCarrinho() {
    const itens = this.carrinho();
    if (!itens.length) {
      alert('Carrinho vazio. Adicione um evento antes de continuar.');
      return;
    }

    this.router.navigate(['/checkout'], { state: { evento: itens[0], carrinho: itens } });
  }

  comprarIngresso() {
    const evento = this.eventoSelecionado();
    if (!evento) {
      return;
    }

    const modalEl = document.getElementById('modalEvento');
    const bsModal = modalEl ? (window as any).bootstrap.Modal.getInstance(modalEl) : null;
    bsModal?.hide();

    this.router.navigate(['/checkout'], { state: { evento } });
  }

  getImagem(evento: Evento): string {
    if (evento.image) {
      return evento.image;
    }

    const imagensPorCategoria: Record<string, string> = {
      '1': 'https://source.unsplash.com/800x600/?futsal,soccer',
      '2': 'https://source.unsplash.com/800x600/?basketball',
      '3': 'https://source.unsplash.com/800x600/?gym,school',
      '4': 'https://source.unsplash.com/800x600/?festival',
      '5': 'https://source.unsplash.com/800x600/?cycling',
    };

    return imagensPorCategoria[evento.categoriaId] ?? 'https://source.unsplash.com/800x600/?sports';
  }

  getCategoriaNome(categoriaId?: string): string {
    return this.categorias.find(cat => cat.id === categoriaId)?.nome ?? 'Geral';
  }
}



