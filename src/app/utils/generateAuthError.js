export function generateAuthError(message) {
   switch (message) {
      case "EMAIL_NOT_FOUND":
      case "INVALID_PASSWORD":
         return "Invalid email or password";
      case "EMAIL_EXISTS":
         const errorObj = {
            email: "User with this email already exists",
         };
         return errorObj;
      default:
         return "Too many attemps, try later";
   }
}
