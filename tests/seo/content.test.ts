/// <reference types="bun" />

import { describe, expect, test } from "bun:test";
import {
  answerQuality,
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

  test("defines the approved answer-quality promise and proof", () => {
    expect(heroCopy).toEqual({
      eyebrow: "知識・回答ルール・参照元まで、フルチューニング。",
      title: ["回答精度に妥協しない。"],
      emphasis: ["フルチューニングAI。"],
      description:
        "Swarrow ChatとSwarrow Callは、自治体の公式情報と業務に合わせ、知識・回答ルール・参照元・職員への引き継ぎまで個別に設計。公開前に回答を検証し、自治体と確認した範囲から公開します。公開後も利用状況や低評価質問をもとに、回答品質を継続的に改善します。",
    });
    expect(answerQuality.kicker).toBe("Answer Quality");
    expect(answerQuality.title.join("")).toBe(
      "公開前に検証し、公開後も改善する。",
    );
    expect(answerQuality.proofs.map(({ title }) => title)).toEqual([
      "Vectaによる公開前検証",
      "自治体との公開判断",
      "継続的な品質改善",
    ]);
    expect(answerQuality.proofs).toHaveLength(3);
    expect(answerQuality.safeguard).toBe(
      "根拠が確認できない質問には無理に答えず、職員対応へ切り替えます。",
    );
  });

  test("avoids unsupported guarantees and case-specific conditions", () => {
    const publicCopy = JSON.stringify({
      answerQuality,
      heroCopy,
      pageDescription,
      painPoints,
      products,
      sharedKnowledge,
    });
    expect(publicCopy).not.toMatch(
      /半減|70%削減|100%|最高精度|No\.?1|どの自治体でも|正確性を保証|回答を保証|誤回答はありません|ハルシネーションゼロ|どんな質問にも|他社より正確|100問|月次|都城市/,
    );
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
      "公式情報",
      "公開前",
      "参照元",
      "回答ルール",
      "回答精度",
      "継続改善",
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
