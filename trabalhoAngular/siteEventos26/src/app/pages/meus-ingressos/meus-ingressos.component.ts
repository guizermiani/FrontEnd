import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AgendaService } from '../../services/agenda.service';
import { Ingresso, Evento } from '../../models/agenda.model';
import { forkJoin, timeout, catchError, of } from 'rxjs';

@Component({
  selector: 'app-meus-ingressos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './meus-ingressos.component.html',
  styleUrl: './meus-ingressos.component.css'
})
export class MeusIngressosComponent implements OnInit {
  private agendaService = inject(AgendaService);

  ingressos: (Ingresso & { evento?: Evento })[] = [];
  carregando = true;
  erro = '';

  // Simulando usuário logado (em produção, viria de um serviço de autenticação)
  usuarioId = 'usuario-1';

  ngOnInit() {
    console.log('Componente MeusIngressos inicializado');
    this.carregarIngressos();
  }

  carregarIngressos() {
    console.log('Iniciando carregamento de ingressos...');
    this.carregando = true;
    this.erro = '';

    // Timeout forçado para evitar carregamento infinito
    setTimeout(() => {
      if (this.carregando) {
        console.warn('Timeout forçado - parando carregamento');
        this.carregando = false;
        if (!this.erro) {
          this.erro = 'Timeout ao carregar dados. Tente novamente.';
        }
      }
    }, 15000); // 15 segundos

    // Buscar ingressos e eventos em paralelo com timeout
    const ingressos$ = this.agendaService.getIngressosPorUsuario(this.usuarioId).pipe(
      timeout(5000), // 5 segundos timeout
      catchError(error => {
        console.warn('Servidor não disponível, usando dados mockados para ingressos');
        // Dados mockados para teste
        return of([
          {
            id: '1',
            eventoId: '1',
            usuarioId: 'usuario-1',
            quantidade: 2,
            valorTotal: 90,
            dataCompra: '2024-12-01',
            codigoIngresso: 'ING-1733011200000-ABC12'
          },
          {
            id: '2',
            eventoId: '2',
            usuarioId: 'usuario-1',
            quantidade: 1,
            valorTotal: 100,
            dataCompra: '2024-12-02',
            codigoIngresso: 'ING-1733097600000-DEF34'
          }
        ] as Ingresso[]);
      })
    );

    const eventos$ = this.agendaService.getEventos().pipe(
      timeout(5000), // 5 segundos timeout
      catchError(error => {
        console.warn('Servidor não disponível, usando dados mockados para eventos');
        // Dados mockados para teste
        return of([
          {
            id: '1',
            titulo: 'Campeonato Estadual de Futsal Sub-20',
            data: '2026-04-10',
            local: 'Ginásio Municipal de Rio do Sul',
            categoriaId: '1',
            descricao: 'Disputa entre as melhores equipes do estado na categoria Sub-20.',
            valorIngresso: 45
          },
          {
            id: '2',
            titulo: 'Torneio de Basquete 3x3',
            data: '2026-04-19',
            local: 'NBA',
            categoriaId: '2',
            descricao: 'Torneio aberto com premiação em dinheiro.',
            valorIngresso: 100
          }
        ] as Evento[]);
      })
    );

    forkJoin({
      ingressos: ingressos$,
      eventos: eventos$
    }).subscribe({
      next: ({ ingressos, eventos }) => {
        console.log('Dados recebidos:', { ingressos, eventos });
        // Combinar ingressos com dados dos eventos
        this.ingressos = ingressos.map(ingresso => ({
          ...ingresso,
          evento: eventos.find(evento => String(evento.id) === String(ingresso.eventoId))
        }));
        console.log('Ingressos processados:', this.ingressos);
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro geral no forkJoin:', error);
        this.erro = 'Erro ao carregar dados. Usando dados de exemplo.';
        this.carregando = false;
      }
    });
  }

  cancelarIngresso(ingressoId: string) {
    if (confirm('Tem certeza que deseja cancelar este ingresso?')) {
      this.agendaService.cancelarIngresso(ingressoId).subscribe({
        next: () => {
          this.carregarIngressos(); // Recarregar a lista
        },
        error: (error) => {
          console.error('Erro ao cancelar ingresso:', error);
          alert('Erro ao cancelar ingresso. Tente novamente.');
        }
      });
    }
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }

  formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }
}