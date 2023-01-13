export const isCorrectHeadingLevel = (level) => {
  if (Number.isNaN(+level)) {
    throw new Error('the heading level must be a number');
  }

  if (level < 1 || level > 6) {
    throw new Error('the heading level must be at least 1 and not more than 6');
  }

  if (!Number.isInteger(level)) {
    throw new Error('the header level must be an integer');
  }

  return true;
};
