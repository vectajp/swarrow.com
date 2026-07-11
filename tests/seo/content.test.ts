/// <reference types="bun" />

import { describe, expect, test } from "bun:test";
import {
  heroCopy,
  jsonLd,
  pageDescription,
  pageTitle,
  painPoints,
  products,
  sharedKnowledge,
  showCaseStudies,
  site,
  siteName,
} from "../../src/lib/swarrow/content";

describe("Swarrow product content", () => {
  test("defines two equally addressable products", () => {
    expect(site).toBe("https://swarrow.com");
    expect(siteName).toBe("Swarrow");
    expect(products.map(({ id }) => id)).toEqual(["chat", "call"]);
    expect(products.map(({ name }) => name)).toEqual([
      "Swarrow Chat",
      "Swarrow Call",
    ]);
    expect(products.every(({ href }) => href.startsWith("#"))).toBe(true);
    expect(products.every(({ benefit }) => benefit.length > 0)).toBe(true);
  });

  test("states independent adoption and the shared knowledge value", () => {
    expect(sharedKnowledge.adoption).toContain("単独");
    expect(sharedKnowledge.adoption).toContain("組み合わせ");
    expect(sharedKnowledge.description).toContain("1つの知識基盤");
    expect(sharedKnowledge.description).toContain("Swarrow Chat");
    expect(sharedKnowledge.description).toContain("Swarrow Call");
  });

  test("uses benefit-led copy without unsupported metrics", () => {
    const publicCopy = JSON.stringify({
      heroCopy,
      painPoints,
      products,
      sharedKnowledge,
    });
    expect(publicCopy).not.toMatch(/半減|70%削減|100%|どの自治体でも/);
  });

  test("keeps fictional case studies unpublished", () => {
    expect(showCaseStudies).toBe(false);
  });
});

describe("two-product search model", () => {
  test("uses one accurate title and description", () => {
    expect(pageTitle).toBe(
      "Swarrow｜自治体ホームページAI窓口・自治体AIコールセンター",
    );
    for (const phrase of [
      "Swarrow Chat",
      "Swarrow Call",
      "知識基盤",
      "ホームページ",
      "電話",
    ]) {
      expect(pageDescription).toContain(phrase);
    }
    expect(pageDescription).not.toMatch(/半減|70%削減|100%/);
  });

  test("describes the site and two visible services in one graph", () => {
    const graph = jsonLd["@graph"] as readonly Record<string, unknown>[];
    expect(
      graph.filter((item) => item["@type"] === "Organization"),
    ).toHaveLength(1);
    expect(graph.filter((item) => item["@type"] === "WebSite")).toHaveLength(1);

    const services = graph.filter((item) => item["@type"] === "Service");
    expect(services).toHaveLength(2);
    expect(services.map((item) => item["@id"])).toEqual([
      "https://swarrow.com/#swarrow-chat",
      "https://swarrow.com/#swarrow-call",
    ]);
    expect(services.map((item) => item.name)).toEqual([
      "Swarrow Chat",
      "Swarrow Call",
    ]);
    expect(
      services.every(
        (item) =>
          (item.provider as Record<string, unknown>)["@id"] ===
          "https://swarrow.com/#organization",
      ),
    ).toBe(true);
  });
});
