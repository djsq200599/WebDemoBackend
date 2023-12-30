import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, addDoc, collection, } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  firestore = inject(AngularFirestore);

  constructor() { }

  addVisit(visit: Visit) {
    return addDoc(collection(getFirestore(), 'visits'), visit);
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
