const ADMIN_SESSION_KEY = "adminSessionExpiresAt";
const ADMIN_SESSION_DURATION_MS = 5 * 60 * 1000;

export function startAdminSession() {
    localStorage.setItem(
        ADMIN_SESSION_KEY,
        String(Date.now() + ADMIN_SESSION_DURATION_MS),
    );
}

export function clearAdminSession() {
    localStorage.removeItem(ADMIN_SESSION_KEY);
}

export function getAdminSessionRemainingMs() {
    const expiresAt = Number(localStorage.getItem(ADMIN_SESSION_KEY));
    if (!Number.isFinite(expiresAt)) return 0;
    return Math.max(0, expiresAt - Date.now());
}
