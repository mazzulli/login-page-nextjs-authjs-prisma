import "server-only";

import db from "@/_lib/db/db";

export const getTotalCollaborators = async () => {
  const result = await db.collaborator.count();
  return result;
};

export const getTotalUsers = async () => {
  const result = await db.user.count();
  return result;
};

export const getTotalUsersByStatus = async () => {
  const result = await db.user.groupBy({
    by: ["isActive"],
    _count: {
      _all: true,
    },
  });
  return result;
};

export const getTotalVenues = async () => {
  const result = await db.venue.count();
  return result;
};

export const getTotalExams = async () => {
  const result = await db.exam.count();
  return result;
};

export const getTotalExamsClosed = async () => {
  const result = await db.exam.count({
    where: {
      isClosed: true,
    },
  });
  return result;
};

export const getTotalExamsOpened = async () => {
  const result = await db.exam.count({
    where: {
      isClosed: false,
    },
  });
  return result;
};

export const getTotalExamsByVenue = async () => {
  try {
    const result = await db.exam.groupBy({
      by: ["venueId"], // group by venueId
      _count: {
        _all: true,
      },
    });
    console.log(JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error("Erro ao buscar contagem de provas por venue:", error);
    throw error;
  }
  // [
  //   { "venueId": 1, "_count": { "_all": 10 } },
  //   { "venueId": 2, "_count": { "_all": 15 } },
  //   { "venueId": 3, "_count": { "_all": 20 } }
  // ]
};

export const getTotalExamsByVenueSQL = async () => {
  const result = await db.$queryRaw`
    SELECT v.name as venueName, COUNT(e.id) as totalExams   
    FROM Exam e   
    JOIN Venue v 
    ON e.venueId = v.id   
    GROUP BY v.id, v.name
  `;
  return result;
};
