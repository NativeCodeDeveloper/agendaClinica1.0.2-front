export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "admin" | "recepcionista" | "basico" | "agenda" | "configuracion";
    };
  }
}
