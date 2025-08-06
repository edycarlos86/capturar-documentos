import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadService } from '../services/upload.service'; // ajuste o path se necessário

@Component({
  selector: 'app-confirmacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.css']
})
export class ConfirmacaoComponent implements OnInit {
  selfie: string | null = null;
  documentos: any = {};
  tipoDocumento: string = '';
  tipoEmpresa: string = '';
  urlGerada: string = '';
  identificadorCliente: string = 'sadksajdksajdksadjsakjjd';

  constructor(private uploadService: UploadService) {}

  ngOnInit(): void {
    this.selfie = localStorage.getItem('selfie');
    this.documentos = JSON.parse(localStorage.getItem('documentos') || '{}');
    this.tipoDocumento = localStorage.getItem('tipoDocumento') || '';
    this.tipoEmpresa = localStorage.getItem('tipoEmpresa') || '';

    this.gerarUrl();
  }

  gerarUrl(): void {
    const flags = {
      rg: this.tipoDocumento === 'RG' && this.documentos.rg ? 'S' : 'N',
      cnh: this.tipoDocumento === 'CNH' && this.documentos.cnh ? 'S' : 'N',
      selfie: this.selfie ? 'S' : 'N',
      contratosocial: this.documentos.contratosocial ? 'S' : 'N',
      cartaocnpj: this.documentos.cartaocnpj ? 'S' : 'N',
      ataeleicao: this.documentos.ataeleicao ? 'S' : 'N',
      identificadorcliente: this.identificadorCliente
    };

    this.urlGerada = `https://api.seusistema.com/upload?${new URLSearchParams(flags).toString()}`;
  }

  async enviar(): Promise<void> {
    await this.uploadService.enviarArquivos(this.selfie!, this.documentos);
    alert('Enviado com sucesso!');
  }
}
