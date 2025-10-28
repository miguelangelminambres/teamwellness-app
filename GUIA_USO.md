# 📖 GUÍA DE USO - TEAMWELLNESS

## 🎯 Para Entrenadores

### Primer Uso: Activar Licencia

1. **Accede a `/entrenador.html`**
2. **Click en "Activar Licencia"**
3. **Introduce:**
   - Código de licencia (ej: `TWEL-2025-DEMO`)
   - Nombre del equipo (ej: "CD Sevilla")
   - Tu nombre (ej: "Juan Martínez")
   - Crea una contraseña segura
4. **Click "Activar Licencia"**
5. **¡Listo!** Ahora estás en el panel del entrenador

### Añadir Jugadores

1. **Ve a la pestaña "Gestión Jugadores"**
2. **Click "➕ Añadir Jugador"**
3. **Introduce:**
   - Nombre completo (ej: "Miguel Ruiz")
   - Dorsal (ej: 10)
   - Posición (opcional: "Delantero")
4. **Click "Añadir Jugador"**
5. **Se genera automáticamente un PIN de 4 dígitos**
6. **Comparte el nombre y PIN con el jugador**

💡 **Tip:** Puedes regenerar el PIN si el jugador lo olvida

### Dashboard: Ver Estado del Equipo

1. **Pestaña "Dashboard"** (activa por defecto)
2. **Verás:**
   - 📊 Estadísticas en tiempo real
   - 👥 Cards de cada jugador con su estado
   - 🟢 🟡 🔴 Código de colores
3. **Filtrar jugadores:**
   - Todos
   - Pendientes (no han completado check-in)
   - Disponibles
   - Con precaución
   - Advertencia
   - Críticos

### Ver Detalles de un Jugador

1. **Click "Ver Detalles" en cualquier card**
2. **Verás:**
   - PIN del jugador
   - Posición
   - Últimos 7 check-ins
   - Evolución de su estado
   - Comentarios que haya puesto

### Gestionar Alertas

1. **Pestaña "Alertas"**
2. **Verás alertas de:**
   - 🔴 Dolor crítico (9-10/10)
   - 🟠 Dolor fuerte (7-8/10)
   - 📉 Estado físico muy bajo
   - 💤 Poco sueño
3. **Click "✓ Resolver" para marcar como resuelta**

### Configuración

1. **Click "⚙️ Configuración"**
2. **Cambia:**
   - Hora límite para check-in (ej: 17:00)
3. **Guarda cambios**

---

## 👤 Para Jugadores

### Primer Acceso

1. **Accede a `/jugador.html`**
2. **Introduce el código del equipo**
   - Te lo da tu entrenador (ej: `TWEL-2025-DEMO`)
3. **Click "Siguiente →"**
4. **Selecciona tu nombre del dropdown**
5. **Introduce tu PIN de 4 dígitos**
   - Te lo da tu entrenador
6. **Click "🔓 Acceder"**

### Completar Check-in Diario

#### 1️⃣ Estado Físico
- Mueve el slider de 1 a 10
- 1 = Fatal 😱
- 10 = Perfecto 🤩

#### 2️⃣ Zonas de Dolor
- **¿Tienes dolor?** Activa el switch
- **Click en las zonas del cuerpo** donde duela
- **Indica intensidad** del dolor (1-10) para cada zona
- Puedes seleccionar múltiples zonas

#### 3️⃣ Estado Mental
- Slider 1-10
- ¿Cómo está tu ánimo/motivación?

#### 4️⃣ Nivel de Fatiga
- Slider 1-10
- ¿Cuánta energía tienes?

#### 5️⃣ Horas de Sueño
- Número (0-14 horas)
- ¿Cuántas horas dormiste anoche?

#### 6️⃣ Hidratación
- Bien / Regular / Mal

#### 7️⃣ Comentarios (Opcional)
- Escribe detalles adicionales
- Ejemplo: "Me duele al correr", "Mejoré desde ayer"

#### ✅ Enviar
- Click "✅ ENVIAR CHECK-IN"
- ¡Listo! Tu entrenador ya ve tu estado

### Importante

⏰ **Completa el check-in antes de la hora límite**
- Verás un reloj en tiempo real
- Te avisa cuando queda poco tiempo
- Si es verde: Todo bien
- Si es amarillo: Date prisa
- Si es rojo: ¡Última oportunidad!

