export const DASHBOARD_ROLES = {
  ADMIN: "admin",
  RECEPCIONISTA: "recepcionista",
  BASICO: "basico",
  AGENDA: "agenda",
  CONFIGURACION: "configuracion",
};

const routeMatchersByRole = {
  [DASHBOARD_ROLES.RECEPCIONISTA]: [
    /^\/dashboard$/,
    /^\/dashboard\/no-access$/,
    /^\/dashboard\/calendario$/,
    /^\/dashboard\/calendarioGeneral$/,
    /^\/dashboard\/agendaCitas$/,
    /^\/dashboard\/bloqueosAgenda$/,
    /^\/dashboard\/AgendaDetalle\/.+$/,
    /^\/dashboard\/GestionPaciente$/,
    /^\/dashboard\/paciente\/.+$/,
  ],
  [DASHBOARD_ROLES.BASICO]: [
    /^\/dashboard\/no-access$/,
    /^\/dashboard\/AgendaDetalle\/.+$/,
  ],
  [DASHBOARD_ROLES.AGENDA]: [
    /^\/dashboard\/no-access$/,
    /^\/dashboard\/calendario$/,
    /^\/dashboard\/calendarioGeneral$/,
    /^\/dashboard\/agendaCitas$/,
    /^\/dashboard\/bloqueosAgenda$/,
    /^\/dashboard\/AgendaDetalle\/.+$/,
    /^\/dashboard\/listaPacientes$/,
    /^\/dashboard\/GestionPaciente$/,
    /^\/dashboard\/FichaClinica$/,
    /^\/dashboard\/paciente\/.+$/,
    /^\/dashboard\/FichasPacientes\/.+$/,
    /^\/dashboard\/NuevaFicha\/.+$/,
    /^\/dashboard\/odontogramasPaciente\/.+$/,
    /^\/dashboard\/EdicionFicha\/.+$/,
    /^\/dashboard\/recetaPacientes\/.+$/,
  ],
  [DASHBOARD_ROLES.CONFIGURACION]: [
    /^\/dashboard\/no-access$/,
    /^\/dashboard\/portadaEdit$/,
    /^\/dashboard\/publicacionesTituloDescripcion$/,
    /^\/dashboard\/publicaciones$/,
    /^\/dashboard\/profesionales$/,
    /^\/dashboard\/ingresoProductos$/,
    /^\/dashboard\/serviciosAgendamiento$/,
    /^\/dashboard\/tarifaServicio$/,
    /^\/dashboard\/fichasClinicasPlantillas$/,
    /^\/dashboard\/fichasClinicasCategorias\/.+$/,
    /^\/dashboard\/fichaCampo\/.+$/,
    /^\/dashboard\/edicionPlantillaEspecifica\/.+$/,
    /^\/dashboard\/categoriasProductos$/,
    /^\/dashboard\/subCategorias\/.+$/,
    /^\/dashboard\/subsubcategoria\/.+$/,
    /^\/dashboard\/EspecificacionProductos\/.+$/,
    /^\/dashboard\/examenesClinicos$/,
  ],
};

function sanitizePathname(pathname = "") {
  const basePath = String(pathname || "").split("?")[0].split("#")[0] || "/";

  if (basePath === "/") return "/";
  return basePath.replace(/\/+$/, "");
}

export function normalizeDashboardRole(role) {
  const roleValue = String(role || "").trim().toLowerCase();
  return Object.values(DASHBOARD_ROLES).includes(roleValue) ? roleValue : null;
}

export function canAccessDashboardPath(role, pathname) {
  const normalizedRole = normalizeDashboardRole(role);
  const cleanPath = sanitizePathname(pathname);

  if (!normalizedRole || normalizedRole === DASHBOARD_ROLES.ADMIN) {
    return true;
  }

  const matchers = routeMatchersByRole[normalizedRole] || [];
  return matchers.some((matcher) => matcher.test(cleanPath));
}
