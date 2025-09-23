// src/utils/clipboard.js
export async function copyToClipboard(text) {
    // Verifica que estés en navegador
    if (typeof window === "undefined" || typeof document === "undefined") {
        return false;
    }

    try {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
            return true;
        }
    } catch (err) {
        console.warn("Clipboard API error:", err);
    }

    // Fallback
    try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);

        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);

        return ok;
    } catch (err) {
        console.error("Fallback copy error:", err);
        return false;
    }
}
