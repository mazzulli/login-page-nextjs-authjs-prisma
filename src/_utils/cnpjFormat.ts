export const CNPJFormat = (cnpj: string) => {
  // Remove todos os caracteres não numéricos
  const cleaned = ("" + cnpj).replace(/\D/g, "");

  // Formata o CNPJ
  const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/);

  if (match) {
    return `${match[1]}.${match[2]}.${match[3]}/${match[4]}-${match[5]}`;
  }

  return null; // Retorna null se o CNPJ for inválido
};
