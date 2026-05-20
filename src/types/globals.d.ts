export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "default" | "admin" | "recepcionista" | "secretaria" | "basico" | "centro-estetico" | "clinico-medico" | "odontologico" | "oftalmologia" | "agenda" | "configuracion";
    };
  }
}
