export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "default" | "admin" | "recepcionista" | "basico" | "agenda" | "configuracion";
    };
  }
}
