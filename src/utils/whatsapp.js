// src/utils/whatsapp.js

// Utilidades para abrir WhatsApp con mensaje pre-armado.
// openWhatsApp({ nombre: 'Juan', apellido: 'Perez', asistira: true })
export function buildWhatsAppUrl({ phone = '5493874579414', nombre = '', apellido = '', asistira = false, extraText = '' }) {
    // "Hola Carlos, soy {nombre} {apellido}, {podre asistir} o {no podre asistir} el sábado 11 de Octubre al cumple, muchas gracias por la invitación!!"
    const estado = asistira ? 'podre asistir' : 'no podre asistir';
    const who = `${(nombre || '').trim()} ${(apellido || '').trim()}`.trim();
    let message = `Hola Carlos, soy ${who}, ${estado} el sábado 11 de Octubre al cumple, muchas gracias por la invitación!!`;
    if (extraText) message += ` ${extraText}`;

    const encoded = encodeURIComponent(message);
    return `https://wa.me/${phone}?text=${encoded}`;
}

export function openWhatsApp({ phone, nombre, apellido, asistira, extraText }) {
    const url = buildWhatsAppUrl({ phone, nombre, apellido, asistira, extraText });

    // Intentamos abrir en nueva pestaña; si el popup es bloqueado, fallback a same-page (útil en móvil)
    const newWin = window.open(url, '_blank', 'noopener,noreferrer');
    if (!newWin) {
        // intentamos de nuevo (útil en desktop con popup bloqueado)
        window.open(url, '_blank', 'noopener,noreferrer')
    }
}
