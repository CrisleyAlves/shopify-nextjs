export const scrollToTop = () => {
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};

export const getRandomNumber = () => {
  return Math.floor(Math.random() * (100 - 50 + 1)) + 50;
};
