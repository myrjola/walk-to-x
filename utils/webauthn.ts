// Human-readable title for your website
export const rpName = "Walk to X";
// A unique identifier for your website
export const rpID = process.env.VERCEL_URL ?? "localhost";
// The URL at which registrations and authentications should occur
export const origin =
  process.env.NODE_ENV === "development"
    ? `http://${rpID}:3000`
    : `https://${rpID}`;

const productionRPID = process.env.WEBAUTHN_RP_ID ?? "localhost";

export const expectedRPID =
  process.env.NODE_ENV === "development" ? rpID : [productionRPID, rpID];

export const expectedOrigin =
  process.env.NODE_ENV === "development"
    ? `http://${rpID}:3000`
    : [`https://${productionRPID}`, `https://${rpID}`];
