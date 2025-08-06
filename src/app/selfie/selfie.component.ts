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








// src/app/selfie/selfie.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-selfie',
  templateUrl: './selfie.component.html',
  styleUrls: ['./selfie.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class SelfieComponent implements OnInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  stream!: MediaStream;
  selfieTirada: string | null = null;

  ngOnInit(): void {
    this.iniciarCamera();
  }

  iniciarCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.stream = stream;
        this.videoElement.nativeElement.srcObject = stream;
        this.videoElement.nativeElement.play();
        this.selfieTirada = null;
      })
      .catch(error => {
        console.error('Erro ao acessar a câmera:', error);
        alert('Erro ao acessar a câmera. Verifique permissões.');
      });
  }

  tirarSelfie() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvas.nativeElement;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);

    this.selfieTirada = canvas.toDataURL('image/png');
  }

  recarregarCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
    this.iniciarCamera();
  }
}

