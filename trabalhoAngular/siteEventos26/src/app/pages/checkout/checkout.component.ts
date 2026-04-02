import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgendaService } from '../../services/agenda.service';
import { Evento, Categoria } from '../../models/agenda.model';

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
    alert(`Compra confirmada!\nEvento: ${this.eventoSelecionado?.titulo ?? 'N/A'}\nNome: ${dados.nome}\nTelefone: ${dados.telefone}\nPagamento: ${dados.formaPagamento}`);

    this.router.navigate(['/']);
  }

  voltar() {
    this.router.navigate(['/']);
  }
}
