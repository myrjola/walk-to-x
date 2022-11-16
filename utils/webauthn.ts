// Human-readable title for your website
import { NextApiRequest } from "next";

export const rpName = "Walk to X";

interface RpIdAndOrigin {
  // A unique identifier for your website
  rpId: string;
  // The URL at which registrations and authentications should occur
  origin: string;
}

export function resolveRpIdAndOrigin(headers: NextApiRequest["headers"]) {
  // Same mechanism as next-auth uses https://github.com/nextauthjs/next-auth/issues/3419#issuecomment-1013980190
  const forwardedHost = headers["x-forwarded-host"]?.toString() ?? "localhost";

  return {
    rpId: forwardedHost,
    origin:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : `https://${forwardedHost}`,
  };
}
