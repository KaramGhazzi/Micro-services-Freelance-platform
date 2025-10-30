import { Encryption } from './encryption';

describe('Encryption', () => {
  let encryption: Encryption;

  beforeAll(() => {
    // Generate a mock 32-byte hex key for testing
    const mockKey = Buffer.from(Array(32).fill(0)).toString('base64');
    encryption = new Encryption(mockKey);
  });

  it('should encrypt and decrypt a string correctly', () => {
    const originalText = 'Hello, World!';
    const encrypted = encryption.encrypt(originalText);
    const decrypted = encryption.decrypt(encrypted);

    expect(decrypted).toBe(originalText);
  });

  it('should produce different ciphertexts for the same input', () => {
    const text = 'Same input';
    const encrypted1 = encryption.encrypt(text);
    const encrypted2 = encryption.encrypt(text);

    expect(encrypted1).not.toBe(encrypted2);
  });

  it('should handle empty strings', () => {
    const emptyString = '';
    const encrypted = encryption.encrypt(emptyString);
    const decrypted = encryption.decrypt(encrypted);

    expect(decrypted).toBe(emptyString);
  });

  it('should handle long strings', () => {
    const longString = 'a'.repeat(1000);
    const encrypted = encryption.encrypt(longString);
    const decrypted = encryption.decrypt(encrypted);

    expect(decrypted).toBe(longString);
  });

  it('should throw an error for invalid encrypted text', () => {
    const invalidEncrypted = 'invalid_encrypted_text';

    expect(() => {
      encryption.decrypt(invalidEncrypted);
    }).toThrow();
  });

  it('should throw an error when initialized with an empty key', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new Encryption('');
    }).toThrow('Encryption key is required');
  });
});
