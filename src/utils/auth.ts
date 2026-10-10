import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export const unauthorized = (message = "Unauthorized") =>
  NextResponse.json({ success: false, message }, { status: 401 });

export const forbidden = (message = "You are not authorized") =>
  NextResponse.json({ success: false, message }, { status: 403 });

export const getRequesterId = (req: NextRequest) =>
  req.nextUrl.searchParams.get("id") ||
  req.headers.get("x-user-id") ||
  "";

export const requireRequester = async (req: NextRequest) => {
  const requesterId = getRequesterId(req);
  if (!requesterId) {
    return { error: unauthorized("Please login") };
  }
  const user = await User.findById(requesterId);
  if (!user) {
    return { error: unauthorized("User not found") };
  }
  return { user, requesterId };
};

export const requireAdmin = async (req: NextRequest) => {
  const result = await requireRequester(req);
  if ("error" in result && result.error) return result;
  if (result.user.role !== "admin") {
    return { error: forbidden() };
  }
  return result;
};

export const requireSelfOrAdmin = async (
  req: NextRequest,
  resourceOwnerId: string,
) => {
  const result = await requireRequester(req);
  if ("error" in result && result.error) return result;
  const isAdmin = result.user.role === "admin";
  const isOwner = String(result.requesterId) === String(resourceOwnerId);
  if (!isAdmin && !isOwner) {
    return { error: forbidden() };
  }
  return result;
};

export const safeErrorMessage = () => "Internal Server Error";