📱 **Solo puedes hacer 1 check-in por día**
- Una vez enviado, ya está
- No puedes editar (en esta versión)

---

## 🔐 Códigos de Licencia Demo

Para probar la aplicación:
- `TWEL-2025-0001`
- `TWEL-2025-0002`
- `TWEL-2025-0003`
- `TWEL-2025-DEMO`

---

## 💡 Consejos y Mejores Prácticas

### Para Entrenadores:

✅ **Añade jugadores ANTES del entrenamiento**
- Crea toda la plantilla con tiempo
- Comparte PINs por WhatsApp/email

✅ **Revisa el dashboard 30min antes del entrenamiento**
- Identifica quién no ha completado check-in
- Contacta a los pendientes
- Ve quién tiene dolores

✅ **Usa las alertas**
- Presta atención a jugadores en rojo
- Modifica entrenamientos según estado
- Habla con jugadores con dolor persistente

✅ **Configura la hora límite correcta**
- Ejemplo: Si entrenas a las 18:00
- Pon límite a las 17:00
- Así tienes 1h para revisar

### Para Jugadores:

✅ **Sé honesto con tu estado**
- No minimices dolores
- El entrenador necesita saberlo
- Te ayuda a prevenir lesiones

✅ **Completa el check-in con calma**
- Toma 2 minutos
- Piensa bien cómo te sientes
- Lee bien las preguntas

✅ **Usa los comentarios**
- Añade detalles importantes
- Ejemplo: "Mejoré desde ayer"
- "El dolor es solo al saltar"

✅ **Hazlo siempre a la misma hora**
- Crea rutina
- Ej: Todos los días al despertar
- O 2h antes del entrenamiento

---

## ❓ Preguntas Frecuentes

### Olvidé mi PIN, ¿qué hago?
→ Habla con tu entrenador. Él puede regenerar tu PIN.

### ¿Puedo editar un check-in ya enviado?
→ En esta versión MVP, no. Asegúrate antes de enviar.

### ¿Los datos son privados?
→ Sí. Solo tu entrenador ve tus datos. Guardados localmente en el navegador.

### ¿Funciona sin internet?
→ Sí, una vez cargada la página. Usa localStorage del navegador.

### ¿Puedo usar la app en varios dispositivos?
→ Los datos están en cada dispositivo por separado (por ahora).

### ¿Qué pasa si no completo el check-in?
→ Apareces como "Pendiente" en el dashboard del entrenador.

### ¿Puedo ver check-ins de otros jugadores?
→ No. Solo ves tus propios datos.

### Mi entrenador puede ver mis comentarios?
→ Sí. Todo lo que pongas en el check-in lo ve el entrenador.

---

## 🆘 Soporte

Si tienes problemas:
1. Revisa esta guía primero
2. Consulta con tu entrenador
3. Contacta soporte: [tu-email@ejemplo.com]

---

## 🎯 Casos de Uso Reales

### Caso 1: Jugador con Molestia
**Situación:** Miguel tiene dolor de rodilla leve

**Check-in:**
- Estado físico: 6/10
- Activa dolor: Sí
- Selecciona: Rodilla Derecha
- Intensidad: 5/10
- Comentarios: "Molestia al correr, pero puedo entrenar"

**Resultado:** Aparece en amarillo en dashboard. Entrenador lo ve y decide modificar ejercicios.

### Caso 2: Jugador Lesionado
**Situación:** Carlos se lesionó ayer

**Check-in:**
- Estado físico: 3/10
- Activa dolor: Sí
- Selecciona: Tobillo Izquierdo
- Intensidad: 9/10
- Comentarios: "Torcedura ayer, muy hinchado"

**Resultado:** 
- Aparece en ROJO en dashboard
- Se genera alerta crítica automática
- Entrenador lo ve inmediatamente
- Carlos no entrena ese día

### Caso 3: Equipo Cansado
**Situación:** Semana con 3 partidos

**Check-ins del equipo:**
- 15 jugadores: Fatiga 7-8/10
- 8 jugadores: Sueño < 6h
- 5 jugadores: Estado físico 5-6/10

**Resultado:**
- Entrenador ve la tendencia
- Decide hacer entrenamiento suave
- Prioriza recuperación

---

¡Disfruta de TeamWellness! 💪⚽
