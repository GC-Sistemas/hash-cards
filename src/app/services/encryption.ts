import { Injectable } from '@angular/core';
import { JSEncrypt } from 'jsencrypt';

@Injectable({
  providedIn: 'root',
})
export class Encryption {
  private jsEncrypt: JSEncrypt;
  
  // Llave pública RSA (reemplázala con la que genere tu backend)
  // Esta es solo un ejemplo - debes usar la llave pública real de tu servidor
  private readonly PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy8Dbv8prpJ/0kKhlGeJY
ozo2t60EG8EcYNdXd/ewvvUaxQ1pGgdJqHcqnfLhMCxFLEqC+VvhhGp8sBhpJ6Bl
V++Wz5j3Mf3JvdlCPvZAuPVqDzGo6LqcMYpN0VQZQxhWlE8hE7TZHtQKkP9iBJaz
zSrRrWmXnUDPwvqrSkJPNjC0GqQCdYvVFHqwWmKLqOe9vPbxXqDcrTAQVXQYG/Cr
c0bL7iXmULJDC/NfYAZqOhGJ7WHVrPoL8xPvhKIhGabpJZgMqJCbKlI5KvCmv2Sv
H9vpqkYdQGjKPGGU3WLg7ScCZB6YdVGFHwmYG9UbDCsLPLQbJXLBfYqJL5PqVmJQ
DwIDAQAB
-----END PUBLIC KEY-----`;

  constructor() {
    this.jsEncrypt = new JSEncrypt();
    this.jsEncrypt.setPublicKey(this.PUBLIC_KEY);
  }

  /**
   * Cifra datos usando RSA con la llave pública
   * @param data - Objeto o string a cifrar
   * @returns String cifrado en base64, o null si falla
   */
  encrypt(data: any): string | null {
    try {
      const jsonString = typeof data === 'string' ? data : JSON.stringify(data);
      const encrypted = this.jsEncrypt.encrypt(jsonString);
      return encrypted ? encrypted.toString() : null;
    } catch (error) {
      console.error('Error al cifrar datos:', error);
      return null;
    }
  }

  /**
   * Cifra cada campo de un objeto individualmente
   * @param data - Objeto con campos a cifrar
   * @returns Objeto con cada campo cifrado, o null si falla
   */
  encryptFields(data: Record<string, any>): Record<string, string> | null {
    try {
      const encryptedData: Record<string, string> = {};
      
      for (const [key, value] of Object.entries(data)) {
        if (value !== null && value !== undefined) {
          const encrypted = this.jsEncrypt.encrypt(value.toString());
          if (!encrypted) {
            console.error(`Error al cifrar el campo: ${key}`);
            return null;
          }
          encryptedData[key] = encrypted.toString();
        }
      }
      
      return encryptedData;
    } catch (error) {
      console.error('Error al cifrar campos:', error);
      return null;
    }
  }

  /**
   * Actualiza la llave pública (útil si la obtienes dinámicamente del backend)
   * @param publicKey - Nueva llave pública en formato PEM
   */
  setPublicKey(publicKey: string): void {
    this.jsEncrypt.setPublicKey(publicKey);
  }
}
