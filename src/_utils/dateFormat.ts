import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

function dateFormat(date: Date) {
  if (!date) {
    return "yyyy/MM/dd";
  }

  try {
    const formattedDate = format(new Date(date), "yyyy/MM/dd", {
      locale: ptBR,
    });
    return formattedDate;
  } catch (error) {
    console.error("Erro ao formatar a data:", error);
    return ""; // Return null on error
  }
}

export default dateFormat;
