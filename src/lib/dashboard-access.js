export const DASHBOARD_ROLES = {
  DEFAULT: "default",
  ADMIN: "admin",
  RECEPCIONISTA: "recepcionista",
  BASICO: "basico",
  AGENDA: "agenda",
  CONFIGURACION: "configuracion",
};

export const DASHBOARD_NAV_SECTIONS = [
  {
    title: "Inicio",
    icon: "home",
    items: [{ href: "/dashboard", label: "Panel de Reservas" }],
  },
  {
    title: "Agenda",
    icon: "calendar",
    items: [
      { href: "/dashboard/calendario", label: "Crear Reserva" },
      { href: "/dashboard/calendarioGeneral", label: "Calendario General" },
      { href: "/dashboard/bloqueosAgenda", label: "Bloquear Horarios" },
    ],
  },
  {
    title: "Pacientes y Fichas",
    icon: "user",
    items: [
      { href: "/dashboard/listaPacientes", label: "Ver Pacientes" },
      { href: "/dashboard/GestionPaciente", label: "Registrar Paciente" },
      { href: "/dashboard/FichaClinica", label: "Ficha Clínica" },
    ],
  },
  {
    title: "Documentos",
    icon: "document",
    items: [
      { href: "/dashboard/presupuestoTratamiento", label: "Presupuesto de Tratamiento" },
      { href: "/dashboard/recetaRapida", label: "Receta Médica" },
      { href: "/dashboard/recetaLentes", label: "Receta de Lentes" },
      { href: "/dashboard/examenDocumento", label: "Orden de Exámenes" },
    ],
  },
  {
    title: "Contenido web",
    icon: "image",
    items: [
      { href: "/dashboard/portadaEdit", label: "Banners de Portada" },
      { href: "/dashboard/publicacionesTituloDescripcion", label: "Tratamientos Destacados" },
      { href: "/dashboard/publicaciones", label: "Publicaciones Web" },
    ],
  },
  {
    title: "Configuración Clínica",
    icon: "settings",
    items: [
      { href: "/dashboard/profesionales", label: "Profesionales y Agendas" },
      { href: "/dashboard/ingresoProductos", label: "Catálogo de Servicios" },
      { href: "/dashboard/serviciosAgendamiento", label: "Servicios Agendables" },
      { href: "/dashboard/tarifaServicio", label: "Tarifas de Consulta" },
      { href: "/dashboard/fichasClinicasPlantillas", label: "Plantillas de Fichas" },
      { href: "/dashboard/categoriasProductos", label: "Categorías de Servicios" },
      { href: "/dashboard/examenesClinicos", label: "Catálogo de Exámenes" },
    ],
  },
];

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
    /^\/dashboard$/,
    /^\/dashboard\/no-access$/,
    /^\/dashboard\/calendario$/,
    /^\/dashboard\/calendarioGeneral$/,
    /^\/dashboard\/bloqueosAgenda$/,
    /^\/dashboard\/AgendaDetalle\/.+$/,
    /^\/dashboard\/listaPacientes$/,
    /^\/dashboard\/GestionPaciente$/,
    /^\/dashboard\/FichaClinica$/,
    /^\/dashboard\/paciente\/.+$/,
    /^\/dashboard\/FichasPacientes\/.+$/,
    /^\/dashboard\/NuevaFicha\/.+$/,
    /^\/dashboard\/EdicionFicha\/.+$/,
    /^\/dashboard\/portadaEdit$/,
    /^\/dashboard\/publicacionesTituloDescripcion$/,
    /^\/dashboard\/publicaciones$/,
    /^\/dashboard\/edicionPagina$/,
    /^\/dashboard\/profesionales$/,
    /^\/dashboard\/serviciosAgendamiento$/,
    /^\/dashboard\/tarifaServicio$/,
    /^\/dashboard\/edicionPlantillaEspecifica\/.+$/,
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
  if (roleValue === DASHBOARD_ROLES.DEFAULT) {
    return DASHBOARD_ROLES.ADMIN;
  }
  return Object.values(DASHBOARD_ROLES).includes(roleValue) ? roleValue : null;
}

export function getDashboardRoleFromClaims(claims) {
  if (!claims || typeof claims !== "object") return null;

  const role =
    claims?.metadata?.role ??
    claims?.publicMetadata?.role ??
    claims?.public_metadata?.role ??
    claims?.unsafeMetadata?.role ??
    claims?.unsafe_metadata?.role ??
    null;

  return normalizeDashboardRole(role);
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

export function getDashboardSectionsForRole(role) {
  return DASHBOARD_NAV_SECTIONS
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => canAccessDashboardPath(role, item.href)),
    }))
    .filter((section) => section.items.length > 0);
}

export function isBasicDashboardRole(role) {
  return normalizeDashboardRole(role) === DASHBOARD_ROLES.BASICO;
}
