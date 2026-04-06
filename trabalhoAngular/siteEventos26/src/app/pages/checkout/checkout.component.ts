import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgendaService } from '../../services/agenda.service';
import { Evento, Categoria, Ingresso } from '../../models/agenda.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styles: [`
    .container { max-width: 650px; margin: 2rem auto; }
    .event-card { border: 1px solid #777; background: #1e293b; color:#fff; padding:16px; border-radius: 8px; margin-bottom:15px; }
    .btn-remember { width: 100%; }
  `]
})
export class CheckoutComponent implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private agendaService = inject(AgendaService);

  categoriaEvento: string = 'Desconhecido';
  eventoSelecionado: Evento | null = null;
  carrinho: Evento[] = [];
  categorias: Categoria[] = [];

  checkoutForm: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    telefone: ['', [Validators.required, Validators.minLength(8)]],
    formaPagamento: ['cartao', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const stateFromRouter = navigation?.extras?.state as { evento?: Evento; carrinho?: Evento[] };
    const historyState = window.history.state as { evento?: Evento; carrinho?: Evento[] };
    const state = stateFromRouter?.carrinho || stateFromRouter?.evento ? stateFromRouter : historyState;

    if (state?.carrinho?.length) {
      this.carrinho = state.carrinho;
      this.eventoSelecionado = state.evento ?? state.carrinho[0];
    } else if (state?.evento) {
      this.carrinho = [state.evento];
      this.eventoSelecionado = state.evento;
    } else {
      const storage = localStorage.getItem('carrinho');
      if (storage) {
        try {
          const parsed = JSON.parse(storage) as Evento[];
          if (parsed?.length) {
            this.carrinho = parsed;
            this.eventoSelecionado = parsed[0];
          }
        } catch {}
      }
    }

    if (this.eventoSelecionado?.categoriaId) {
      this.categoriaEvento = this.eventoSelecionado.categoriaId;
    }
  }

  submit() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    const dados = this.checkoutForm.value;
    const usuarioId = 'usuario-1'; // Em produção, viria do serviço de autenticação

    // Criar observables para todos os itens do carrinho
    const observablesIngressos = this.carrinho.map(evento => {
      const ingresso: Omit<Ingresso, 'id'> = {
        eventoId: evento.id!,
        usuarioId: usuarioId,
        quantidade: 1, // Por enquanto, 1 ingresso por evento
        valorTotal: Number(evento.valorIngresso) || 0,
        dataCompra: new Date().toISOString().split('T')[0],
        codigoIngresso: this.gerarCodigoIngresso()
      };

      return this.agendaService.comprarIngresso(ingresso);
    });

    // Aguardar todas as compras serem processadas
    forkJoin(observablesIngressos).subscribe({
      next: (ingressos) => {
        // Limpar carrinho após compra bem-sucedida
        localStorage.removeItem('carrinho');

        alert(`Compra confirmada!\n${this.carrinho.length} ingresso(s) comprado(s) com sucesso!\nNome: ${dados.nome}`);

        // Redirecionar para Meus Ingressos
        this.router.navigate(['/meus-ingressos']);
      },
      error: (error) => {
        console.error('Erro ao processar compra:', error);
        alert('Erro ao processar compra. Tente novamente.');
      }
    });
  }

  private gerarCodigoIngresso(): string {
    return 'ING-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
  }

  voltar() {
    this.router.navigate(['/']);
  }
}
