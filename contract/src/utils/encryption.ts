import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

export class Encryption {
  private readonly ENCRYPTION_KEY: Buffer;

  private readonly ALGORITHM = 'aes-256-gcm';

  constructor(key: string) {
    if (!key) {
      throw new Error('Encryption key is required');
    }
    this.ENCRYPTION_KEY = Buffer.from(key, 'base64');
  }

  encrypt(text: string): string {
    try {
      const iv = randomBytes(12);
      const cipher = createCipheriv(this.ALGORITHM, this.ENCRYPTION_KEY, iv);
      const encrypted = Buffer.concat([
        cipher.update(text, 'utf8'),
        cipher.final(),
      ]);
      const tag = cipher.getAuthTag();
      return Buffer.concat([iv, tag, encrypted]).toString('base64url');
    } catch (error) {
      throw new Error(`Encryption failed: ${error.message}`);
    }
  }

  decrypt(encryptedText: string): string {
    try {
      const buf = Buffer.from(encryptedText, 'base64url');
      const iv = buf.subarray(0, 12);
      const tag = buf.subarray(12, 28);
      const encrypted = buf.subarray(28);
      const decipher = createDecipheriv(
        this.ALGORITHM,
        this.ENCRYPTION_KEY,
        iv
      );
      decipher.setAuthTag(tag);
      return decipher.update(encrypted) + decipher.final('utf8');
    } catch (error) {
      throw new Error(`Decryption failed: ${error.message}`);
    }
  }
}

export function getEncryption(): Encryption {
  const encryptionKey = process.env.ENCRYPTION_KEY;
  if (!encryptionKey) {
    throw new Error('ENCRYPTION_KEY is not set in environment variables');
  }
  return new Encryption(encryptionKey);
}
