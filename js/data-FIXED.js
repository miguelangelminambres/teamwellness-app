// ============================================
// TEAMWELLNESS - SISTEMA DE GESTIÓN DE DATOS
// ============================================

// Generador de IDs únicos
function generateId() {
    return 'tw_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Generador de PIN único
function generateUniquePin(existingPins = []) {
    let pin;
    do {
        pin = Math.floor(1000 + Math.random() * 9000).toString();
    } while (existingPins.includes(pin));
    return pin;
}

// ============================================
// GESTIÓN DE EQUIPOS
// ============================================

class TeamManager {
    constructor() {
        this.prefix = 'teamwellness_';
    }

    // Activar nueva licencia
    activateLicense(licenseCode, teamName, coachName, password) {
        console.log('🔍 Validando licencia:', licenseCode);
        
        // Validar código de licencia (formato: TWEL-2025-XXXX)
        const validCodes = this.getValidLicenseCodes();
        if (!validCodes.includes(licenseCode)) {
            throw new Error('Código de licencia inválido');
        }

        // Verificar si ya está en uso (permitir re-activar DEMO)
        if (this.isLicenseUsed(licenseCode) && !licenseCode.includes('DEMO')) {
            throw new Error('Esta licencia ya está en uso');
        }
        
        // Si es DEMO y ya existe, eliminar el anterior
        if (licenseCode.includes('DEMO')) {
            console.log('🔄 Limpiando licencia DEMO anterior si existe...');
            const teams = this.getAllTeams();
            teams.forEach(team => {
                if (team.licenseCode === licenseCode) {
                    localStorage.removeItem(`${this.prefix}team_${team.teamId}`);
                    localStorage.removeItem(`${this.prefix}players_${team.teamId}`);
                    localStorage.removeItem(`${this.prefix}checkins_${team.teamId}`);
                    localStorage.removeItem(`${this.prefix}alerts_${team.teamId}`);
                    console.log('🗑️ Datos anteriores eliminados');
                }
            });
        }

        const teamId = generateId();
        const now = new Date();
        const expiresAt = new Date();
        expiresAt.setFullYear(expiresAt.getFullYear() + 1); // 1 año

        const team = {
            teamId,
            licenseCode,
            teamName,
            coachName,
            coachPassword: password, // En producción: hash
            createdAt: now.toISOString(),
            activatedAt: now.toISOString(),
            expiresAt: expiresAt.toISOString(),
            maxPlayers: 30,
            settings: {
                deadlineHour: 17,
                deadlineMinutes: 0,
                trainingDays: [1, 2, 3, 4, 5], // L-V
                timezone: 'Europe/Madrid'
            }
        };

        console.log('💾 Guardando equipo en localStorage...', teamId);
        localStorage.setItem(`${this.prefix}team_${teamId}`, JSON.stringify(team));
        localStorage.setItem(`${this.prefix}players_${teamId}`, JSON.stringify([]));
        localStorage.setItem(`${this.prefix}checkins_${teamId}`, JSON.stringify([]));
        localStorage.setItem(`${this.prefix}alerts_${teamId}`, JSON.stringify([]));
        
        console.log('✅ Equipo guardado correctamente');
        return teamId;
    }

    // Obtener códigos de licencia válidos (en producción: verificar con servidor)
    getValidLicenseCodes() {
        // Por ahora, códigos de demo
        return [
            'TWEL-2025-0001',
            'TWEL-2025-0002',
            'TWEL-2025-0003',
            'TWEL-2025-0004',
            'TWEL-2025-0005',
            'TWEL-2025-DEMO'
        ];
    }

    // Verificar si licencia ya está en uso
    isLicenseUsed(licenseCode) {
        const teams = this.getAllTeams();
        return teams.some(team => team.licenseCode === licenseCode);
    }

    // Obtener todos los equipos
    getAllTeams() {
        const teams = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(`${this.prefix}team_`)) {
                const team = JSON.parse(localStorage.getItem(key));
                teams.push(team);
            }
        }
        return teams;
    }

    // Obtener equipo por ID
    getTeam(teamId) {
        const data = localStorage.getItem(`${this.prefix}team_${teamId}`);
        return data ? JSON.parse(data) : null;
    }

    // Actualizar configuración del equipo
    updateTeamSettings(teamId, settings) {
        const team = this.getTeam(teamId);
        if (!team) throw new Error('Equipo no encontrado');
        
        team.settings = { ...team.settings, ...settings };
        localStorage.setItem(`${this.prefix}team_${teamId}`, JSON.stringify(team));
        return team;
    }

    // Validar login de entrenador
    validateCoach(licenseCode, password) {
        const teams = this.getAllTeams();
        const team = teams.find(t => t.licenseCode === licenseCode);
        
        if (!team) return null;
        if (team.coachPassword !== password) return null;
        
        return team;
    }
}

