// src/utils/clipboard.js
/**
 * copyToClipboard
 * - Intenta usar navigator.clipboard, si no existe usa fallback con textarea.
 * - Retorna una Promise que resuelve true/false segun exito.
 */
export async function copyToClipboard(text) {
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            return true;
        }
    } catch (err) {
        // fallback abajo
    }

    // Fallback:
    try {
        const ta = document.createElement('textarea');
        ta.value = text;
        // evitar mostrar el textarea
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return ok;
    } catch (err) {
        return false;
    }
}
