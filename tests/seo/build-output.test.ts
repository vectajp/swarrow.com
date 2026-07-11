/// <reference types="bun" />

import { beforeAll, describe, expect, test } from "bun:test";

let html = "";
let robots = "";
let sitemap = "";
let modalSource = "";

const countMatches = (value: string, pattern: RegExp) =>
  Array.from(value.matchAll(pattern)).length;

beforeAll(async () => {
  [html, robots, sitemap, modalSource] = await Promise.all([
    Bun.file("build/index.html").text(),
    Bun.file("build/robots.txt").text(),
    Bun.file("build/sitemap.xml").text(),
    Bun.file("src/lib/swarrow/ContactModal.svelte").text(),
  ]);
});

describe("neutral Swarrow brand", () => {
  test("uses the existing mark with live Swarrow text", () => {
    expect(html).toContain('content="Swarrow"');
    expect(html).toContain('src="/swarrow/icon.png"');
    expect(html).toContain('class="brand-name');
    expect(html).toContain('class="foot-name');
    expect(html).not.toContain('src="/swarrow/logo.svg"');
    expect(html).not.toContain('src="/swarrow/footer-logo.svg"');
    expect(html).toContain("© Swarrow");
  });

  test("uses a municipal organization label without changing request fields", () => {
    expect(modalSource).toContain("自治体・団体名");
    for (const field of [
      "companyName",
      "name",
      "nameKana",
      "email",
      "inquiry",
      "turnstileToken",
    ]) {
      expect(modalSource).toContain(field);
    }
    expect(modalSource).toContain("FALLBACK_DOWNLOAD_REQUEST_API_URL");
  });
});

describe("benefit-led first view", () => {
  test("renders one benefit-led H1 and both product names", () => {
    expect(countMatches(html, /<h1\b/g)).toBe(1);
    expect(html).toContain("電話とホームページの定型対応をAIに。");
    expect(html).toContain("職員は、本来の仕事へ。");

    const hero = html.match(
      /<section class="hero[^>]*>([\s\S]*?)<\/section>/,
    )?.[1];
    expect(hero).toContain("Swarrow Chat");
    expect(hero).toContain("Swarrow Call");
    expect(hero).not.toContain("hero-news");
  });

  test("places a three-item pain strip immediately after the Hero", () => {
    expect(html).toContain('id="problems"');
    expect(countMatches(html, /class="problem-card\b/g)).toBe(3);
    expect(html.indexOf('class="hero')).toBeLessThan(
      html.indexOf('id="problems"'),
    );
    expect(html.indexOf('id="problems"')).toBeLessThan(
      html.indexOf('class="knowledge'),
    );
  });
});

describe("shared knowledge", () => {
  test("presents one knowledge base before product details", () => {
    expect(html).toContain('id="knowledge"');
    const knowledge = html.match(
      /<section id="knowledge"[\s\S]*?<\/section>/,
    )?.[0];
    expect(knowledge).toContain("1つの知識で、");
    expect(knowledge).toContain("ホームページも電話も。");
    expect(html).toContain("Swarrow Chat");
    expect(html).toContain("Swarrow Call");
    expect(html).toContain("/swarrow-call/knowledge-flow-alpha.webm");
    expect(html).not.toContain("Swarrow Call 基盤");
  });
});

describe("product overview", () => {
  test("shows two equally structured product choices", () => {
    expect(html).toContain('id="products"');
    expect(countMatches(html, /class="product-card\b/g)).toBe(2);
    expect(html).toContain("自治体ホームページAI窓口");
    expect(html).toContain("自治体AIコールセンター");
    expect(html).toContain('href="#chat"');
    expect(html).toContain('href="#call"');
    expect(html).toContain('href="#products"');
    expect(html).toContain("単独でも、組み合わせても導入可能");
  });

  test("places comparison after knowledge and before details", () => {
    const knowledge = html.indexOf('id="knowledge"');
    const overview = html.indexOf('id="products"');
    const chat = html.indexOf('id="chat"');
    const call = html.indexOf('id="call"');

    expect(knowledge).toBeLessThan(overview);
    expect(overview).toBeLessThan(chat);
    expect(overview).toBeLessThan(call);
  });
});

describe("crawlability baseline", () => {
  test("publishes Japanese HTML with one canonical URL", () => {
    expect(html).toContain('<html lang="ja">');
    expect(
      countMatches(
        html,
        /<link rel="canonical" href="https:\/\/swarrow\.com\/"\s*\/?>/g,
      ),
    ).toBe(1);
    expect(html).toContain('<meta name="robots" content="index,follow"');
    expect(html).not.toMatch(/noindex/i);
  });

  test("advertises the root sitemap without blocking crawlers", () => {
    expect(robots).toContain("User-agent: *");
    expect(robots).toContain("Disallow:\n");
    expect(robots).toContain("Sitemap: https://swarrow.com/sitemap.xml");
  });

  test("lists only the root canonical URL in the sitemap", () => {
    const locations = Array.from(
      sitemap.matchAll(/<loc>([^<]+)<\/loc>/g),
      (match) => match[1],
    );
    expect(locations).toEqual(["https://swarrow.com/"]);
  });
});