// ============================================
// GESTIÓN DE JUGADORES
// ============================================

class PlayerManager {
    constructor(teamId) {
        this.teamId = teamId;
        this.prefix = 'teamwellness_';
        this.key = `${this.prefix}players_${teamId}`;
    }

    // Obtener todos los jugadores
    getAll() {
        const data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : [];
    }

    // Obtener jugador por ID
    getById(playerId) {
        const players = this.getAll();
        return players.find(p => p.id === playerId);
    }

    // Obtener jugador por nombre
    getByName(name) {
        const players = this.getAll();
        return players.find(p => p.name === name);
    }

    // Añadir jugador
    add(name, number, position = '') {
        const players = this.getAll();
        
        // Validar nombre único
        if (players.some(p => p.name.toLowerCase() === name.toLowerCase())) {
            throw new Error('Ya existe un jugador con ese nombre');
        }

        // Validar dorsal único
        if (players.some(p => p.number === number)) {
            throw new Error('Ya existe un jugador con ese dorsal');
        }

        const existingPins = players.map(p => p.pin);
        const player = {
            id: generateId(),
            name,
            number: parseInt(number),
            position,
            pin: generateUniquePin(existingPins),
            active: true,
            createdAt: new Date().toISOString(),
            lastCheckIn: null
        };

        players.push(player);
        this.save(players);
        return player;
    }

    // Actualizar jugador
    update(playerId, updates) {
        const players = this.getAll();
        const index = players.findIndex(p => p.id === playerId);
        
        if (index === -1) throw new Error('Jugador no encontrado');
        
        players[index] = { ...players[index], ...updates };
        this.save(players);
        return players[index];
    }

    // Eliminar jugador (soft delete)
    delete(playerId) {
        return this.update(playerId, { active: false });
    }

    // Regenerar PIN
    regeneratePin(playerId) {
        const players = this.getAll();
        const existingPins = players.filter(p => p.id !== playerId).map(p => p.pin);
        const newPin = generateUniquePin(existingPins);
        return this.update(playerId, { pin: newPin });
    }

    // Validar login de jugador
    validateLogin(playerName, pin) {
        const players = this.getAll();
        const player = players.find(p => 
            p.name === playerName && 
            p.pin === pin && 
            p.active
        );
        return player || null;
    }

    // Obtener jugadores activos
    getActive() {
        return this.getAll().filter(p => p.active);
    }

    // Guardar
    save(players) {
        localStorage.setItem(this.key, JSON.stringify(players));
    }
}

// ============================================
// GESTIÓN DE CHECK-INS
// ============================================

class CheckInManager {
    constructor(teamId) {
        this.teamId = teamId;
        this.prefix = 'teamwellness_';
        this.key = `${this.prefix}checkins_${teamId}`;
    }

    // Obtener todos los check-ins
    getAll() {
        const data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : [];
    }

