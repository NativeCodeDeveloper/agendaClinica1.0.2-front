# Roles y permisos del dashboard

Este proyecto usa Clerk para autenticar usuarios y un sistema interno de permisos por rol para controlar:

- Qué rutas de `/dashboard` puede abrir cada usuario
- Qué opciones ve en el menú lateral y móvil
- Qué acciones puntuales se muestran dentro de algunas pantallas

## Dónde están los permisos

La lógica principal está en:

- [src/lib/dashboard-access.js](/Users/nicolas/Documents/proyectos/AgendaClinica/Multiple/ACV1.0.2/frontend/src/lib/dashboard-access.js:1)
- [src/middleware.ts](/Users/nicolas/Documents/proyectos/AgendaClinica/Multiple/ACV1.0.2/frontend/src/middleware.ts:1)
- [src/app/dashboard/layout.jsx](/Users/nicolas/Documents/proyectos/AgendaClinica/Multiple/ACV1.0.2/frontend/src/app/dashboard/layout.jsx:1)
- [src/app/dashboard/MobileNav.jsx](/Users/nicolas/Documents/proyectos/AgendaClinica/Multiple/ACV1.0.2/frontend/src/app/dashboard/MobileNav.jsx:1)
- [src/app/dashboard/FichasPacientes/[id_paciente]/page.jsx](/Users/nicolas/Documents/proyectos/AgendaClinica/Multiple/ACV1.0.2/frontend/src/app/dashboard/FichasPacientes/[id_paciente]/page.jsx:1)
- [src/types/globals.d.ts](/Users/nicolas/Documents/proyectos/AgendaClinica/Multiple/ACV1.0.2/frontend/src/types/globals.d.ts:1)

## Cómo funciona

### 1. Clerk guarda el rol

Cada usuario debe tener en `Public metadata` de Clerk algo como:

```json
{
  "role": "basico"
}
```

### 2. El sistema lee el rol

El archivo `src/lib/dashboard-access.js`:

- Define los roles válidos en `DASHBOARD_ROLES`
- Define qué rutas puede abrir cada rol en `routeMatchersByRole`
- Define qué secciones del menú existen en `DASHBOARD_NAV_SECTIONS`
- Expone helpers para decidir acceso a rutas, menú y acciones internas

### 3. Middleware protege rutas

El archivo `src/middleware.ts`:

- Detecta si la ruta pertenece a `/dashboard`
- Obtiene el usuario autenticado desde Clerk
- Lee su `publicMetadata.role`
- Valida la ruta con `canAccessDashboardPath(role, pathname)`
- Si no tiene permiso, redirige a `/dashboard/no-access`

### 4. El layout filtra el menú

El archivo `src/app/dashboard/layout.jsx`:

- Obtiene el usuario actual desde Clerk
- Lee su rol
- Construye el menú lateral usando `getDashboardSectionsForRole(role)`

El archivo `src/app/dashboard/MobileNav.jsx` hace lo mismo para el menú móvil.

### 5. Algunas pantallas tienen permisos extra

El archivo `src/app/dashboard/FichasPacientes/[id_paciente]/page.jsx` usa helpers para ocultar botones según el rol:

- `canAccessOdontograma(role)`
- `canAccessRecetasEnFicha(role)`

Esto controla, por ejemplo:

- Botón `Ver Odontograma`
- Botón `Generar Receta Medica`

## Roles disponibles

### `default`

- Acceso total
- Se normaliza internamente como administrador

### `admin`

- Acceso total

### `recepcionista`

Puede acceder a:

- `/dashboard`
- `/dashboard/calendario`
- `/dashboard/calendarioGeneral`
- `/dashboard/agendaCitas`
- `/dashboard/bloqueosAgenda`
- `/dashboard/AgendaDetalle/[id_reserva]`
- `/dashboard/GestionPaciente`
- `/dashboard/paciente/[id_paciente]`

### `secretaria`

Puede acceder a:

- `/dashboard`
- `/dashboard/calendario`
- `/dashboard/calendarioGeneral`
- `/dashboard/agendaCitas`
- `/dashboard/bloqueosAgenda`
- `/dashboard/AgendaDetalle/[id_reserva]`
- `/dashboard/GestionPaciente`
- `/dashboard/paciente/[id_paciente]`

### `basico`

Puede acceder a:

