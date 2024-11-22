// src/lib/models/base.model.ts

/**
 * Tüm modeller için temel arayüz
 */
export interface BaseModel {
  id: number;
  /**
   * Model doğrulama fonksiyonu
   */
  validate(): boolean;
}

/**
 * Model doğrulama hatası arayüzü
 */
export interface ModelValidationError {
  field: string;
  message: string;
}

/**
 * Model doğrulama hatası sınıfı
 */
export class ValidationError extends Error {
  constructor(public errors: ModelValidationError[]) {
    super("Validation failed");
  }
}
