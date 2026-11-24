import type { NextResponse } from "next/server";
import type { AuthSession } from "@/lib/auth-schema";

export const ACCESS_COOKIE = "fst_access_token";
export const REFRESH_COOKIE = "fst_refresh_token";

export function getApiBaseUrl() {
  const value = process.env.API_BASE_URL?.trim().replace(/\/+$/, "");
  if (!value) throw new Error("API_BASE_URL is not configured.");
  return value;
}

export function cookieOptions(maxAge: number) {
  const cookieSecure = process.env.AUTH_COOKIE_SECURE;
  const secure = cookieSecure === "true"
    ? true
    : cookieSecure === "false"
      ? false
      : process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure,
    sameSite: "lax" as const,
    path: "/",
    maxAge: Math.max(0, Math.floor(maxAge)),
  };
}

export function setSessionCookies(response: NextResponse, session: AuthSession) {
  const refreshExpiresAt = Date.parse(session.refreshTokenExpiresAt);
  const refreshMaxAge = Number.isFinite(refreshExpiresAt)
    ? Math.max(0, (refreshExpiresAt - Date.now()) / 1000)
    : 0;

  response.cookies.set(
    ACCESS_COOKIE,
    session.accessToken,
    cookieOptions(session.expiresIn),
  );
  response.cookies.set(
    REFRESH_COOKIE,
    session.refreshToken,
    cookieOptions(refreshMaxAge),
  );
}

export function clearSessionCookies(response: NextResponse) {
  response.cookies.set(ACCESS_COOKIE, "", cookieOptions(0));
  response.cookies.set(REFRESH_COOKIE, "", cookieOptions(0));
}

export async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export function upstreamMessage(payload: unknown, fallback: string) {
  if (!payload || typeof payload !== "object" || !("message" in payload)) {
    return fallback;
  }
  const message = (payload as { message?: unknown }).message;
  if (Array.isArray(message)) {
    return message.filter((item): item is string => typeof item === "string").join(" ");
  }
  return typeof message === "string" ? message : fallback;
}

export function refreshTokenMaxAge(session: AuthSession) {
  const expiresAt = Date.parse(session.refreshTokenExpiresAt);
  return Number.isFinite(expiresAt)
    ? Math.max(0, (expiresAt - Date.now()) / 1000)
    : 0;
}
