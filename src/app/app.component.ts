/* import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CapturarDocumentos';
}
 */



import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor() {
    this.redirecionarSeNaoForHttps();
  }

  redirecionarSeNaoForHttps(): void {
    const isLocalhost = location.hostname === 'localhost' || location.hostname.startsWith('192.168.');
    const isHttps = location.protocol === 'https:';

    if (!isHttps && !isLocalhost) {
      const httpsUrl = `https://${location.hostname}${location.pathname}`;
      window.location.href = httpsUrl;
    }

    // (opcional) redirecionar para ngrok se estiver em HTTP local
    if (!isHttps && isLocalhost) {
      window.location.href = 'https://c411121e1360.ngrok-free.app';
    }
  }
}
