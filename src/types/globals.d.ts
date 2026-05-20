export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "default" | "admin" | "recepcionista" | "secretaria" | "basico" | "agenda" | "configuracion";
    };
  }
}
