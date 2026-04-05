 import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgendaService } from '../../services/agenda.service';
import { Categoria } from '../../models/agenda.model';

@Component({
  selector: 'app-agenda-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agenda-form.component.html',
  styles: [`
    .container { max-width: 600px; margin-top: 2rem; }
    .invalid-feedback { display: block; }
  `]
})

export class AgendaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private agendaService = inject(AgendaService);
  private router = inject(Router);

  agendaForm: FormGroup;
  categorias: Categoria[] = [];

  constructor() {
    // Inicialização do formulário com validações
    this.agendaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      data: ['', Validators.required],
      local: ['', Validators.required],
      categoriaId: ['', Validators.required],
      descricao: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  ngOnInit() {
    // Carrega as categorias do JSON Server para o Select
    this.agendaService.getCategorias().subscribe(res => {
      this.categorias = res;
    });
  }

  salvar() {
    if (this.agendaForm.valid) {
      this.agendaService.salvarEvento(this.agendaForm.value).subscribe({
        next: () => {
          alert('Evento salvo com sucesso!');
          this.router.navigate(['/']); // Volta para a listagem
        },
        error: (err) => console.error('Erro ao salvar:', err)
      });
    } else {
      Object.values(this.agendaForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
