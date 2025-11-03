# HashCards

**HashCards** Es una aplicación Angular diseñada para recopilar información de tarjetas de crédito/débito de forma segura y enviarla cifrada a un backend, cumpliendo con estándares de seguridad PCI DSS.

## 🔐 Características de Seguridad

Este proyecto implementa **cifrado de extremo a extremo (E2EE)** utilizando **RSA** para proteger los datos sensibles de tarjetas de crédito durante la transmisión al backend.

### Mecanismo de Cifrado

1. **Generación de Llaves RSA**: El backend genera un par de llaves (pública/privada)
2. **Cifrado en Frontend**: Cada campo del formulario se cifra individualmente usando la llave pública RSA
3. **Transmisión Segura**: Los datos cifrados viajan por HTTPS al backend
4. **Descifrado en Backend**: Solo el backend puede descifrar usando la llave privada

### Flujo de Datos

```
Usuario completa formulario
         ↓
Cada campo se cifra con RSA (llave pública)
         ↓
Objeto con campos cifrados:
{
  "holdername": "AsD9fK2n...encrypted...",
  "card": "Pm8xR4vL...encrypted...",
  "month": "Qw7eT5yU...encrypted...",
  "year": "Zx3cV8bN...encrypted...",
  "cvv": "Hy6gF2kJ...encrypted..."
}
         ↓
Envío por HTTPS al backend
         ↓
Backend descifra con llave privada
         ↓
Procesa el pago con Banamex Dialect Payments
```

## 📋 Campos del Formulario

- **Holder Name**: Nombre del titular de la tarjeta
- **Card Number**: Número de tarjeta (16 dígitos)
- **Month**: Mes de expiración (MM)
- **Year**: Año de expiración (YY)
- **CVV**: Código de seguridad (3-4 dígitos)

## 🛡️ Medidas de Seguridad Implementadas

- ✅ Cifrado RSA campo por campo
- ✅ Autocomplete deshabilitado en campos sensibles
- ✅ Limpieza automática del formulario después del envío
- ✅ Validación de campos requeridos
- ✅ Transmisión exclusiva por HTTPS
- ✅ No almacenamiento local de datos sensibles

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js (v18 o superior)
- Angular CLI v20.3.4

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd hash-cards

# Instalar dependencias
npm install
```

### Configuración de Llaves RSA

1. **Generar llaves en tu backend**:
```bash
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout -out public.pem
```

2. **Actualizar la llave pública**:
   - Abre `src/app/services/encryption.ts`
   - Reemplaza el valor de `PUBLIC_KEY` con el contenido de `public.pem`

### Servidor de Desarrollo

Para iniciar un servidor de desarrollo local, ejecuta:

```bash
ng serve
```

Una vez que el servidor esté corriendo, abre tu navegador y navega a `http://localhost:4200/`. La aplicación se recargará automáticamente cuando modifiques cualquier archivo fuente.

## 🏗️ Estructura del Proyecto

```
src/app/
├── form/
│   ├── form.ts          # Componente del formulario
│   ├── form.html        # Template del formulario
│   └── form.css         # Estilos del formulario
└── services/
    └── encryption.ts    # Servicio de cifrado RSA
```

## 🧪 Pruebas

Para ejecutar las pruebas unitarias con [Karma](https://karma-runner.github.io), usa el siguiente comando:

```bash
ng test
```

## 📦 Compilación

Para compilar el proyecto ejecuta:

```bash
ng build
```

Esto compilará tu proyecto y almacenará los artefactos de compilación en el directorio `dist/`. Por defecto, la compilación de producción optimiza tu aplicación para rendimiento y velocidad.

## 🔒 Cumplimiento PCI DSS

Este proyecto implementa las siguientes recomendaciones PCI DSS:

- **Requisito 4**: Cifrado de datos de titulares durante la transmisión
- **Requisito 6**: Desarrollo seguro de aplicaciones
- **Requisito 8**: No almacenamiento de datos sensibles en frontend

⚠️ **Nota**: El cumplimiento completo de PCI DSS requiere implementación adecuada en el backend y la infraestructura completa.

## 📄 Licencia

Este proyecto está desarrollado para uso con **Banamex Dialect Payments** - Método Direct Payment.

## 🤝 Contribuciones

Este es un proyecto privado para procesamiento de pagos. No se aceptan contribuciones externas.

## 📚 Recursos Adicionales

Para más información sobre el uso de Angular CLI, incluyendo referencias detalladas de comandos, visita la página [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
