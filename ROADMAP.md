# 🚀 TEAMWELLNESS - ROADMAP DE DESARROLLO

## ✅ FASE 1: ESTRUCTURA BASE (En progreso)
- [x] Pantalla de inicio con selección de rol
- [ ] Sistema de licencias por equipo
- [ ] Panel del entrenador completo
- [ ] App del jugador actualizada

## 📋 MÓDULOS A CREAR:

### 1. SISTEMA DE LICENCIAS
- Activación con código único
- Una licencia = un equipo
- Datos encriptados por equipo
- Contraseña de entrenador personalizada

### 2. PANEL DEL ENTRENADOR
Pantallas:
- Login entrenador
- Setup inicial del equipo
- Gestión de plantilla (CRUD jugadores)
- Generador automático de PINs
- Dashboard en tiempo real
- Vista individual de jugadores
- Estadísticas del equipo
- Alertas y notificaciones
- Historial completo
- Configuración (hora límite, etc)
- Exportar reportes

### 3. APP DEL JUGADOR
- Login con dropdown de nombres + PIN
- Check-in diario completo
- Solo acceso a datos propios
- Historial personal
- Alertas de hora límite

### 4. SISTEMA DE DATOS
- localStorage separado por equipo
- Estructura optimizada
- Backup y restauración
- Exportación a CSV/Excel

## 🎯 FUNCIONALIDADES CLAVE:

### Dashboard Entrenador:
- Vista general del equipo (cards de estado)
- Filtros: Todos / Disponibles / Con molestias / Lesionados / Pendientes
- Contador de check-ins completados
- Alertas de dolores persistentes
- Gráficos de evolución

### Gestión de Jugadores:
- Añadir jugador (nombre, dorsal, posición)
- Generar PIN automático (4 dígitos únicos)
- Editar datos
- Desactivar/Activar jugador
- Ver historial individual
- Estadísticas personales

### Alertas Inteligentes:
- Dolor 9-10: Alerta crítica
- Dolor 7-8 en zona importante: Alerta moderada
- Dolor persistente 3+ días: Alerta
- Jugador no completa check-in: Notificación

### Estadísticas:
- Disponibilidad del equipo (%)
- Zonas más afectadas
- Jugadores con más lesiones
- Evolución semanal/mensual
- Comparativas

## 💰 MODELO DE LICENCIAS:

Código de licencia incluye:
- ID único del equipo
- Fecha de activación
- Fecha de expiración
- Máximo de jugadores (30)

Formato: TWEL-2025-XXXX

## 🎨 DISEÑO:

Colores principales:
- Azul: #667eea (primario)
- Morado: #764ba2 (secundario)
- Verde: #10b981 (disponible)
- Amarillo: #fbbf24 (advertencia)
- Rojo: #ef4444 (crítico)

## 📱 RESPONSIVE:

- Mobile first
- Breakpoints: 768px, 1024px
- Touch optimizado
- Swipe en móvil

## 🔐 SEGURIDAD:

- Datos por equipo separados
- PINs únicos de 4 dígitos
- Contraseña entrenador encriptada
- No se mezclan datos entre equipos
- Validación en cliente

## 📊 EXPORTACIÓN:

Formatos:
- PDF: Reportes profesionales
- CSV: Datos para análisis
- Excel: Tablas completas

## 🚀 TIMELINE ESTIMADO:

- Panel Entrenador: 2-3 horas
- App Jugador actualizada: 1 hora
- Sistema licencias: 1 hora
- Testing y pulido: 1 hora
- Documentación: 30 min

TOTAL: ~6 horas de desarrollo

## 💡 FEATURES FUTURAS (v2):

- Notificaciones push
- Sincronización entre dispositivos
- App móvil nativa
- Integración con wearables
- IA para predicción de lesiones
- Chat entrenador-jugador
- Plan de recuperación
- Biblioteca de ejercicios

