/* import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  // 👇 Altere este IP se estiver testando no celular
  private apiUrl = 'http://192.168.1.102:3000/upload'; // ✅ use o IP do seu PC

  constructor(private http: HttpClient) {}


  async enviarImagens(selfie: string, documentos: any): Promise<void> {
    const payload = {
      selfie: selfie || null,
      rg: documentos.rg || null,
      cnh: documentos.cnh || null,
      contratosocial: documentos.contratosocial || null,
      cartaocnpj: documentos.cartaocnpj || null,
      ataeleicao: documentos.ataeleicao || null
    };

    try {
      await lastValueFrom(this.http.post(this.apiUrl, payload));
      console.log('✅ Upload realizado com sucesso');
    } catch (error) {
      console.error('❌ Erro ao enviar os arquivos:', error);
      throw error;
    }
  }
}
 */









import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private apiUrl = 'http://localhost:3000/upload'; // ou a URL da sua API

  constructor(private http: HttpClient) {}

  enviarArquivos(
    identificadorCliente: string,
    arquivos: {
      selfie?: File;
      cnh?: File;
      rg?: File;
      contratosocial?: File;
      cartaocnpj?: File;
      ataeleicao?: File;
    }
  ): Observable<any> {
    const formData = new FormData();

    formData.append('identificadorcliente', identificadorCliente);

    if (arquivos.selfie) formData.append('selfie', arquivos.selfie);
    if (arquivos.cnh) formData.append('cnh', arquivos.cnh);
    if (arquivos.rg) formData.append('rg', arquivos.rg);
    if (arquivos.contratosocial) formData.append('contratosocial', arquivos.contratosocial);
    if (arquivos.cartaocnpj) formData.append('cartaocnpj', arquivos.cartaocnpj);
    if (arquivos.ataeleicao) formData.append('ataeleicao', arquivos.ataeleicao);

    return this.http.post(this.apiUrl, formData);
  }
}
