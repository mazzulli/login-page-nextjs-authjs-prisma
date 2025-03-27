export const CPFFormat = (cpf: string) => {
  // Remove todos os caracteres não numéricos
  const cleaned = ("" + cpf).replace(/\D/g, "");

  // Formata o CPF
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);

  if (match) {
    return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
  }

  return null; // Retorna null se o CPF for inválido
};
