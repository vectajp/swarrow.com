/// <reference types="bun" />

import { describe, expect, test } from "bun:test";
import { showCaseStudies, site } from "../../src/lib/swarrow/content";

describe("SEO content baseline", () => {
  test("keeps the root URL as the only canonical site URL", () => {
    expect(site).toBe("https://swarrow.com");
  });

  test("keeps fictional case studies unpublished", () => {
    expect(showCaseStudies).toBe(false);
  });
});
