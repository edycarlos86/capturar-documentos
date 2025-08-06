/* import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-documentos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent {
  tipoDocumento: 'RG' | 'CNH' | null = null;
  tipoEmpresa: 'PF' | 'MEI' | 'LTDA' | 'SA' | null = null;

  arquivos: { [key: string]: string | null } = {
    rg: null,
    cnh: null,
    contratosocial: null,
    cartaocnpj: null,
    ataeleicao: null
  };

  constructor(private router: Router) {}

  onFileChange(event: Event, key: string) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const reader = new FileReader();
    reader.onload = () => this.arquivos[key] = reader.result as string;
    reader.readAsDataURL(input.files[0]);
  }

  continuar() {
    // Salva no localStorage os arquivos enviados
    localStorage.setItem('documentos', JSON.stringify(this.arquivos));
    localStorage.setItem('tipoDocumento', this.tipoDocumento ?? '');
    localStorage.setItem('tipoEmpresa', this.tipoEmpresa ?? '');

    this.router.navigate(['/selfie']);
  }

  isObrigatorio(key: string): boolean {
    if (!this.tipoEmpresa) return false;

    const obrigatoriosPorTipo = {
      PF: ['rg', 'cnh'],
      MEI: ['cartaocnpj'],
      LTDA: ['contratosocial'],
      SA: ['ataeleicao']
    };

    return obrigatoriosPorTipo[this.tipoEmpresa].includes(key);
  }
}
 */







// documentos.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documentos',
  imports: [CommonModule, FormsModule],
  templateUrl: './documentos.component.html'
})
export class DocumentosComponent {
  documentos = {
    rg: false,
    cnh: false,
    cartaocnpj: false,
    contratosocial: false,
    ataeleicao: false
  };

  constructor(private router: Router) {}

  continuar() {
    sessionStorage.setItem('documentos', JSON.stringify(this.documentos));
    this.router.navigate(['/selfie']);
  }
}
