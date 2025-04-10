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

/**
 * @description formats dateIsoString
 * example: April 8, 2025 at 07:44
 *
 */
export const formatDate = (dateIsoString: string) => {
  const date = new Date(dateIsoString);

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
