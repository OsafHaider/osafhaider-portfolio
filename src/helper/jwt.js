import { SignJWT, jwtVerify } from "jose";

// Generate The Token
async function tokenGenerator(data) {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return;
    }
    const token = await new SignJWT(data)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("5d")
      .setIssuedAt()
      .sign(new TextEncoder().encode(secret));

    return token;
  } catch (error) {
    console.error("Error in tokenGenerator:", error.message);
  }
}

// Check Token Verification
async function tokenVerification(token) {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return;
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    return payload;
  } catch (error) {
    console.error("Error in tokenVerification:", error.message);
  }
}

export { tokenGenerator, tokenVerification };
