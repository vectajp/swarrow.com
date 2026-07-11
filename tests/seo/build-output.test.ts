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

describe("answer-quality first view", () => {
  test("renders one answer-quality H1 and both product names", () => {
    expect(countMatches(html, /<h1\b/g)).toBe(1);
    for (const line of [
      "知識・回答ルール・参照元まで、フルチューニング。",
      "回答精度に妥協しない。",
      "フルチューニングAI。",
    ]) {
      expect(html).toContain(line);
    }

    const hero = html.match(
      /<section class="hero[^>]*>([\s\S]*?)<\/section>/,
    )?.[1];
    expect(hero).toContain("Swarrow Chat");
    expect(hero).toContain("Swarrow Call");
    expect(hero).toContain('href="#quality"');
    expect(hero).toContain("回答品質の仕組みを見る");
    expect(hero).toContain("自治体の公式情報と業務に合わせ");
    expect(hero).toContain("職員への引き継ぎまで個別に設計");
    expect(hero).toContain("公開前に回答を検証");
    expect(hero).toContain("公開後も利用状況や低評価質問");
    expect(hero).not.toContain("そのまちの答えを、");
    expect(hero).not.toContain("hero-news");
  });

  test("places a three-item pain strip after the answer-quality proof", () => {
    expect(html).toContain('id="problems"');
    expect(countMatches(html, /class="problem-card\b/g)).toBe(3);
    expect(html.indexOf('id="quality"')).toBeLessThan(
      html.indexOf('id="problems"'),
    );
    expect(html.indexOf('id="problems"')).toBeLessThan(
      html.indexOf('class="knowledge'),
    );
  });
});

describe("answer-quality proof", () => {
  test("shows the three-stage publication process and safeguard", () => {
    const quality =
      html.match(/<section id="quality"[\s\S]*?<\/section>/)?.[0] ?? "";

    expect(quality).toContain("Answer Quality");
    expect(quality).toContain("公開前に検証し、");
    expect(quality).toContain("公開後も改善する。");
    expect(countMatches(quality, /class="quality-step(?:\s|")/g)).toBe(3);
    for (const title of [
      "Vectaによる公開前検証",
      "自治体との公開判断",
      "継続的な品質改善",
    ]) {
      expect(quality).toContain(title);
    }
    expect(quality).toContain("回答方針・参照元・不足情報");
    expect(quality).toContain("利用状況・参照元・低評価質問・改善対象");
    expect(quality).toContain(
      "根拠が確認できない質問には無理に答えず、職員対応へ切り替えます。",
    );
  });

  test("places proof directly between the Hero and municipal pain points", () => {
    const hero = html.indexOf('class="hero');
    const quality = html.indexOf('id="quality"');
    const problems = html.indexOf('id="problems"');
    const knowledge = html.indexOf('id="knowledge"');

    expect(
      [hero, quality, problems, knowledge].every((value) => value >= 0),
    ).toBe(true);
    expect(hero).toBeLessThan(quality);
    expect(quality).toBeLessThan(problems);
    expect(problems).toBeLessThan(knowledge);
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

describe("Swarrow Chat section", () => {
  test("describes Chat as an independent municipal product", () => {
    expect(html).toMatch(/id="chat"[\s\S]*?<h2[^>]*>[\s\S]*?Swarrow Chat/);
    expect(html).toContain("自治体ホームページAI窓口");
    expect(html).toContain("ホームページやLINE");
    expect(html).toContain("自己解決");
    expect(html).toContain("/swarrow-call/chat-ui.webm");
    expect(html).not.toContain("Swarrow Call のチャット UI");
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
  });
});

describe("section order", () => {
  test("places common operations after both product details", () => {
    const chat = html.indexOf('id="chat"');
    const call = html.indexOf('id="call"');
    const operations = html.indexOf('id="operations"');

    expect(chat).toBeGreaterThan(-1);
    expect(call).toBeGreaterThan(chat);
    expect(operations).toBeGreaterThan(call);
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
      "quality",
      "problems",
      "knowledge",
      "products",
      "chat",
      "call",
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
