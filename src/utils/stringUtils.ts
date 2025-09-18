export const snakeCase = (input: string): string => {
  return (
    input
      // Replace capitals with space + lowercase
      .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
      // Replace spaces, hyphens, and other non-alphanumeric characters with underscores
      .replace(/[\s\W]+/g, '_')
      // Lowercase the entire string
      .toLowerCase()
      // Remove leading/trailing underscores
      .replace(/^_+|_+$/g, '')
  );
};

export const dashCase = (input: string): string => {
  return (
    input
      // Replace capitals with space + lowercase
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      // Replace spaces, hyphens, and other non-alphanumeric characters with underscores
      .replace(/[\s\W]+/g, '-')
      // Lowercase the entire string
      .toLowerCase()
      // Remove leading/trailing underscores
      .replace(/^-+|-+$/g, '')
  );
};
