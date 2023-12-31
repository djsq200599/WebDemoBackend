import { Component } from '@angular/core';
import { FirestoreService } from './services/firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private firestoreService: FirestoreService) { // Inyecta tu servicio FirestoreService
    this.initializeApp();
  }

  initializeApp() {
    this.firestoreService.signInAnonymously(); // Llama al método signInAnonymously() cuando la aplicación se inicia
  }
}