- `/dashboard`
- `/dashboard/calendario`
- `/dashboard/calendarioGeneral`
- `/dashboard/bloqueosAgenda`
- `/dashboard/AgendaDetalle/[id_reserva]`
- `/dashboard/listaPacientes`
- `/dashboard/GestionPaciente`
- `/dashboard/FichaClinica`
- `/dashboard/paciente/[id_paciente]`
- `/dashboard/FichasPacientes/[id_paciente]`
- `/dashboard/NuevaFicha/[id_paciente]`
- `/dashboard/EdicionFicha/[id_ficha]`
- `/dashboard/portadaEdit`
- `/dashboard/publicacionesTituloDescripcion`
- `/dashboard/publicaciones`
- `/dashboard/edicionPagina`
- `/dashboard/profesionales`
- `/dashboard/serviciosAgendamiento`
- `/dashboard/tarifaServicio`
- `/dashboard/edicionPlantillaEspecifica/[id_plantilla]`

No puede usar:

- Recetas
- Exámenes
- Odontogramas
- Receta de lentes

### `centro-estetico`

Tiene lo mismo que `basico` y además:

- `/dashboard/ingresoProductos`
- `/dashboard/categoriasProductos`

No puede usar:

- Recetas
- Exámenes
- Odontogramas
- Receta de lentes

### `clinico-medico`

Tiene una base similar a `basico` y además:

- `/dashboard/recetaPacientes/[id_paciente]`
- `/dashboard/recetaRapida`
- `/dashboard/examenDocumento`

Puede ver en fichas:

- Botón `Generar Receta Medica`

No puede usar:

- Odontogramas
- `/dashboard/ingresoProductos`
- `/dashboard/categoriasProductos`
- `/dashboard/recetaLentes`
- Configuración avanzada de fichas

### `odontologico`

Tiene lo mismo que `clinico-medico` y además:

- `/dashboard/odontogramasPaciente/[id_paciente]`
- `/dashboard/ingresoProductos`
- `/dashboard/categoriasProductos`

Puede ver en fichas:

- Botón `Generar Receta Medica`
- Botón `Ver Odontograma`

No puede usar:

- `/dashboard/recetaLentes`

### `oftalmologia`

Tiene lo mismo que `clinico-medico` y además:

- `/dashboard/recetaLentes`

No puede usar:

- Odontogramas
- `/dashboard/ingresoProductos`
- `/dashboard/categoriasProductos`

### `agenda`

Puede acceder a agenda y flujos clínicos operativos:

- `/dashboard/calendario`
- `/dashboard/calendarioGeneral`
- `/dashboard/agendaCitas`
- `/dashboard/bloqueosAgenda`
- `/dashboard/AgendaDetalle/[id_reserva]`
- `/dashboard/listaPacientes`
- `/dashboard/GestionPaciente`
- `/dashboard/FichaClinica`
- `/dashboard/paciente/[id_paciente]`
- `/dashboard/FichasPacientes/[id_paciente]`
- `/dashboard/NuevaFicha/[id_paciente]`
- `/dashboard/odontogramasPaciente/[id_paciente]`
- `/dashboard/EdicionFicha/[id_ficha]`
- `/dashboard/recetaPacientes/[id_paciente]`

### `configuracion`

Puede acceder a módulos de configuración:

- `/dashboard/portadaEdit`
- `/dashboard/publicacionesTituloDescripcion`
- `/dashboard/publicaciones`
- `/dashboard/profesionales`
- `/dashboard/ingresoProductos`
- `/dashboard/serviciosAgendamiento`
- `/dashboard/tarifaServicio`
- `/dashboard/fichasClinicasPlantillas`
- `/dashboard/fichasClinicasCategorias/[id_plantilla]`
- `/dashboard/fichaCampo/[id_categoria]`
- `/dashboard/edicionPlantillaEspecifica/[id_plantilla]`
- `/dashboard/categoriasProductos`
- `/dashboard/subCategorias/[id]`
- `/dashboard/subsubcategoria/[id]`
- `/dashboard/EspecificacionProductos/[id]`
- `/dashboard/examenesClinicos`

## Cómo agregar o cambiar un rol

Para modificar permisos:

1. Agregar el rol en `DASHBOARD_ROLES` dentro de `src/lib/dashboard-access.js`
2. Agregar sus rutas permitidas en `routeMatchersByRole`
3. Si debe cambiar botones internos, ajustar helpers como `canAccessOdontograma` o `canAccessRecetasEnFicha`
4. Agregar el literal del rol en `src/types/globals.d.ts`
5. Probar con `npm run build`

## Notas

- Si el usuario cambia de rol en Clerk y sigue viendo permisos viejos, debe cerrar sesión y volver a entrar.
- El menú visible depende del mismo mapa de rutas, por eso al habilitar o quitar una ruta el menú también cambia.
