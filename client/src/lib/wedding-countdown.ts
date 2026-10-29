export const WEDDING_DATE = new Date("2027-02-11T00:00:00+05:30").getTime();

export function getWeddingCountdown(now = Date.now()) {
  const remaining = Math.max(0, Math.ceil((WEDDING_DATE - now) / 1000));

  return {
    days: Math.floor(remaining / 86400),
    hours: Math.floor((remaining % 86400) / 3600),
    minutes: Math.floor((remaining % 3600) / 60),
    seconds: remaining % 60,
    hasArrived: now >= WEDDING_DATE,
  };
}
