import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, addDoc, collection, } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  firestore = inject(AngularFirestore);

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  addVisit(visit: Visit) {
    return addDoc(collection(getFirestore(), 'visits'), visit);
  }



  // Método para iniciar sesión de forma anónima
  signInAnonymously() {
    // Llama al método signInAnonymously() desde el servicio de autenticación de Firebase
    this.afAuth
      .signInAnonymously()
      .then((userCredential) => {
        // Obtiene el identificador único del usuario anónimo
        const uid = userCredential.user?.uid; // Add null check here
        console.log('Usuario anónimo inició sesión con el uid: ' + uid);
      })
      .catch((error) => {
        // Maneja el error
        console.error('Error al iniciar sesión de forma anónima: ' + error);
      });
  }
}

export interface Visit {
  id?: string;
  fullName: string;
  rut: {
    numero: string;
    digitoVerificador: string;
  };
  phoneNumber: string;
  department: string;
  tower: string;
  fechaHora?: any;
}
