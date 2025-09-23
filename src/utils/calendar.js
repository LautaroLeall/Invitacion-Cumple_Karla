// src/utils/calendar.js
// Utilidades para crear un link a Google Calendar y descargar archivo .ics

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