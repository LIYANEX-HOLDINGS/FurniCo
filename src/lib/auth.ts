import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set");
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: "customer" | "admin";
}

/** Sign a new JWT token (expires in 7 days) */
export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

/** Verify and decode a JWT token. Returns null on failure. */
export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

/** Extract the authenticated user from an Authorization header.
 *  Returns null if missing or invalid. */
export function getAuthUser(req: NextRequest | Request): JwtPayload | null {
  const authHeader = req.headers.get("authorization") ?? req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7);
  return verifyToken(token);
}

/** Guard helper — throws a 401 Response if user is missing or not of the required role */
export function requireAuth(
  req: NextRequest | Request,
  requiredRole?: "admin"
): JwtPayload {
  const user = getAuthUser(req);
  if (!user) {
    throw new AuthError("Authentication required", 401);
  }
  if (requiredRole && user.role !== requiredRole) {
    throw new AuthError("Admin access required", 403);
  }
  return user;
}

export class AuthError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
