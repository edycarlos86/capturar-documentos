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







// src/app/documentos/documentos.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-documentos',
   imports: [CommonModule, FormsModule],
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css'],
  standalone: true,

})
export class DocumentosComponent {
  tipoDocumentoSelecionado: string = '';
  documentos: { tipo: string; arquivo: File; preview: string | null }[] = [];

  tipos = [
    { value: 'rg', label: 'RG' },
    { value: 'cnh', label: 'CNH' },
    { value: 'selfie', label: 'Selfie com documento' },
    { value: 'contratosocial', label: 'Contrato Social' },
    { value: 'cartaocnpj', label: 'Cartão CNPJ' },
    { value: 'ataeleicao', label: 'Ata de Eleição' },
  ];

  aoSelecionarArquivo(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length || !this.tipoDocumentoSelecionado) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const preview = file.type.startsWith('image/') ? reader.result as string : null;

      this.documentos.push({
        tipo: this.tipoDocumentoSelecionado,
        arquivo: file,
        preview,
      });
      this.tipoDocumentoSelecionado = '';
      input.value = '';
    };

    reader.readAsDataURL(file);
  }

  enviarDocumentos() {
    const formData = new FormData();
    this.documentos.forEach((doc, index) => {
      formData.append(doc.tipo, doc.arquivo);
    });

    // Simulando envio
    console.log('Enviando documentos:', this.documentos);

    alert('📤 Documentos enviados com sucesso!');
  }
}

