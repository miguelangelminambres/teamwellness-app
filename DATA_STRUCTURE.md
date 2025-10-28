# 📊 ESTRUCTURA DE DATOS - TEAMWELLNESS

## 🗂️ LocalStorage Keys:

```javascript
// Por equipo (usando teamId)
'teamwellness_team_{teamId}' = {
  teamId: "UUID",
  licenseCode: "TWEL-2025-0001",
  teamName: "CD Sevilla",
  sport: "Fútbol",
  coachName: "Juan Martínez",
  coachPassword: "hash_bcrypt",
  createdAt: "2025-01-15T10:00:00Z",
  activatedAt: "2025-01-15T10:00:00Z",
  expiresAt: "2025-12-15T10:00:00Z",
  maxPlayers: 30,
  settings: {
    deadlineHour: 17,
    deadlineMinutes: 0,
    trainingDays: [1, 3, 5], // Lunes, Miércoles, Viernes
    timezone: "Europe/Madrid"
  }
}

'teamwellness_players_{teamId}' = [
  {
    id: "UUID",
    name: "Miguel Ruiz",
    number: 10,
    position: "Delantero",
    pin: "1234",
    active: true,
    createdAt: "2025-01-15T10:00:00Z",
    lastCheckIn: "2025-01-20T16:30:00Z"
  },
  // ... más jugadores
]

'teamwellness_checkins_{teamId}' = [
  {
    id: "UUID",
    playerId: "UUID",
    playerName: "Miguel Ruiz",
    playerNumber: 10,
    date: "2025-01-20T16:30:45Z",
    submitTime: "16:30",
    onTime: true,
    data: {
      physicalState: 7,
      hasPain: true,
      painZones: {
        "rodilla-der": {label: "Rodilla Der.", intensity: 8},
        "tobillo-izq": {label: "Tobillo Izq.", intensity: 4}
      },
      mentalState: 8,
      fatigueLevel: 6,
      sleepHours: 7,
      hydration: "good",
      comments: "Molestia al correr"
    }
  },
  // ... más check-ins
]

'teamwellness_alerts_{teamId}' = [
  {
    id: "UUID",
    playerId: "UUID",
    playerName: "Miguel Ruiz",
    type: "severe_pain", // severe_pain, persistent_pain, missed_checkin
    severity: "high", // low, medium, high, critical
    message: "Dolor fuerte en rodilla derecha (8/10)",
    date: "2025-01-20T16:30:45Z",
    read: false,
    resolved: false
  },
  // ... más alertas
]

// Session actual
'teamwellness_current_session' = {
  type: "coach" | "player",
  teamId: "UUID",
  userId: "UUID", // coachId o playerId
  loginTime: "2025-01-20T15:00:00Z"
}
```

## 📈 ÍNDICES Y CONSULTAS COMUNES:

### Dashboard del Entrenador:
```javascript
// Check-ins de hoy
getCheckInsToday(teamId) {
  const today = new Date().toDateString();
  return checkIns.filter(c => 
    c.teamId === teamId && 
    new Date(c.date).toDateString() === today
  );
}

// Jugadores que NO han completado check-in hoy
getPendingPlayers(teamId) {
  const todayCheckIns = getCheckInsToday(teamId);
  const completedIds = todayCheckIns.map(c => c.playerId);
  return players.filter(p => 
    p.active && 
    !completedIds.includes(p.id)
  );
}

// Jugadores con dolor
getPlayersWithPain(teamId, minIntensity = 7) {
  const todayCheckIns = getCheckInsToday(teamId);
  return todayCheckIns.filter(c => {
    if (!c.data.hasPain) return false;
    const maxPain = Math.max(...Object.values(c.data.painZones).map(z => z.intensity));
    return maxPain >= minIntensity;
  });
}

// Estadísticas del equipo
getTeamStats(teamId, days = 7) {
  const since = new Date();
  since.setDate(since.getDate() - days);
  
  const recentCheckIns = checkIns.filter(c => 
    c.teamId === teamId && 
    new Date(c.date) >= since
  );
  
  return {
    totalCheckIns: recentCheckIns.length,
    avgPhysicalState: avg(recentCheckIns.map(c => c.data.physicalState)),
    avgMentalState: avg(recentCheckIns.map(c => c.data.mentalState)),
    avgSleepHours: avg(recentCheckIns.map(c => c.data.sleepHours)),
    playersWithPain: recentCheckIns.filter(c => c.data.hasPain).length,
    mostAffectedZones: getMostAffectedZones(recentCheckIns)
  };
}
```

## 🔐 CÓDIGOS DE LICENCIA:

Formato: `TWEL-YYYY-NNNN`
- TWEL = TeamWellness
- YYYY = Año
- NNNN = Número secuencial

Ejemplo: `TWEL-2025-0001`

### Generador de códigos:
```javascript
function generateLicenseCode() {
  const year = new Date().getFullYear();
  const sequence = getNextSequence(); // 0001, 0002, etc.
  return `TWEL-${year}-${sequence.toString().padStart(4, '0')}`;
}
```

## 🎯 CÓDIGOS PIN DE JUGADORES:

- 4 dígitos únicos
- No repetidos en el mismo equipo
- Generados automáticamente

```javascript
function generateUniquePin(existingPins) {
  let pin;
  do {
    pin = Math.floor(1000 + Math.random() * 9000).toString();
  } while (existingPins.includes(pin));
  return pin;
}
```

## 📊 ESTADOS Y COLORES:

### Estado del Jugador:
```javascript
function getPlayerStatus(checkIn) {
  if (!checkIn) return {status: 'pending', color: 'gray'};
  
  const physical = checkIn.data.physicalState;
  const maxPain = checkIn.data.hasPain ? 
    Math.max(...Object.values(checkIn.data.painZones).map(z => z.intensity)) : 0;
  
  if (maxPain >= 9 || physical <= 3) {
    return {status: 'critical', color: 'red', icon: '🔴'};
  } else if (maxPain >= 7 || physical <= 5) {
    return {status: 'warning', color: 'orange', icon: '🟠'};
  } else if (maxPain >= 4 || physical <= 7) {
    return {status: 'caution', color: 'yellow', icon: '🟡'};
  } else {
    return {status: 'good', color: 'green', icon: '🟢'};
  }
}
```

## 🔔 SISTEMA DE ALERTAS:

### Tipos de Alertas:
1. **severe_pain**: Dolor 9-10 en cualquier zona
2. **persistent_pain**: Dolor 7+ durante 3+ días consecutivos en misma zona
3. **declined_state**: Estado físico bajando 3+ puntos en 3 días
4. **missed_checkin**: No completó check-in antes de hora límite
5. **low_sleep**: Menos de 5 horas de sueño 3+ días consecutivos

### Prioridades:
- **Critical**: Requiere acción inmediata
- **High**: Requiere atención pronto
- **Medium**: Monitorear
- **Low**: Informativo

