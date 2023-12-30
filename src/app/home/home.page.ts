import { Component, OnInit } from '@angular/core';
import { FirestoreService, Visit } from '../services/firestore.service';
import { Observable } from 'rxjs';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  nuevaVisita: any = {
    fullName: '',
    rut: {
      numero: '',  // Campo para el número del RUT
      digitoVerificador: ''  // Campo para el dígito verificador
    },
    phoneNumber: '+56',
    department: '',
    tower: ''
  };

  visitas!: Observable<DocumentChangeAction<Visit>[]>;
  nombreInvalido: boolean = false;
  telefonoInvalido: boolean = false;
  rutInvalido: boolean = false;
  departamentoInvalido: boolean = false;
  formularioInvalido: boolean = false;
  cargando: boolean = false;

  constructor(
    private firestoreService: FirestoreService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  async agregarVisita() {
    this.cargando = true;

    if (this.validarNombre() && this.validarRut() && this.validarTelefono() && this.validarDepartamento()) {
      try {
        // Agregar automáticamente la fecha y hora actual
        this.nuevaVisita.fechaHora = new Date();

        await this.firestoreService.addVisit(this.nuevaVisita);
        this.mostrarAlerta('Visita ingresada');
        this.nuevaVisita = {
          fullName: '',
          rut: {
            numero: '',
            digitoVerificador: ''
          },
          phoneNumber: '+56',
          department: '',
          tower: ''
        };
        this.nombreInvalido = false;
        this.telefonoInvalido = false;
        this.rutInvalido = false;  // Corregir el nombre de la propiedad
        this.departamentoInvalido = false;
      } catch (error) {
        console.error('Error al agregar visita:', error);
      } finally {
        this.cargando = false;
      }
    } else {
      this.formularioInvalido = true;
      this.cargando = false;
    }
  }

  validarNombre(): boolean {
    this.nombreInvalido = !this.nuevaVisita.fullName ||
      this.nuevaVisita.fullName.length < 4 ||
      !/^[a-zA-Z\s]+$/g.test(this.nuevaVisita.fullName);
    return !this.nombreInvalido;
  }

  validarRut(): boolean {
    const rutNumero = this.nuevaVisita.rut.numero;
    const rutDigitoVerificador = this.nuevaVisita.rut.digitoVerificador;
  
    // Verificar si el número del RUT está presente, tiene al menos 4 dígitos y es numérico
    if (!rutNumero || rutNumero.length < 4 || !/^[0-9]+$/g.test(rutNumero)) {
      this.rutInvalido = true;
      return false;
    }
  
    // Verificar el dígito verificador
    if (!this.validarDigitoVerificador(rutNumero, rutDigitoVerificador)) {
      this.rutInvalido = true;
      return false;
    }
  
    // El RUT es válido
    this.rutInvalido = false;
    return true;
  }
  
  validarDigitoVerificador(rutSinGuion: string, dv: string): boolean {
    // Calcular el dígito verificador esperado
    const dvCalculado = this.calcularDigitoVerificador(rutSinGuion);
  
    // Verificar que el dígito verificador sea válido
    return dv === dvCalculado;
  }
  
  calcularDigitoVerificador(rutSinGuion: string): string {
    let suma = 0;
    let multiplicador = 2;
  
    // Recorrer el número de derecha a izquierda
    for (let i = rutSinGuion.length - 1; i >= 0; i--) {
      suma += parseInt(rutSinGuion.charAt(i), 10) * multiplicador;
      multiplicador = multiplicador < 7 ? multiplicador + 1 : 2;
    }
  
    // Calcular el dígito verificador
    const resultado = 11 - (suma % 11);
    return resultado === 11 ? '0' : resultado === 10 ? 'k' : resultado.toString();
  }

  validarTelefono(): boolean {
    const telefonoRegex = /^\+56\d{9}$/;
    this.telefonoInvalido = !this.nuevaVisita.phoneNumber || !telefonoRegex.test(this.nuevaVisita.phoneNumber);
    return !this.telefonoInvalido;
  }

  validarDepartamento(): boolean {
    const departamentoRegex = /^\d{3,3}$/;
    this.departamentoInvalido = !this.nuevaVisita.department || !departamentoRegex.test(this.nuevaVisita.department);
    return !this.departamentoInvalido;
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}