    // Añadir check-in
    add(playerId, playerName, playerNumber, checkInData) {
        const checkIns = this.getAll();
        const now = new Date();

        const team = new TeamManager().getTeam(this.teamId);
        const deadline = new Date();
        deadline.setHours(team.settings.deadlineHour, team.settings.deadlineMinutes, 0, 0);

        const checkIn = {
            id: generateId(),
            teamId: this.teamId,
            playerId,
            playerName,
            playerNumber,
            date: now.toISOString(),
            submitTime: now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
            onTime: now <= deadline,
            data: checkInData
        };

        checkIns.push(checkIn);
        this.save(checkIns);

        // Actualizar lastCheckIn del jugador
        const playerManager = new PlayerManager(this.teamId);
        playerManager.update(playerId, { lastCheckIn: now.toISOString() });

        // Generar alertas si es necesario
        this.checkForAlerts(checkIn);

        return checkIn;
    }

    // Obtener check-ins de hoy
    getToday() {
        const today = new Date().toDateString();
        return this.getAll().filter(c => 
            new Date(c.date).toDateString() === today
        );
    }

    // Obtener check-ins de un jugador
    getByPlayer(playerId, days = 30) {
        const since = new Date();
        since.setDate(since.getDate() - days);
        
        return this.getAll().filter(c => 
            c.playerId === playerId && 
            new Date(c.date) >= since
        );
    }

    // Obtener último check-in de un jugador
    getLastByPlayer(playerId) {
        const checkIns = this.getByPlayer(playerId, 1);
        return checkIns.length > 0 ? checkIns[checkIns.length - 1] : null;
    }

    // Verificar si jugador completó check-in hoy
    hasCompletedToday(playerId) {
        const today = this.getToday();
        return today.some(c => c.playerId === playerId);
    }

    // Obtener jugadores pendientes hoy
    getPendingToday() {
        const playerManager = new PlayerManager(this.teamId);
        const players = playerManager.getActive();
        const todayCheckIns = this.getToday();
        const completedIds = todayCheckIns.map(c => c.playerId);
        
        return players.filter(p => !completedIds.includes(p.id));
    }

    // Generar alertas basadas en check-in
    checkForAlerts(checkIn) {
        const alertManager = new AlertManager(this.teamId);
        const data = checkIn.data;

        // Alerta: Dolor severo (9-10)
        if (data.hasPain) {
            Object.entries(data.painZones).forEach(([zone, info]) => {
                if (info.intensity >= 9) {
                    alertManager.add(
                        checkIn.playerId,
                        checkIn.playerName,
                        'severe_pain',
                        'critical',
                        `Dolor crítico en ${info.label} (${info.intensity}/10)`
                    );
                } else if (info.intensity >= 7) {
                    alertManager.add(
                        checkIn.playerId,
                        checkIn.playerName,
                        'high_pain',
                        'high',
                        `Dolor fuerte en ${info.label} (${info.intensity}/10)`
                    );
                }
            });
        }

        // Alerta: Estado físico muy bajo
        if (data.physicalState <= 3) {
            alertManager.add(
                checkIn.playerId,
                checkIn.playerName,
                'low_physical',
                'high',
                `Estado físico muy bajo (${data.physicalState}/10)`
            );
        }

        // Alerta: Poco sueño
        if (data.sleepHours < 5) {
            alertManager.add(
                checkIn.playerId,
                checkIn.playerName,
                'low_sleep',
                'medium',
                `Sueño insuficiente (${data.sleepHours}h)`
            );
        }
    }

    // Estadísticas
    getStats(days = 7) {
        const since = new Date();
        since.setDate(since.getDate() - days);
        
        const checkIns = this.getAll().filter(c => new Date(c.date) >= since);
        
        if (checkIns.length === 0) {
            return {
                totalCheckIns: 0,
                avgPhysicalState: 0,
                avgMentalState: 0,
                avgFatigue: 0,
                avgSleep: 0,
                playersWithPain: 0
            };
        }

        const sum = (arr) => arr.reduce((a, b) => a + b, 0);
        const avg = (arr) => arr.length > 0 ? sum(arr) / arr.length : 0;

        return {
            totalCheckIns: checkIns.length,
            avgPhysicalState: avg(checkIns.map(c => c.data.physicalState)),
            avgMentalState: avg(checkIns.map(c => c.data.mentalState)),
            avgFatigue: avg(checkIns.map(c => c.data.fatigueLevel)),
            avgSleep: avg(checkIns.map(c => c.data.sleepHours)),
            playersWithPain: checkIns.filter(c => c.data.hasPain).length
        };
    }

