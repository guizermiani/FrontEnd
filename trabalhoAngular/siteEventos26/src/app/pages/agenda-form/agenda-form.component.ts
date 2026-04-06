 import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AgendaService } from '../../services/agenda.service';
import { GeocodingService } from '../../services/geocoding.service';
import { Categoria } from '../../models/agenda.model';

@Component({
  selector: 'app-agenda-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './agenda-form.component.html',
  styleUrl: './agenda-form.component.css',
  styles: [`
    .container { 
      max-width: 600px; 
      margin: 2rem auto;
      padding: 2.5rem;
    }
  `]
})
export class AgendaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private agendaService = inject(AgendaService);
  private geocodingService = inject(GeocodingService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  agendaForm: FormGroup;
  categorias: Categoria[] = [];
  imagePreview: string | null = null;
  carregandoLocalizacao = false;
  localizacaoEncontrada = false;
  latitude: number | null = null;
  longitude: number | null = null;

  constructor() {
    // Inicialização do formulário com validações
    this.agendaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      data: ['', Validators.required],
      local: ['', Validators.required],
      categoriaId: ['', Validators.required],
      descricao: ['', [Validators.required, Validators.maxLength(200)]],
      valorIngresso: [''],
      image: [''],
      latitude: [''],
      longitude: ['']
    });
  }

  ngOnInit() {
    // Carrega as categorias do JSON Server para o Select
    this.agendaService.getCategorias().subscribe(res => {
      this.categorias = res;
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
        this.agendaForm.patchValue({ image: this.imagePreview });
        this.cdr.markForCheck();
      };
      reader.readAsDataURL(file);
    }
  }

  buscarLocalizacao(): void {
    const local = this.agendaForm.get('local')?.value;
    
    if (!local || local.trim() === '') {
      alert('Digite o endereço do evento para buscar a localização');
      return;
    }

    this.carregandoLocalizacao = true;
    this.geocodingService.buscarLocalizacao(local).subscribe({
      next: (results) => {
        if (results && results.length > 0) {
          this.latitude = parseFloat(results[0].lat);
          this.longitude = parseFloat(results[0].lon);
          this.localizacaoEncontrada = true;
          this.agendaForm.patchValue({
            latitude: this.latitude,
            longitude: this.longitude
          });
          alert(`Localização encontrada: ${results[0].display_name}`);
          this.cdr.markForCheck();
        } else {
          alert('Endereço não encontrado. Tente outro endereço.');
        }
        this.carregandoLocalizacao = false;
      },
      error: (err) => {
        console.error('Erro ao buscar localização:', err);
        alert('Erro ao buscar localização. Tente novamente.');
        this.carregandoLocalizacao = false;
      }
    });
  }

  resetarFormulario() {
    this.agendaForm.reset();
    this.imagePreview = null;
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
