import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Remove pontos, traços e outros caracteres não numéricos de uma string.
 * Útil para limpar CPFs, CNPJs, etc.
 * @param value A string a ser limpa.
 * @returns A string contendo apenas dígitos.
 */
export function cleanNumberString(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Formata um CPF, adicionando pontos e traço, sem ocultar os dígitos.
 * Ex: 12345678900 -> 123.456.789-00
 * @param cpf O CPF (pode estar limpo ou parcialmente formatado).
 * @returns O CPF formatado no padrão 000.000.000-00.
 */
export function formatCpf(cpf: string): string {
  const cleanedCpf = cleanNumberString(cpf);

  if (cleanedCpf.length !== 11) {
    return cpf;
  }

  return `${cleanedCpf.substring(0, 3)}.${cleanedCpf.substring(3, 6)}.${cleanedCpf.substring(6, 9)}-${cleanedCpf.substring(9, 11)}`;
}

/**
 * Mascara um CPF para exibição, mostrando apenas os primeiros e últimos dígitos.
 * Ex: 123.456.789-00 -> ***.***.789-00
 * @param cpf O CPF (pode estar limpo ou formatado).
 * @returns O CPF mascarado.
 */

export function maskCpf(cpf: string): string {
  const cleanedCpf = cleanNumberString(cpf); 

  if (cleanedCpf.length !== 11) {
    return cpf; 
  }

  return `***.***.${cleanedCpf.substring(6, 9)}-${cleanedCpf.substring(9, 11)}`;
}

/**
 * Converte uma string de data no formato DD/MM/AAAA para um objeto Date
 * representando o início do dia em UTC.
 * Isso garante a correta interpretação da data pelo construtor Date e evita problemas de fuso horário.
 * @param dateString A data no formato "DD/MM/AAAA".
 * @returns Um objeto Date no início do dia em UTC, ou null se a string for inválida.
 */
export function createUtcDateFromDdMmYyyy(dateString: string): Date | null {
  const parts = dateString.split('/');
  if (parts.length === 3) {
    const [day, month, year] = parts.map(Number);

    if (!isNaN(day) && !isNaN(month) && !isNaN(year) && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
        const date = new Date(Date.UTC(year, month - 1, day, 3));

        return date;
    }
  }
  return null;
}