    // Guardar
    save(checkIns) {
        localStorage.setItem(this.key, JSON.stringify(checkIns));
    }
}

// ============================================
// GESTIÓN DE ALERTAS
// ============================================

class AlertManager {
    constructor(teamId) {
        this.teamId = teamId;
        this.prefix = 'teamwellness_';
        this.key = `${this.prefix}alerts_${teamId}`;
    }

    // Obtener todas las alertas
    getAll() {
        const data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : [];
    }

    // Añadir alerta
    add(playerId, playerName, type, severity, message) {
        const alerts = this.getAll();
        
        const alert = {
            id: generateId(),
            playerId,
            playerName,
            type,
            severity,
            message,
            date: new Date().toISOString(),
            read: false,
            resolved: false
        };

        alerts.push(alert);
        this.save(alerts);
        return alert;
    }

    // Obtener alertas no leídas
    getUnread() {
        return this.getAll().filter(a => !a.read);
    }

    // Obtener alertas activas (no resueltas)
    getActive() {
        return this.getAll().filter(a => !a.resolved);
    }

    // Marcar como leída
    markAsRead(alertId) {
        const alerts = this.getAll();
        const alert = alerts.find(a => a.id === alertId);
        if (alert) {
            alert.read = true;
            this.save(alerts);
        }
    }

    // Marcar como resuelta
    markAsResolved(alertId) {
        const alerts = this.getAll();
        const alert = alerts.find(a => a.id === alertId);
        if (alert) {
            alert.resolved = true;
            alert.read = true;
            this.save(alerts);
        }
    }

    // Guardar
    save(alerts) {
        localStorage.setItem(this.key, JSON.stringify(alerts));
    }
}

// ============================================
// GESTIÓN DE SESIÓN
// ============================================

class SessionManager {
    constructor() {
        this.key = 'teamwellness_current_session';
    }

    // Crear sesión
    create(type, teamId, userId, userName = null) {
        const session = {
            type, // 'coach' | 'player'
            teamId,
            userId,
            userName,
            loginTime: new Date().toISOString()
        };
        localStorage.setItem(this.key, JSON.stringify(session));
        return session;
    }

    // Obtener sesión actual
    get() {
        const data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : null;
    }

    // Cerrar sesión
    clear() {
        localStorage.removeItem(this.key);
    }

    // Verificar si hay sesión activa
    isActive() {
        return this.get() !== null;
    }
}

// ============================================
// UTILIDADES
// ============================================

const Utils = {
    // Formatear fecha
    formatDate(date) {
        return new Date(date).toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // Formatear hora
    formatTime(date) {
        return new Date(date).toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    // Obtener estado del jugador basado en check-in
    getPlayerStatus(checkIn) {
        if (!checkIn) {
            return { status: 'pending', color: '#9ca3af', icon: '⚪', text: 'Pendiente' };
        }

        const physical = checkIn.data.physicalState;
        let maxPain = 0;

        if (checkIn.data.hasPain) {
            maxPain = Math.max(...Object.values(checkIn.data.painZones).map(z => z.intensity));
        }

        if (maxPain >= 9 || physical <= 3) {
            return { status: 'critical', color: '#ef4444', icon: '🔴', text: 'Crítico' };
        } else if (maxPain >= 7 || physical <= 5) {
            return { status: 'warning', color: '#f97316', icon: '🟠', text: 'Advertencia' };
        } else if (maxPain >= 4 || physical <= 7) {
            return { status: 'caution', color: '#fbbf24', icon: '🟡', text: 'Precaución' };
        } else {
            return { status: 'good', color: '#10b981', icon: '🟢', text: 'Disponible' };
        }
    },

    // Emojis según valor 1-10
    getEmoji(value) {
        const emojis = {
            1: '😱', 2: '😩', 3: '😫', 4: '😕', 5: '😐',
            6: '🙂', 7: '😊', 8: '😄', 9: '😁', 10: '🤩'
        };
        return emojis[value] || '😐';
    }
};
