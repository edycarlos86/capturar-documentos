
import { WelcomeComponent } from './welcome/welcome.component';
import { SelfieComponent } from './selfie/selfie.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { ConfirmacaoComponent } from './confirmacao/confirmacao.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'documentos', component: DocumentosComponent },
  { path: 'selfie', component: SelfieComponent },
  { path: 'confirmacao', component: ConfirmacaoComponent },
];
