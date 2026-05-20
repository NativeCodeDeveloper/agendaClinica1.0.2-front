export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "default" | "admin" | "recepcionista" | "secretaria" | "basico" | "clinico-medico" | "odontologico" | "agenda" | "configuracion";
    };
  }
}
