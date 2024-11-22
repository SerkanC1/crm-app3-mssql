// src/lib/models/base.model.ts

export interface BaseModel {
  id: number;
  validate(): boolean;
}

export interface ModelValidationError {
  field: string;
  message: string;
}

export class ValidationError extends Error {
  constructor(public errors: ModelValidationError[]) {
    super('Validation failed');
  }
}