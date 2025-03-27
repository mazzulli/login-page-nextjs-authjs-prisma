export const PhoneFormat = (phoneNumber: string) => {
  // Remove todos os caracteres não numéricos
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");

  // Formata o número de telefone
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return null; // Retorna null se o número de telefone for inválido
};
