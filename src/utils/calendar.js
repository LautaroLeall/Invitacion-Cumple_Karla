// src/utils/calendar.js
/**
 * Utilidades para crear un link a Google Calendar y descargar archivo .ics
 * Zona por defecto: America/Argentina/Tucuman
 */

/**
 * Convierte Date o ISO string a YYYYMMDDTHHMMSS (sin Z)
 * Ej: 20251011T110000
 */
function fmtDateForCalendar(dateInput) {
    const d = new Date(dateInput);
    const YYYY = d.getFullYear();
    const MM = String(d.getMonth() + 1).padStart(2, '0');
    const DD = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    return `${YYYY}${MM}${DD}T${hh}${mm}${ss}`;
}

/**
 * buildGoogleCalendarLink
 * @param {Object} params
 *  - title, details, location, startDate (Date or ISO), endDate (Date or ISO), tz (string)
 * returns full URL to open Google Calendar prefilled
 */
export function buildGoogleCalendarLink({
    title = '15 de Karla',
    details = '',
    location = '',
    startDate,
    endDate,
    tz = 'America/Argentina/Tucuman',
}) {
    if (!startDate || !endDate) throw new Error('startDate y endDate son obligatorios');

    const dates = `${fmtDateForCalendar(startDate)}/${fmtDateForCalendar(endDate)}`;
    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: title,
        dates,
        details,
        location,
        ctz: tz,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * downloadICS
 * - Genera un archivo .ics y fuerza su descarga
 * params:
 *  - title, description, location, startDate, endDate, uid
 */
export function downloadICS({
    title = '15 de Karla',
    description = '',
    location = '',
    startDate,
    endDate,
    uid = `invitation-${Date.now()}`,
    tz = 'America/Argentina/Tucuman',
}) {
    if (!startDate || !endDate) throw new Error('startDate y endDate son obligatorios');

    const dtstamp = fmtDateForCalendar(new Date());
    const dtStart = fmtDateForCalendar(startDate);
    const dtEnd = fmtDateForCalendar(endDate);

    const icsLines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        `PRODID:-//Invitacion-Karla//EN`,
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${dtstamp}`,
        `DTSTART;TZID=${tz}:${dtStart}`,
        `DTEND;TZID=${tz}:${dtEnd}`,
        `SUMMARY:${escapeICSText(title)}`,
        `DESCRIPTION:${escapeICSText(description)}`,
        `LOCATION:${escapeICSText(location)}`,
        'END:VEVENT',
        'END:VCALENDAR',
    ];

    const icsContent = icsLines.join('\r\n');
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invitacion-karla.ics';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

/**
 * Escapa caracteres que rompan la estructura ICS
 */
function escapeICSText(txt) {
    return String(txt || '')
        .replace(/,/g, '\\,')
        .replace(/;/g, '\\;')
        .replace(/\n/g, '\\n');
}
