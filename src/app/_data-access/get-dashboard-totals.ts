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

export const getTotalVenues = async () => {
  const result = await db.venue.count();
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
