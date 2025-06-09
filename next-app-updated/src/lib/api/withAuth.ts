import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

type HandlerFunction = (
  req: NextRequest,
  context: any
) => Promise<NextResponse>;

export function withAuth(handler: HandlerFunction): HandlerFunction {
  return async (req: NextRequest, context: any) => {
    // Get auth token from cookies
    const cookieStore = cookies();
    const authToken = cookieStore.get("auth_token");
    
    // For our mock implementation, we'll also check local storage via headers
    // In a real app, you would use a proper JWT or session token
    const authHeader = req.headers.get("Authorization");
    
    // Mock validation
    if (!authToken && !authHeader) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    
    // In a real app, you would verify the token here
    // For now, we'll just pass the request through
    return handler(req, context);
  };
}
