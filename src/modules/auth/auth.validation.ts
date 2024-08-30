import Joi, { ValidationResult } from 'joi';

class AuthValidation {
  public validateRegisterInput(data: any): ValidationResult {
    const signupSchema = Joi.object({
      name: Joi.string().trim().max(64).required(),
      email: Joi.string().trim().email().max(64).required(),
      password: Joi.string().trim().min(6).max(64).required(),
    });

    return signupSchema.validate(data);
  }

  public validateLoginInput(data: any): ValidationResult {
    const loginSchema = Joi.object({
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().required(),
    });
    return loginSchema.validate(data);
  }
}

export default new AuthValidation();
