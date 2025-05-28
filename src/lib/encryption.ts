import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const ENCRYPTION_KEY_HEX = process.env.ENCRYPTION_KEY;
const IV_LENGTH = 16;

let encryptionKeyBuffer: Buffer;

try {
  if (!ENCRYPTION_KEY_HEX) {
    throw new Error('ENCRYPTION_KEY não está definida nas variáveis de ambiente. Por favor, defina-a no .env.local ou nas configurações de ambiente.');
  }

  const tempKeyBuffer = Buffer.from(ENCRYPTION_KEY_HEX, 'hex');
  if (tempKeyBuffer.length !== 32) {
    throw new Error(`ENCRYPTION_KEY tem o formato inválido ou comprimento incorreto de bytes (${tempKeyBuffer.length} bytes). Esperado 32 bytes para AES-256. Verifique se é uma string hexadecimal de 64 caracteres.`);
  }

  encryptionKeyBuffer = tempKeyBuffer;

} catch (error) {
  const errorMessage = (error instanceof Error) ? error.message : String(error);
  console.error("ERRO CRÍTICO DE CONFIGURAÇÃO DE CRIPTOGRAFIA:", errorMessage);
  throw new Error("Falha na inicialização da criptografia: Chave inválida ou mal configurada.");
}

export function encrypt(text: string): string {
  const iv = Buffer.alloc(IV_LENGTH, 0); // IV fixo
  const cipher = crypto.createCipheriv(ALGORITHM, encryptionKeyBuffer, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

export function decrypt(text: string): string {
  const iv = Buffer.alloc(IV_LENGTH, 0); // IV fixo
  const decipher = crypto.createDecipheriv(ALGORITHM, encryptionKeyBuffer, iv);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}