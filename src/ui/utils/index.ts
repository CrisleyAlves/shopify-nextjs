export const scrollToTop = () => {
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};

/**
 * @description returns a random order id.
 *
 * FYI -> increasing range limit so I don't get conflicts in Analytics with transaction_id property.
 */
export const getRandomOrderId = (): number => {
  return Math.floor(Math.random() * (900000 - 50 + 1)) + 50;
};
