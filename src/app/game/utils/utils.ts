export const getTexture = (gains: number, texture: number): string => {
  const gain: number = Math.floor(gains / (1000 * texture));
  return gain.toString();
};
