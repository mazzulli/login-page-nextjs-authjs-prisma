import "server-only";

import db from "@/_lib/db/db";
import { Exam } from "@prisma/client";

export const getExams = async (): Promise<Exam[]> => {
  const result = await db.exam.findMany({
    include: {
      supervisors: {
        where: {
          examId: {
            equals: undefined, // Será preenchido dinamicamente abaixo
          },
        },
      },
      invigilators: {
        where: {
          examId: {
            equals: undefined, // Será preenchido dinamicamente abaixo
          },
        },
      },
      speaking: {
        where: {
          examId: {
            equals: undefined, // Será preenchido dinamicamente abaixo
          },
        },
      },
    },
    orderBy: {
      examDescription: "asc",
    },
  });
  return result;
};
