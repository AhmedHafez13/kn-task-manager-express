import Joi from 'joi';

class TaskValidation {
  commonTaskDataSchema = {
    title: Joi.string().trim().min(3).max(64).required(),
    description: Joi.string().trim().min(3).max(255),
    dueDate: Joi.date(),
  };

  public validateTaskData(data: any): Joi.ValidationResult {
    const schema: any = this.commonTaskDataSchema;

    // Validate id if exists (id is required on update)
    if (data.id) {
      schema.id = Joi.number().min(1).required();
    }

    // Validate completed if exists
    if (data.completed !== undefined) {
      schema.completed = Joi.bool().required();
    }

    return Joi.object(schema).validate(data);
  }

  public validateUpdateData(data: any): Joi.ValidationResult {
    const schema: any = {
      id: Joi.number().min(1).required(),
      ...this.commonTaskDataSchema,
    };

    return Joi.object(schema).validate(data);
  }

  public validateMarkComplete(data: any): Joi.ValidationResult {
    const schema: any = {
      id: Joi.number().min(1).required(),
      completed: Joi.bool().required(),
    };

    return Joi.object(schema).validate(data);
  }

  public validatePageParams(
    data: any,
    defaults: { page: number; pageSize: number }
  ): Joi.ValidationResult {
    const schema = Joi.object({
      page: Joi.number().integer().min(1).default(defaults.page),
      pageSize: Joi.number()
        .integer()
        .min(1)
        .max(100)
        .default(defaults.pageSize),
    });

    return schema.validate(data, { convert: true });
  }

  public validateTaskId(data: { id: number }): Joi.ValidationResult {
    const schema = Joi.object({
      id: Joi.number().integer().min(1).required(),
    });

    return schema.validate(data, { convert: true });
  }
}

export default new TaskValidation();
