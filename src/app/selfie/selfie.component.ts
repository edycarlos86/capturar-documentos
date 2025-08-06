/* import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcamModule, WebcamImage } from 'ngx-webcam';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-selfie',
  standalone: true,
  imports: [CommonModule, WebcamModule],
  templateUrl: './selfie.component.html',
  styleUrls: ['./selfie.component.css']
})
export class SelfieComponent {
  webcamImage: WebcamImage | null = null;
  trigger: Subject<void> = new Subject<void>();
  cameraAtiva: boolean = true;

  get triggerObservable() {
    return this.trigger.asObservable();
  }

  tirarFoto(): void {
    this.trigger.next();
  }

  capturarImagem(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.cameraAtiva = false;
  }

  refazerFoto(): void {
    this.webcamImage = null;
    this.cameraAtiva = true;
  }

  continuar(): void {
    // Aqui você pode salvar a imagem ou enviar para o serviço
    console.log('Imagem base64:', this.webcamImage?.imageAsDataUrl);
  }
} */






/*
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcamImage, WebcamModule, WebcamInitError } from 'ngx-webcam';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-selfie',
  standalone: true,
  imports: [CommonModule, WebcamModule],
  templateUrl: './selfie.component.html',
  styleUrls: ['./selfie.component.css']
})
export class SelfieComponent implements OnInit {
  webcamImage: WebcamImage | null = null;
  trigger: Subject<void> = new Subject<void>();
  cameraAtiva: boolean = true;
  cameraError: string | null = null;

  ngOnInit(): void {
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
      this.cameraError = 'A câmera pode não funcionar em HTTP. Use HTTPS (ngrok) ou localhost.';
    }
  }

  get triggerObservable() {
    return this.trigger.asObservable();
  }

  tirarFoto(): void {
    this.trigger.next();
  }

  capturarImagem(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.cameraAtiva = false;
  }

  refazerFoto(): void {
    this.webcamImage = null;
    this.cameraAtiva = true;
  }

    continuar(): void {
    // Aqui você pode salvar a imagem ou enviar para o serviço
    console.log('Imagem base64:', this.webcamImage?.imageAsDataUrl);
  }

  handleInitError(error: WebcamInitError): void {
    console.error('Erro ao iniciar a câmera:', error);
    if (error.mediaStreamError && error.mediaStreamError.name === 'NotAllowedError') {
      this.cameraError = 'Permissão da câmera negada. Ative nas configurações do navegador.';
    } else {
      this.cameraError = 'Não foi possível acessar a câmera.';
    }
  }
}
 */








// selfie.component.ts
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WebcamModule } from 'ngx-webcam';

@Component({
  selector: 'app-selfie',
  standalone: true,
  imports: [CommonModule, WebcamModule],
  templateUrl: './selfie.component.html'
})
export class SelfieComponent {
  @ViewChild('videoElement', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  selfieTirada: string | null = null;
  stream!: MediaStream;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.abrirCamera();
  }

  abrirCamera() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      .then(stream => {
        this.stream = stream;
        this.videoElement.nativeElement.srcObject = stream;
      })
      .catch(err => {
        alert('Erro ao acessar a câmera: ' + err.message);
      });
  }

  tirarSelfie() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvas.nativeElement;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.selfieTirada = canvas.toDataURL('image/jpeg');
    }

    this.stream.getTracks().forEach(track => track.stop());
  }

  recarregarCamera() {
    this.selfieTirada = null;
    this.abrirCamera();
  }

  continuar() {
    sessionStorage.setItem('selfie', this.selfieTirada!);
    this.router.navigate(['/confirmacao']);
  }
}
