import assert from "node:assert/strict";
import { test } from "node:test";
import { getWeddingCountdown, WEDDING_DATE } from "./wedding-countdown";

test("the wedding countdown ends at midnight on 11 February in India, independently of browser timezone", () => {
  assert.equal(WEDDING_DATE, Date.parse("2027-02-10T18:30:00Z"));
});

test("the countdown separates remaining days, hours, minutes, and seconds", () => {
  const interval = (((3 * 24 + 4) * 60 + 5) * 60 + 6) * 1000;
  assert.deepEqual(getWeddingCountdown(WEDDING_DATE - interval), {
    days: 3,
    hours: 4,
    minutes: 5,
    seconds: 6,
    hasArrived: false,
  });
});

test("the final fraction of a second does not announce the wedding early", () => {
  assert.equal(getWeddingCountdown(WEDDING_DATE - 1).seconds, 1);
  assert.equal(getWeddingCountdown(WEDDING_DATE - 1).hasArrived, false);
});

test("the countdown stops at zero on and after the wedding date", () => {
  for (const now of [WEDDING_DATE, WEDDING_DATE + 86400000]) {
    assert.deepEqual(getWeddingCountdown(now), {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      hasArrived: true,
    });
  }
});
