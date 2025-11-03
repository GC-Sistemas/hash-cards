import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Encryption } from '../services/encryption';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class FormComponent {
  private encryptionService = inject(Encryption);

  cardForm = new FormGroup({
    holdername: new FormControl('Omar Gonzalez', Validators.required),
    card: new FormControl('4970100000000055', Validators.required),
    month: new FormControl('12', Validators.required),
    year: new FormControl('25', Validators.required),
    cvv: new FormControl('123', Validators.required)
  });

  send() {
    if (this.cardForm.valid) {
      // Obtener los datos del formulario
      const cardData = this.cardForm.value;
      
      // Cifrar cada campo individualmente
      const encryptedData = this.encryptionService.encryptFields(cardData);
      
      if (encryptedData) {
        console.log('✅ Datos con campos cifrados individualmente:', encryptedData);
        
        // Aquí enviarías los datos cifrados a tu backend
        // Ejemplo:
        // {
        //   "holdername": "encrypted_string_1...",
        //   "card": "encrypted_string_2...",
        //   "month": "encrypted_string_3...",
        //   "year": "encrypted_string_4...",
        //   "cvv": "encrypted_string_5..."
        // }
        
        // this.http.post('https://tu-api.com/payment', encryptedData).subscribe();
        
        // Limpiar el formulario por seguridad
        this.cardForm.reset();
      } else {
        console.error('❌ Error al cifrar los datos');
      }
    } else {
      console.log('❌ Formulario inválido');
    }
  }
}
