export const scrollToTop = () => {
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};

export const getRandomOrderId = () => {
  return Math.floor(Math.random() * (1000 - 50 + 1)) + 50;
};
