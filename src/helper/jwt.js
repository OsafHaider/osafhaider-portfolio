import { SignJWT, jwtVerify } from "jose";

// Generate The Token
async function tokenGenerator(data) {
  try {
    const secret = process.env.JWT_SECRET;
    const token = await new SignJWT(data)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("5d")
      .setIssuedAt()
      .sign(new TextEncoder().encode(secret));
    return token;
  } catch (error) {
    console.log(error.message, "from tokenGenerator");
  }
}
// Check Token Verification
async function tokenVerification(token) {
  try {
    const secret = process.env.JWT_SECRET;
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    return payload;
  } catch (error) {
    console.log(error.message, "from tokenVerification");
  }
}

export { tokenGenerator, tokenVerification };
