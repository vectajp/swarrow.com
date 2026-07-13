/// <reference types="bun" />

import { beforeAll, describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";

let html = "";
let robots = "";
let sitemap = "";
let modalSource = "";
let pageSource = "";

const countMatches = (value: string, pattern: RegExp) =>
  Array.from(value.matchAll(pattern)).length;

beforeAll(async () => {
  [html, robots, sitemap, modalSource, pageSource] = await Promise.all([
    Bun.file("build/index.html").text(),
    Bun.file("build/robots.txt").text(),
    Bun.file("build/sitemap.xml").text(),
    Bun.file("src/lib/swarrow/ContactModal.svelte").text(),
    Bun.file("src/routes/+page.svelte").text(),
  ]);
});

describe("Swarrow and Vecta brand roles", () => {
  test("keeps the Swarrow header and uses the linked Vecta company footer", () => {
    expect(html).toContain('content="Swarrow"');
    expect(html).toContain('src="/swarrow/icon.png"');
    expect(html).toContain('class="brand-name');
    expect(html).not.toContain('src="/swarrow/logo.svg"');
    expect(html).not.toContain('src="/swarrow/footer-logo.svg"');

    const footer = html.match(/<footer[^>]*>[\s\S]*?<\/footer>/)?.[0] ?? "";
    expect(footer).toContain('src="/vecta/logo_horizontal.svg"');
    expect(footer).toContain('href="https://www.vecta.co.jp"');
    expect(footer).toContain('aria-label="Vectaのウェブサイトへ"');
    expect(footer).toContain("まちの知識を、未来へつなぐ。");
    expect(footer).toContain("〒150-0002");
    expect(footer).toContain("東京都渋谷区渋谷2-19-15");
    expect(footer).toContain("宮益坂ビルディング609");
    expect(footer).not.toContain("サイトマップ");
    expect(footer).not.toContain("https://www.vecta.co.jp/#concept");
    expect(footer).not.toContain("https://www.vecta.co.jp/#projects");
    expect(footer).not.toContain("https://www.vecta.co.jp/#articles");
    expect(footer).not.toContain("https://www.vecta.co.jp/#company");
    expect(footer).toMatch(/© \d{4} Vecta\. All rights reserved\./);
    expect(footer).not.toContain("Swarrow");
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

  test("keeps required marks beside their field labels", () => {
    expect(countMatches(modalSource, /class="field-label"/g)).toBe(5);
    expect(
      countMatches(
        modalSource,
        /class="field-label">[\s\S]*?class="required"/g,
      ),
    ).toBe(4);
    expect(modalSource).toContain("white-space: nowrap");
  });

  test("centers compact controls with a three-line inquiry", () => {
    expect(modalSource).toContain('rows="3"');
    expect(modalSource).toContain("max-width: 440px");
    expect(modalSource).toContain("margin-inline: auto");
    expect(modalSource).toContain("box-sizing: border-box");
  });
});

describe("answer-quality Hero", () => {
  test("renders one answer-quality H1 and product-neutral supporting copy", () => {
    expect(countMatches(html, /<h1\b/g)).toBe(1);
    for (const line of [
      "知識・回答ルール・参照元まで、フルチューニング。",
      "回答精度に妥協しない。",
      "自治体フルチューニングAI。",
    ]) {
      expect(html).toContain(line);
    }

    const hero = html.match(
      /<section class="hero[^>]*>([\s\S]*?)<\/section>/,
    )?.[1];
    expect(hero).toContain("チャットやコールセンターのAI機能");
    expect(hero).not.toContain("Swarrow Chat");
    expect(hero).not.toContain("Swarrow Call");
    expect(hero).not.toContain('href="#quality"');
    expect(hero).not.toContain("回答品質の仕組みを見る");
    expect(hero).toContain("回答精度を支える設計が欠かせません");
    expect(hero).toContain("自治体の公式情報・回答ルール");
    expect(hero).toContain("実際のオペレーションに合わせて個別に設計");
    expect(hero).toContain("公開後も利用状況をもとに回答品質を継続的に高め");
    expect(hero).toContain("運用を重ねるほど改善につなげられる仕組み");
    expect(hero).not.toContain("そのまちの答えを、");
    expect(hero).not.toContain("hero-news");
  });

  test("omits the removed quality and municipal challenges sections", () => {
    expect(html).not.toContain('id="quality"');
    expect(html).not.toContain('id="problems"');
    expect(html).not.toContain("Answer Quality");
    expect(html).not.toContain("Municipal Inquiry Challenges");
  });

  test("uses one English label style across the remaining narrative", () => {
    for (const label of ["Products", "Shared Knowledge"]) {
      expect(html).toContain(label);
    }
    expect(countMatches(html, /class="[^"]*\bsection-kicker(?:\s|")/g)).toBe(2);
  });
});

describe("shared knowledge", () => {
  test("presents one shared knowledge base before common operations", () => {
    expect(html).toContain('id="knowledge"');
    const knowledge = html.match(
      /<section id="knowledge"[\s\S]*?<\/section>/,
    )?.[0];
    expect(knowledge).toContain("1つの知識で、");
    expect(knowledge).toContain("ホームページも電話も。");
    expect(html).toContain("Swarrow Chat");
    expect(html).toContain("Swarrow Call");
    expect(html).toContain("/swarrow-call/knowledge-flow-alpha.webm");
    expect(html).toContain("/swarrow-call/knowledge-flow-alpha.mp4");
    expect(html).toContain("/swarrow-call/knowledge-flow-alpha.png");
    expect(html).not.toContain("Swarrow Call 基盤");
  });

  test("uses the Call mist wave above Shared Knowledge", () => {
    const knowledge =
      html.match(/<section id="knowledge"[\s\S]*?<\/section>/)?.[0] ?? "";

    expect(knowledge).toContain("knowledge-top-curve");
    expect(knowledge).toContain("section-curve-bg--mist");
    expect(knowledge).toContain("section-curve-bg--flip");
    expect(knowledge).toContain(
      'd="M-80 330C80 128 266 88 498 136C726 184 812 188 1008 76C1214 -42 1378 24 1508 214V1600H-80Z"',
    );
    expect(knowledge.indexOf("knowledge-top-curve")).toBeLessThan(
      knowledge.indexOf("knowledge-inner"),
    );
  });
});

describe("product overview", () => {
  test("shows two equally structured product choices", () => {
    expect(html).toContain('id="products"');
    expect(countMatches(html, /class="product-card(?:\s|")/g)).toBe(2);
    expect(html).toContain("自治体ホームページAI窓口");
    expect(html).toContain("自治体AIコールセンター");
    expect(html).toContain('href="#chat"');
    expect(html).toContain('href="#call"');
    expect(html).toContain('href="#products"');
    expect(html).toContain("単独でも、組み合わせても導入可能");
    expect(countMatches(html, /class="product-card-watermark\b/g)).toBe(2);
    expect(countMatches(html, /class="product-name-icon\b/g)).toBe(2);
    for (const asset of [
      "/swarrow-call/swarrow-chat-icon-flat.png",
      "/swarrow-call/swarrow-call-icon-flat.png",
    ]) {
      expect(html).toContain(asset);
    }
  });

  test("places comparison after Hero and product details before Shared Knowledge", () => {
    const hero = html.indexOf('class="hero');
    const overview = html.indexOf('id="products"');
    const knowledge = html.indexOf('id="knowledge"');
    const chat = html.indexOf('id="chat"');
    const call = html.indexOf('id="call"');
    const operations = html.indexOf('id="operations"');

    expect(pageSource).toMatch(
      /<section class="hero">[\s\S]*?<\/section>\s*<section id="products"/,
    );
    expect(hero).toBeLessThan(overview);
    expect(overview).toBeLessThan(chat);
    expect(overview).toBeLessThan(call);
    expect(chat).toBeLessThan(call);
    expect(call).toBeLessThan(knowledge);
    expect(knowledge).toBeLessThan(operations);
  });

  test("reuses the Call background wave between Hero and Products", () => {
    const overview =
      html.match(/<section id="products"[\s\S]*?<\/section>/)?.[0] ?? "";

    expect(overview).toContain("hero-products-curve");
    expect(overview).toContain(
      'd="M-80 330C80 128 266 88 498 136C726 184 812 188 1008 76C1214 -42 1378 24 1508 214V1600H-80Z"',
    );
    expect(overview.indexOf("hero-products-curve")).toBeLessThan(
      overview.indexOf("products-inner"),
    );
  });
});

describe("Swarrow Chat section", () => {
  test("describes Chat as an independent municipal product", () => {
    expect(html).toMatch(/id="chat"[\s\S]*?<h2[^>]*>[\s\S]*?Swarrow Chat/);
    expect(html).toContain("自治体ホームページAI窓口");
    expect(html).toContain("ホームページやLINE");
    expect(html).toContain("自己解決");
    expect(html).toContain("/swarrow-call/chat-ui.webm");
    expect(html).toMatch(
      /<span class="chat-feature-title-label[^"]*">自治体ホームページAI窓口<\/span>/,
    );
    expect(html).toMatch(
      /class="feature-product-name[^"]*">[\s\S]*?src="\/swarrow-call\/swarrow-chat-icon-flat\.png"[\s\S]*?Swarrow Chat/,
    );
    expect(html).not.toContain("Swarrow Call のチャット UI");
  });

  test("uses the gray band and wave for Municipal Web AI Desk", () => {
    const chat = html.match(/<section id="chat"[\s\S]*?<\/section>/)?.[0] ?? "";

    expect(chat).toContain("feature-band--mist");
    expect(chat).toContain("chat-top-curve");
    expect(chat).toContain("section-curve-bg--mist");
    expect(chat).toContain(
      'd="M-80 330C80 128 266 88 498 136C726 184 812 188 1008 76C1214 -42 1378 24 1508 214V1600H-80Z"',
    );
    expect(chat.indexOf("chat-top-curve")).toBeLessThan(
      chat.indexOf("chat-feature"),
    );
  });
});

describe("Swarrow Call section", () => {
  test("connects call capabilities to municipal work outcomes", () => {
    expect(html).toMatch(/id="call"[\s\S]*?<h2[^>]*>[\s\S]*?Swarrow Call/);
    expect(html).toContain("自治体AIコールセンター");
    for (const capability of [
      "AI受電",
      "案内",
      "取次",
      "タイマー架電",
      "一括発信",
    ]) {
      expect(html).toContain(capability);
    }
    expect(html).toContain("/swarrow-call/operator-call.webm");
    expect(html).toMatch(
      /class="feature-product-name[^"]*">[\s\S]*?src="\/swarrow-call\/swarrow-call-icon-flat\.png"[\s\S]*?Swarrow Call/,
    );
  });

  test("uses the white band and wave for Municipal AI Call Center", () => {
    const call = html.match(/<section id="call"[\s\S]*?<\/section>/)?.[0] ?? "";

    expect(call).toContain("feature-band--paper");
    expect(call).toContain("section-curve-bg--paper");
  });
});

describe("section order", () => {
  test("places Shared Knowledge after both product details and before common operations", () => {
    const chat = html.indexOf('id="chat"');
    const call = html.indexOf('id="call"');
    const knowledge = html.indexOf('id="knowledge"');
    const operations = html.indexOf('id="operations"');

    expect(chat).toBeGreaterThan(-1);
    expect(call).toBeGreaterThan(chat);
    expect(knowledge).toBeGreaterThan(call);
    expect(operations).toBeGreaterThan(knowledge);
    expect(countMatches(pageSource, /bind:this=\{workflowVideo\}/g)).toBe(1);
    expect(pageSource).toContain("class:ready={workflowVideoReady}");
    expect(pageSource).toContain("new IntersectionObserver");
    expect(pageSource).toContain("/swarrow-call/workflow-editor-alpha.webm");
  });
});

describe("common operations", () => {
  test("describes one update workflow for both products", () => {
    const operations = html.match(
      /<section id="operations"[\s\S]*?<\/section>/,
    )?.[0];
    expect(operations).toContain("両製品の案内を、");
    expect(operations).toContain("職員の手で改善。");
    expect(operations).toContain("Swarrow ChatとSwarrow Call");
    expect(operations).toContain("一度の更新");
    expect(operations).toContain("/swarrow-call/workflow-editor-alpha.webm");
  });
});

describe("shared customer success", () => {
  test("supports Chat, Call, and combined adoption", () => {
    const support =
      html.match(/<section id="support"[\s\S]*?<\/section>/)?.[0] ?? "";
    expect(support).toMatch(/Swarrow ChatとSwarrow\s+Call/);
    expect(support).toContain("導入準備");
    expect(support).toContain("初期構築");
    expect(support).toContain("運用改善");
    expect(support).not.toContain("貴社");
  });

  test("keeps a white backdrop behind the Customer Success wave", () => {
    expect(pageSource).toMatch(
      /\.function::before\s*\{[^}]*background: var\(--paper\);/,
    );
  });
});

describe("navigation and conversion", () => {
  test("all in-page links point to rendered targets", () => {
    const ids = new Set(
      Array.from(html.matchAll(/\sid="([^"]+)"/g), (match) => match[1]),
    );
    const internalTargets = Array.from(
      html.matchAll(/href="#([^"]+)"/g),
      (match) => match[1],
    );

    for (const target of internalTargets) {
      expect(ids.has(target)).toBe(true);
    }
  });

  test("keeps the final page sequence and a two-product CTA", () => {
    const ids = [
      "products",
      "chat",
      "call",
      "knowledge",
      "operations",
      "support",
      "news",
      "contact",
    ];
    const positions = ids.map((id) => html.indexOf(`id="${id}"`));
    expect(positions.every((position) => position >= 0)).toBe(true);
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
    expect(html).toContain("Swarrow Chat・Swarrow Callの導入相談");
    expect(html).toContain("単独導入から併用まで");
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

describe("final search contract", () => {
  const metaContent = (kind: "name" | "property", key: string) =>
    html.match(
      new RegExp(`<meta ${kind}="${key}" content="([^"]*)"\\s*\\/?>`),
    )?.[1];

  test("keeps visible metadata and social metadata consistent", () => {
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = metaContent("name", "description");
    expect(title).toBe(
      "Swarrow｜自治体ホームページAI窓口・自治体AIコールセンター",
    );
    expect(description).toContain("Swarrow Chat");
    expect(description).toContain("Swarrow Call");
    expect(description).toContain("公式情報");
    expect(description).toContain("公開前");
    expect(description).toContain("参照元");
    expect(description).toContain("回答ルール");
    expect(description).toContain("回答精度");
    expect(description).toContain("継続改善");
    expect(metaContent("property", "og:site_name")).toBe("Swarrow");
    expect(metaContent("property", "og:title")).toBe(title);
    expect(metaContent("name", "twitter:title")).toBe(title);
    expect(metaContent("property", "og:description")).toBe(description);
    expect(metaContent("name", "twitter:description")).toBe(description);
    expect(metaContent("property", "og:url")).toBe("https://swarrow.com/");
  });

  test("renders one H1 and both services in visible body content", () => {
    const body = html.split("<body")[1] ?? "";
    expect(countMatches(body, /<h1\b/g)).toBe(1);
    expect(body).toContain("Swarrow Chat");
    expect(body).toContain("Swarrow Call");
    expect(body).not.toMatch(/みどり野市|うみかぜ町|あさひ野市|こもれび市/);
    expect(body).not.toMatch(
      /問い合わせ全体を70%削減|負担を半減|最高精度|No\.?1|正確性を保証|回答を保証|誤回答はありません|ハルシネーションゼロ|どんな質問にも|他社より正確|100問|月次|都城市/,
    );
  });

  test("publishes parseable structured data matching visible services", () => {
    const body = html.split("<body")[1] ?? "";
    const match = html.match(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
    );
    expect(match).not.toBeNull();
    const data = JSON.parse(match?.[1] ?? "{}");
    const graph = data["@graph"] as Array<Record<string, unknown>>;
    const services = graph.filter((item) => item["@type"] === "Service");
    expect(graph.some((item) => item["@type"] === "WebSite")).toBe(true);
    expect(services).toHaveLength(2);
    for (const service of services) {
      expect(body).toContain(String(service.name));
      expect(body).toContain(String(service.serviceType));
    }
  });

  test("keeps every referenced Swarrow media file present", () => {
    const media = new Set(
      Array.from(
        html.matchAll(/(?:src|poster)="(\/swarrow-call\/[^"]+)"/g),
        (match) => match[1],
      ),
    );
    expect(media.size).toBeGreaterThan(0);
    for (const path of media) {
      expect(existsSync(`static${path}`)).toBe(true);
    }
  });
});
