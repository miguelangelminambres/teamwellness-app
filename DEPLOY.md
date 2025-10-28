# 🚀 CÓMO DESPLEGAR TEAMWELLNESS EN VERCEL

## Paso 1: Subir a GitHub

### 1.1 Crear repositorio en GitHub
```bash
# En tu terminal local
cd teamwellness
git init
git add .
git commit -m "Initial commit - TeamWellness MVP"
```

### 1.2 Crear repo en GitHub.com
1. Ve a https://github.com/new
2. Nombre del repo: `teamwellness`
3. Descripción: "Sistema profesional de wellness para equipos deportivos"
4. Público o Privado (tu elección)
5. NO inicialices con README (ya lo tienes)
6. Crear repositorio

### 1.3 Push al repositorio
```bash
git remote add origin https://github.com/TU-USUARIO/teamwellness.git
git branch -M main
git push -u origin main
```

---

## Paso 2: Desplegar en Vercel

### Opción A: Desde la Web (Más fácil)

1. **Ir a Vercel**
   - https://vercel.com
   - Login con GitHub

2. **Nuevo Proyecto**
   - Click en "Add New Project"
   - Import desde GitHub
   - Selecciona `teamwellness`

3. **Configurar**
   - Framework Preset: **Other**
   - Root Directory: `./`
   - Build Command: (dejar vacío)
   - Output Directory: (dejar vacío)

4. **Deploy**
   - Click "Deploy"
   - Espera 30-60 segundos
   - ¡Listo! 🎉

### Opción B: Con Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd teamwellness
vercel

# Seguir instrucciones interactivas
# Confirmar todo con Enter
```

---

## Paso 3: Configurar Dominio (Opcional)

1. En Vercel, ve a tu proyecto
2. Settings → Domains
3. Añade tu dominio personalizado
4. Sigue instrucciones para configurar DNS

---

## 🔧 Troubleshooting

### Problema: "404 Not Found"
**Solución:** Asegúrate de que `index.html` está en la raíz del proyecto

### Problema: "Assets not loading"
**Solución:** Verifica rutas relativas en HTML (`js/data.js` no `/js/data.js`)

### Problema: "LocalStorage no funciona"
**Solución:** Abre en HTTPS (Vercel da HTTPS automático)

---

## 📱 URLs de tu Deploy

Tendrás 3 URLs:
1. **Producción**: `https://teamwellness.vercel.app`
2. **Inicio**: `/index.html` o `/`
3. **Entrenador**: `/entrenador.html`
4. **Jugador**: `/jugador.html`

---

## 🔄 Actualizar Deploy

Cada vez que hagas push a GitHub, Vercel re-despliega automáticamente:

```bash
git add .
git commit -m "Feature: X"
git push
```

¡Espera 30 segundos y está live! 🚀

---

## 🎯 Post-Deploy Checklist

- [ ] Probar login entrenador
- [ ] Activar licencia de demo
- [ ] Añadir jugadores
- [ ] Probar login jugador
- [ ] Completar check-in
- [ ] Verificar dashboard
- [ ] Probar en móvil

---

## 📊 Analytics (Opcional)

Para añadir analytics:
1. Vercel → Tu Proyecto → Analytics
2. Enable Analytics
3. Ver estadísticas de uso

---

## 🔐 Variables de Entorno (Futuro)

Para v2 con backend:
```bash
# .env.local
DATABASE_URL=...
API_KEY=...
```

---

¡Listo! Tu app está online y lista para comercializar 💪
