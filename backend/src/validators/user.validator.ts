import { z } from "zod";

export const userValidator = z.object({

  firstName: z.string().min(4, "First name must be at least 4 characters"),
  lastName:  z.string().min(2, "Last name must be at least 2 characters"),
  email:     z.string().email("Invalid email address"),
  password:  z.string().min(6, "Password must be at least 6 characters"),

});
