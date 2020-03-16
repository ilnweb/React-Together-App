export const letterName = (name) => {
  const userName = name.split(' ').slice(0, 1);
  return userName[0].split('')[0].toUpperCase();
}