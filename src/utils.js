export const extractAuthor = (string) => string.slice(string.indexOf('(') + 2, -2);

export const extractDescription = (string) => {
  const array = string.split('</a></p>');
  return array.length > 2 ? `${array[1]}</a></p>` : null;
};
