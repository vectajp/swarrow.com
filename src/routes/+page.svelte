<script lang="ts">
  import { onMount } from "svelte";
  import ContactModal from "$lib/swarrow-call/ContactModal.svelte";
  import {
    callCapabilities,
    cases,
    companyOverviewLink,
    customerSuccessSteps,
    jsonLd,
    navItems,
    news,
    pageDescription,
    pageTitle,
    showCaseStudies,
    site,
  } from "$lib/swarrow-call/content";

  const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
  const REVEAL_SELECTOR = "[data-reveal]";
  const AUTOPLAY_VIDEO_SELECTOR = [
    ".hero-video",
    ".knowledge-video",
    ".workflow-video",
    ".chat-feature-video",
    ".call-feature-video",
    ".call-feature-card-video",
    ".customer-success-video",
    ".customer-success-step-video",
  ].join(", ");

  const isExternalHref = (href: string) => /^https?:\/\//.test(href);
  const playVideo = (video: HTMLVideoElement) => {
    video.muted = true;
    void video.play().catch(() => {});
  };
  const runCleanups = (cleanups: Array<() => void>) => {
    for (const cleanup of cleanups) {
      cleanup();
    }
  };

  // 演出は控えめに: reduced-motion / no-JS ではヒーロー動画を止め poster を見せる。
  let motion = $state(false);
  let scrolled = $state(false);
  let workflowVideo: HTMLVideoElement | undefined;
  let workflowVideoReady = $state(false);
  let contactModalOpen = $state(false);
  const openContactModal = () => {
    contactModalOpen = true;
  };
  const closeContactModal = () => {
    contactModalOpen = false;
  };

  onMount(() => {
    const reduce = window.matchMedia(REDUCED_MOTION_QUERY).matches;
    const cleanups: Array<() => void> = [];

    const onScroll = () => {
      scrolled = window.scrollY > 40;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    const markWorkflowVideoReady = () => {
      workflowVideoReady = true;
    };
    if (workflowVideo) {
      workflowVideo.addEventListener("loadeddata", markWorkflowVideoReady);
      workflowVideo.addEventListener("canplay", markWorkflowVideoReady);
      workflowVideo.addEventListener("error", markWorkflowVideoReady);
      if (workflowVideo.readyState >= 2) {
        markWorkflowVideoReady();
      }
      cleanups.push(() => {
        workflowVideo?.removeEventListener(
          "loadeddata",
          markWorkflowVideoReady,
        );
        workflowVideo?.removeEventListener("canplay", markWorkflowVideoReady);
        workflowVideo?.removeEventListener("error", markWorkflowVideoReady);
      });
    }

    if (reduce) {
      workflowVideoReady = true;
      return () => runCleanups(cleanups);
    }
    motion = true;

    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    );
    const videos = Array.from(
      document.querySelectorAll<HTMLVideoElement>(AUTOPLAY_VIDEO_SELECTOR),
    );
    for (const video of videos) {
      video.muted = true;
    }

    if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              revealObserver.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
      );
      for (const el of revealTargets) {
        revealObserver.observe(el);
      }
      cleanups.push(() => revealObserver.disconnect());

      const videoObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const video = entry.target as HTMLVideoElement;
            if (entry.isIntersecting) {
              playVideo(video);
            } else {
              video.pause();
            }
          }
        },
        { threshold: 0.08, rootMargin: "180px 0px" },
      );
      for (const video of videos) {
        videoObserver.observe(video);
      }
      cleanups.push(() => {
        videoObserver.disconnect();
        for (const video of videos) {
          video.pause();
        }
      });
    } else {
      for (const el of revealTargets) {
        el.classList.add("is-in");
      }
      for (const video of videos) {
        playVideo(video);
      }
    }

    return () => runCleanups(cleanups);
  });
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={pageDescription}>
  <meta name="theme-color" content="#f4f4f6">
  <link rel="canonical" href={`${site}/`}>
  <meta name="robots" content="index,follow">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Swarrow Call">
  <meta property="og:title" content={pageTitle}>
  <meta property="og:description" content={pageDescription}>
  <meta property="og:url" content={`${site}/`}>

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content={pageTitle}>
  <meta name="twitter:description" content={pageDescription}>

  {@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<div class="lp" class:motion={motion}>
  <!-- Header: 透過ヘッダー。スクロールで薄い地を敷く。 -->
  <header class="sc-header" class:scrolled={scrolled}>
    <a class="brand" href="#top" aria-label="Swarrow Call トップへ">
      <img
        class="brand-logo"
        src="/swarrow/logo.svg"
        alt=""
        width="257"
        height="44"
        decoding="async"
      >
    </a>

    <nav class="sc-nav" aria-label="グローバルナビゲーション">
      {#each navItems as item (item.label)}
        <a
          class="sc-nav-link"
          href={item.href}
          target={isExternalHref(item.href) ? "_blank" : undefined}
          rel={isExternalHref(item.href) ? "noopener noreferrer" : undefined}
        >
          {item.label}
          {#if isExternalHref(item.href)}
            <span class="ext" aria-hidden="true">↗</span>
          {/if}
        </a>
      {/each}
      <button type="button" class="sc-cta" onclick={openContactModal}>
        お問い合わせ
      </button>
    </nav>
  </header>

  <main id="top">
    <!-- Hero: 8秒ループのアイソメトリック動画を大きく配置。動画背景とページ背景を合わせ、外縁の切れ目を消す -->
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-copy">
          <h1 class="hero-title">
            <span>色々なカタチの</span>
            <span class="hero-title-nowrap">知識を未来につなぐ。</span>
          </h1>
          <p class="hero-sub">
            <span>知識を元に人のように自然に回答。</span>
            <span>回答するほど組織の知識としてどんどんたまる仕組み。</span>
          </p>
        </div>

        <div class="hero-media" aria-hidden="true">
          <video
            class="hero-video"
            poster="/swarrow-call/hero-city-poster.webp"
            muted
            loop
            playsinline
            preload="metadata"
            width="1280"
            height="720"
          >
            <source src="/swarrow-call/hero-city.webm" type="video/webm">
            <source src="/swarrow-call/hero-city.mp4" type="video/mp4">
            <img
              class="hero-video-fallback"
              src="/swarrow-call/hero-city.webp"
              alt=""
              width="960"
              height="540"
              loading="eager"
              decoding="async"
            >
          </video>
        </div>

        <nav class="hero-mobile-actions" aria-label="小画面用の重要な導線">
          <button
            type="button"
            class="hero-mobile-contact"
            onclick={openContactModal}
          >
            お問い合わせ
          </button>
          <a
            class="hero-mobile-company"
            href={companyOverviewLink.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="{companyOverviewLink.label}を別タブで開く"
          >
            {companyOverviewLink.label}
            <span class="ext" aria-hidden="true">↗</span>
          </a>
        </nav>

        <a class="hero-news" href="#news">
          <span class="hero-news-head">
            <span class="hero-news-date">2026.07.07</span>
            <span class="hero-news-badge">最新情報</span>
          </span>
          <span class="hero-news-text">
            Swarrow Call
            オンラインセミナー「役所の箱ファイルの電子化作戦」を開催。
          </span>
          <span class="hero-news-go" aria-hidden="true">↗</span>
        </a>
      </div>

      <div class="hero-fade"></div>
    </section>

    <!-- Knowledge: 入力された知識を AI が使える形へ変換し、電話やチャットへ出力する流れ。 -->
    <section class="knowledge">
      <div class="knowledge-inner">
        <figure class="knowledge-visual" data-reveal>
          <video
            class="knowledge-video"
            poster="/swarrow-call/knowledge-flow-alpha.png"
            muted
            loop
            playsinline
            preload="none"
            width="1280"
            height="720"
            aria-label="ドキュメント、データベース、Web、電話、チャットを Swarrow Call 基盤がつなぐ知識活用イメージ"
          >
            <source
              src="/swarrow-call/knowledge-flow-alpha.webm"
              type="video/webm"
            >
            <img
              class="knowledge-image"
              src="/swarrow-call/knowledge-flow-alpha.png"
              alt="ドキュメント、データベース、Web、電話、チャットを Swarrow Call 基盤がつなぐ知識活用イメージ"
              width="1672"
              height="941"
              loading="lazy"
              decoding="async"
            >
          </video>
        </figure>

        <div class="knowledge-copy" data-reveal>
          <p class="knowledge-en">Knowledge Pipeline</p>
          <h2 class="knowledge-title">
            <span>知識を、AIが動ける</span>
            <span>データへ。</span>
          </h2>
          <p class="knowledge-lead">
            ドキュメント、データベース、画像など、組織に散らばる知識を Swarrow
            Call基盤がAI
            に最適なベクトルデータへ変換。弊社独自の業務ノウハウで検索精度と回答粒度をチューニングし、必要な知識を正確に拡張します。
          </p>
          <ul class="knowledge-flow">
            <li>
              <span class="knowledge-flow-kicker">Input</span>
              <span>
                <strong>あらゆる知識を取り込む</strong>
                <small>文書、FAQ、業務データ、画像資料をまとめて活用。</small>
              </span>
            </li>
            <li>
              <span class="knowledge-flow-kicker">Tune</span>
              <span>
                <strong>業務ノウハウで磨き込む</strong>
                <small
                  >現場の言い回しや判断基準に合わせて回答品質を調整。</small
                >
              </span>
            </li>
            <li>
              <span class="knowledge-flow-kicker">Output</span>
              <span>
                <strong>電話・チャットで届け、自動化する</strong>
                <small
                  >問い合わせ対応や案内業務を、媒体を問わず一気通貫で支援。</small
                >
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="knowledge-curve-bg" aria-hidden="true">
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M-80 330C80 128 266 88 498 136C726 184 812 188 1008 76C1214 -42 1378 24 1508 214V900H-80Z"
          ></path>
        </svg>
      </div>
    </section>

    <!-- Workflow: 初期設定後に職員がノーコードで対話シナリオを更新する運用イメージ。 -->
    <section class="workflow">
      <div class="feature-band feature-band--mist">
        <div class="workflow-inner">
          <div class="workflow-copy" data-reveal>
            <p class="workflow-en">No-Code Flow Editor</p>
            <h2 class="workflow-title">
              <span>会話フローを、</span>
              <span>職員の手で更新。</span>
            </h2>
            <p class="workflow-lead">
              初期設定が済めば、職員自身で会話フローを更新し、対話シナリオを画面上で簡単に設計・編集できます。コードを書かずに分岐や案内文を見直せるため、住民からの問い合わせや制度変更に合わせて、窓口の運用をすばやく改善できます。
            </p>
            <ul class="workflow-list">
              <li>
                <strong>画面上で流れを組み替える</strong>
                <small>質問、回答、分岐、案内文を見ながら編集。</small>
              </li>
              <li>
                <strong>現場の気づきをすぐ反映</strong>
                <small>問い合わせの多い表現や案内不足を職員が更新。</small>
              </li>
              <li>
                <strong>小さな修正は職員が対応</strong>
                <small>日々の軽微な改善はノーコードで完結。</small>
              </li>
            </ul>
          </div>

          <figure class="workflow-media" data-reveal>
            <video
              class="workflow-video"
              poster="/swarrow-call/workflow-editor-alpha.png"
              muted
              loop
              playsinline
              preload="none"
              width="1280"
              height="720"
              bind:this={workflowVideo}
              class:ready={workflowVideoReady}
              aria-label="画面上で会話フローと対話シナリオを設計・編集するノーコード編集画面"
            >
              <source
                src="/swarrow-call/workflow-editor-alpha.webm"
                type="video/webm"
              >
              <img
                class="workflow-image"
                src="/swarrow-call/workflow-editor-alpha.png"
                alt="画面上で会話フローと対話シナリオを設計・編集するノーコード編集画面"
                width="1280"
                height="720"
                loading="lazy"
                decoding="async"
              >
            </video>
          </figure>
        </div>
      </div>

      <div class="feature-band feature-band--paper">
        <div
          class="section-curve-bg section-curve-bg--paper"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1440 1600"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M-80 330C80 128 266 88 498 136C726 184 812 188 1008 76C1214 -42 1378 24 1508 214V1600H-80Z"
            ></path>
          </svg>
        </div>
        <div class="chat-feature" data-reveal>
          <figure class="chat-feature-media">
            <video
              class="chat-feature-video"
              poster="/swarrow-call/chat-ui.webp"
              muted
              loop
              playsinline
              preload="none"
              width="1280"
              height="720"
              aria-label="ホームページやチャットアプリに設置できる Swarrow Call のチャット UI"
            >
              <source src="/swarrow-call/chat-ui.webm" type="video/webm">
              <img
                class="chat-feature-image"
                src="/swarrow-call/chat-ui.webp"
                alt="ホームページやチャットアプリに設置できる Swarrow Call のチャット UI"
                width="1672"
                height="941"
                loading="lazy"
                decoding="async"
              >
            </video>
          </figure>

          <div class="chat-feature-copy">
            <p class="chat-feature-en">Chat Knowledge Hub</p>
            <h3 class="chat-feature-title">
              <span>チャット窓口を、</span>
              <span>どこにでも。</span>
            </h3>
            <p class="chat-feature-lead">
              Swarrow Call のチャット UI
              は、ホームページ、LINE、既存のチャットアプリなど、住民が使い慣れた場所に配置できます。文書、FAQ、業務データ、画像資料に加え、部署に長年蓄積された紙のファイルも知識として取り込み、問い合わせ対応や案内業務に活かせます。
            </p>
            <ul class="chat-feature-list">
              <li>
                <strong>あらゆる情報を知識化</strong>
                <small>
                  制度資料、手順書、紙の台帳までインポートし、部署に残すべき知識として整理。
                </small>
              </li>
              <li>
                <strong>会話から業務へつなぐ</strong>
                <small>
                  回答だけで終わらず、職員への電話取次ぎ、申請案内、予約などのワークフローを自由に設定。
                </small>
              </li>
              <li>
                <strong>知識を部署の資産にする</strong>
                <small>
                  担当者が変わっても、蓄積された判断基準や案内内容を次の職員へ引き継げる仕組みを作ります。
                </small>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="feature-band feature-band--mist feature-band--last">
        <div
          class="section-curve-bg section-curve-bg--mist section-curve-bg--flip"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1440 1600"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M-80 330C80 128 266 88 498 136C726 184 812 188 1008 76C1214 -42 1378 24 1508 214V1600H-80Z"
            ></path>
          </svg>
        </div>
        <div class="call-feature" data-reveal>
          <div class="call-feature-copy">
            <p class="call-feature-en">Phone Call Desk</p>
            <h3 class="call-feature-title">
              <span>電話の問い合わせも、</span>
              <span>同じ知識で受ける。</span>
            </h3>
            <p class="call-feature-lead">
              Swarrow Call
              の電話コール機能は、チャットと同じ知識基盤を音声応対にも展開できます。住民はいつもの電話から要件を伝え、AI
              が一次案内し、必要な内容だけ職員へつなげます。
            </p>
            <ul class="call-feature-list">
              <li>
                <strong>電話でも同じ知識を参照</strong>
                <small>
                  FAQ、手順書、業務データをもとに、音声でも案内内容をそろえます。
                </small>
              </li>
              <li>
                <strong>必要なときだけ職員へ連携</strong>
                <small>
                  内容や緊急度に応じて、要件を整理したうえで担当者へ取り次ぎます。
                </small>
              </li>
              <li>
                <strong>応対を次の改善につなげる</strong>
                <small>
                  問い合わせ傾向を見直し、FAQ や会話フローの更新に活かせます。
                </small>
              </li>
            </ul>
          </div>

          <figure class="call-feature-media">
            <div class="call-feature-window">
              <span class="call-feature-window-bar" aria-hidden="true">
                <i></i><i></i><i></i>
              </span>
              <video
                class="call-feature-video"
                poster="/swarrow-call/operator-call-poster.webp"
                muted
                loop
                playsinline
                preload="none"
                width="1280"
                height="720"
                aria-label="電話問い合わせを受けるオペレーターのイメージ"
              >
                <source
                  src="/swarrow-call/operator-call.webm"
                  type="video/webm"
                >
                <source src="/swarrow-call/operator-call.mp4" type="video/mp4">
                <img
                  class="call-feature-image"
                  src="/swarrow-call/operator-call-poster.webp"
                  alt="電話問い合わせを受けるオペレーターのイメージ"
                  width="1280"
                  height="720"
                  loading="lazy"
                  decoding="async"
                >
              </video>
            </div>
          </figure>

          <div class="call-feature-cards">
            {#each callCapabilities as capability (capability.title)}
              <article class="call-feature-card">
                <video
                  class="call-feature-card-video"
                  poster={capability.poster}
                  muted
                  loop
                  playsinline
                  preload="none"
                  width="1536"
                  height="1024"
                  aria-label={capability.alt}
                >
                  <source src={capability.video} type="video/webm">
                  <img
                    class="call-feature-card-image"
                    src={capability.poster}
                    alt={capability.alt}
                    width="1536"
                    height="1024"
                    loading="lazy"
                    decoding="async"
                  >
                </video>
                <div class="call-feature-card-body">
                  <h4 class="call-feature-card-title">{capability.title}</h4>
                  <p class="call-feature-card-text">{capability.body}</p>
                </div>
              </article>
            {/each}
          </div>
        </div>
      </div>
    </section>

    <!-- Customer Success: 専任チームが初期構築から運用改善まで伴走する支援体制。 -->
    <section class="function">
      <div class="function-curve-bg" aria-hidden="true">
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M-80 330C80 128 266 88 498 136C726 184 812 188 1008 76C1214 -42 1378 24 1508 214V900H-80Z"
          ></path>
        </svg>
      </div>
      <div class="customer-success-hero" data-reveal>
        <div class="function-head">
          <p class="function-en">Customer Success</p>
          <h2 class="function-ja">カスタマーサクセス</h2>
          <p class="customer-success-lead">
            成果を出すことにコミットする、専門チームの徹底した伴走サポート。
          </p>
          <p class="customer-success-body">
            Swarrow Call
            は、導入して終わりのサービスではありません。すべてのお客様に専任のカスタマーサクセスチームがつき、初期構築から運用改善まで成果に向けて伴走します。
          </p>
        </div>

        <figure class="customer-success-media">
          <video
            class="customer-success-video"
            poster="/swarrow-call/customer-success-step-up-poster.webp"
            muted
            loop
            playsinline
            preload="none"
            width="1280"
            height="720"
            aria-label="段階的に成果へ向かうカスタマーサクセス支援のイメージ"
          >
            <source
              src="/swarrow-call/customer-success-step-up.webm"
              type="video/webm"
            >
            <img
              class="customer-success-video-fallback"
              src="/swarrow-call/customer-success-step-up-poster.webp"
              alt="段階的に成果へ向かうカスタマーサクセス支援のイメージ"
              width="1280"
              height="720"
              loading="lazy"
              decoding="async"
            >
          </video>
        </figure>
      </div>

      <ol class="customer-success-steps">
        {#each customerSuccessSteps as step (step.phase)}
          <li class="customer-success-step" data-reveal>
            <figure class="customer-success-step-media">
              <video
                class="customer-success-step-video"
                poster={step.poster}
                muted
                loop
                playsinline
                preload="none"
                width="1280"
                height="720"
                aria-label={step.alt}
              >
                <source src={step.video} type="video/webm">
                <img
                  class="customer-success-step-image"
                  src={step.poster}
                  alt={step.alt}
                  width="1280"
                  height="720"
                  loading="lazy"
                  decoding="async"
                >
              </video>
            </figure>
            <div class="customer-success-step-copy">
              <h3 class="customer-success-step-title">{step.title}</h3>
              <p class="customer-success-step-body">{step.body}</p>
            </div>
          </li>
        {/each}
      </ol>
    </section>

    {#if showCaseStudies}
      <!-- Case study: 白地。導入事例(差し替え用サンプル)。 -->
      <section id="case" class="case">
        <div
          class="section-curve-bg section-curve-bg--paper section-curve-bg--flip"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1440 1600"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M-80 330C80 128 266 88 498 136C726 184 812 188 1008 76C1214 -42 1378 24 1508 214V1600H-80Z"
            ></path>
          </svg>
        </div>
        <div class="case-head">
          <p class="case-en">Case study</p>
          <h2 class="case-title">導入事例と利用実績</h2>
        </div>

        <div class="case-grid">
          {#each cases as c (c.town)}
            <article class="case-card" data-reveal>
              <img
                class="case-card-photo"
                src={c.img}
                alt="{c.town}の取り組みイメージ(イメージイラスト)"
                width="1200"
                height="800"
                loading="lazy"
                decoding="async"
              >
              <div class="case-card-body">
                <span class="case-card-town">{c.town}</span>
                <h3 class="case-card-title">{c.title}</h3>
              </div>
            </article>
          {/each}
        </div>
      </section>
    {/if}

    <!-- News -->
    <section id="news" class="news">
      <div class="section-curve-bg section-curve-bg--mist" aria-hidden="true">
        <svg
          viewBox="0 0 1440 1600"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M-80 330C80 128 266 88 498 136C726 184 812 188 1008 76C1214 -42 1378 24 1508 214V1600H-80Z"
          ></path>
        </svg>
      </div>
      <div class="news-head">
        <p class="news-en">News</p>
        <h2 class="news-title">お知らせ</h2>
      </div>
      <ul class="news-list">
        {#each news as n (n.date)}
          <li class="news-item" data-reveal>
            <time class="news-date">{n.date}</time>
            <span class="news-text">{n.text}</span>
            <span class="news-go" aria-hidden="true">↗</span>
          </li>
        {/each}
      </ul>
    </section>

    <!-- CTA -->
    <section id="contact" class="cta">
      <div class="cta-inner" data-reveal>
        <h2 class="cta-title">
          <span>AI チャットボット・AI コールセンターを、</span>
          <span>もっと身近に。</span>
        </h2>
        <p class="cta-sub">
          窓口対応の課題に合わせて、導入相談からデモまでスピーディーにご案内します。まずは気軽にご相談ください。
        </p>
        <button type="button" class="cta-btn" onclick={openContactModal}>
          導入相談・デモを依頼する<span class="ext">↗</span>
        </button>
      </div>
    </section>
  </main>

  <footer id="footer" class="sc-footer">
    <div class="foot-top">
      <div class="foot-brand">
        <img
          class="foot-logo"
          src="/swarrow/footer-logo.svg"
          alt="Swarrow Call"
          width="294"
          height="205"
          decoding="async"
        >
      </div>
      <p class="foot-addr">
        〒150-0002<br>
        東京都渋谷区渋谷2-19-15<br>
        宮益坂ビルディング609
      </p>
    </div>
    <nav class="foot-links" aria-label="フッターナビゲーション">
      <button type="button" class="foot-link-btn" onclick={openContactModal}>
        お問い合わせ
      </button>
      <a href="#footer">情報セキュリティ方針</a>
      <a href="#footer">個人情報保護方針</a>
      <a href="#footer">ウェブサイト利用規約</a>
    </nav>
    <p class="foot-copy">© Swarrow Call</p>
  </footer>

  <ContactModal open={contactModalOpen} onClose={closeContactModal} />
</div>

<style>
  :global(body) {
    margin: 0;
    background: #f4f4f6;
  }

  .lp {
    --bg: #f4f4f6;
    --ink: #333;
    --ink-soft: #5a5f63;
    --paper: #fff;
    --sage: #c6d0dc;
    --sage-light: #e4e9f0;
    --sage-deep: #092045;
    --curve-sage: #e5eef5;
    --navy: #092045;
    --navy-deep: #061936;
    --line: rgba(51, 51, 51, 0.14);
    --coral: #e07a66;

    background: var(--bg);
    color: var(--ink);
    font-family:
      system-ui, "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Noto Sans JP",
      "Yu Gothic", Meiryo, sans-serif;
    line-height: 1.9;
    -webkit-font-smoothing: antialiased;
    overflow-x: clip;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  .lp :where(a, button):focus-visible {
    outline: 3px solid color-mix(in srgb, var(--coral) 72%, white);
    outline-offset: 4px;
    border-radius: 6px;
  }
  #top,
  #case,
  #news,
  #contact,
  #footer {
    scroll-margin-top: 5.5rem;
  }

  .ext {
    display: inline-block;
    margin-left: 0.25em;
    font-size: 0.82em;
    transform: translateY(-0.05em);
  }

  /* ===== Header ===== */
  .sc-header {
    position: sticky;
    top: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    padding: 1.1rem clamp(1.2rem, 4vw, 3.5rem);
    transition:
      background 0.3s ease,
      box-shadow 0.3s ease;
  }
  .sc-header.scrolled {
    background: rgba(244, 244, 246, 0.86);
    backdrop-filter: blur(10px);
    box-shadow: 0 1px 0 var(--line);
  }
  .brand {
    display: inline-flex;
    align-items: center;
    flex: 0 0 auto;
  }
  .brand-logo {
    display: block;
    width: clamp(145px, 16vw, 190px);
    height: auto;
  }
  .sc-nav {
    display: flex;
    align-items: center;
    gap: clamp(0.8rem, 2vw, 1.9rem);
  }
  .sc-nav-link {
    font-size: 0.95rem;
    font-weight: 600;
    white-space: nowrap;
  }
  .sc-nav-link:hover {
    color: var(--sage-deep);
  }
  .sc-cta {
    border: none;
    font: inherit;
    cursor: pointer;
    padding: 0.7rem 1.5rem;
    border-radius: 999px;
    background: var(--navy);
    color: #fff;
    font-weight: 700;
    font-size: 0.95rem;
    white-space: nowrap;
    transition:
      transform 0.2s ease,
      background 0.2s ease;
  }
  .sc-cta:hover {
    background: var(--navy-deep);
    transform: translateY(-1px);
  }

  /* ===== Hero(アイソメトリック動画を中央のアートワークとして配置。動画背景と地色を合わせて継ぎ目を消す) ===== */
  .hero {
    position: relative;
    min-height: 660px;
    overflow: hidden;
    isolation: isolate;
    background: var(--bg);
  }
  .hero-media {
    position: relative;
    z-index: 1;
    display: flex;
    justify-self: stretch;
    justify-content: center;
    width: 100%;
    min-width: 0;
    transform: translateX(0);
  }
  .hero-video,
  .hero-video-fallback {
    position: relative;
    z-index: 1;
    display: block;
    width: min(1280px, 132%);
    max-width: none;
    height: auto;
    background: var(--bg);
    filter: brightness(1.055) contrast(0.99);
    -webkit-mask-image:
      linear-gradient(
        90deg,
        transparent 0,
        #000 11%,
        #000 91%,
        transparent 100%
      ),
      linear-gradient(
        180deg,
        transparent 0,
        #000 10%,
        #000 92%,
        transparent 100%
      );
    -webkit-mask-composite: source-in;
    mask-image:
      linear-gradient(
        90deg,
        transparent 0,
        #000 11%,
        #000 91%,
        transparent 100%
      ),
      linear-gradient(
        180deg,
        transparent 0,
        #000 10%,
        #000 92%,
        transparent 100%
      );
    mask-composite: intersect;
    object-fit: contain;
  }
  .hero-fade {
    display: none;
  }

  .hero-inner {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: minmax(320px, 36%) minmax(0, 1fr);
    align-items: start;
    gap: clamp(0.75rem, 2vw, 1.75rem);
    max-width: 1500px;
    min-height: 660px;
    margin: 0 auto;
    padding: 1.25rem clamp(1.2rem, 4vw, 3.5rem) 3.5rem;
  }
  .hero-copy {
    position: relative;
    z-index: 2;
    align-self: start;
    min-width: 0;
    height: 15rem;
    margin-top: 9rem;
  }
  .hero-title {
    margin: 0;
    font-size: clamp(1.9rem, 3.4vw, 3.2rem);
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: 0.14em;
    color: var(--ink);
  }
  .hero-title span {
    display: block;
  }
  .hero-title-nowrap {
    white-space: nowrap;
  }
  .hero-sub {
    margin: 1.6rem 0 0;
    font-size: clamp(0.82rem, 1.2vw, 1rem);
    letter-spacing: 0.03em;
    color: var(--ink-soft);
  }
  .hero-sub span {
    display: block;
    white-space: nowrap;
  }
  .hero-news {
    position: absolute;
    right: clamp(1.2rem, 4vw, 3.5rem);
    bottom: clamp(10rem, 14vw, 12rem);
    z-index: 4;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.4rem 1rem;
    align-items: center;
    width: min(320px, 40vw);
    box-sizing: border-box;
    padding: 1rem 1.2rem;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(6px);
    box-shadow: 0 10px 30px rgba(9, 32, 69, 0.1);
    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease;
  }
  .hero-news:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 40px rgba(9, 32, 69, 0.16);
  }
  .hero-news-head {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
  .hero-news-date {
    font-weight: 700;
    font-size: 0.9rem;
  }
  .hero-news-badge {
    padding: 0.15rem 0.55rem;
    border: 1px solid var(--ink);
    border-radius: 4px;
    font-size: 0.72rem;
    font-weight: 700;
  }
  .hero-news-text {
    font-size: 0.82rem;
    line-height: 1.7;
    color: var(--ink-soft);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .hero-news-go {
    align-self: end;
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    border: 1px solid var(--ink);
    border-radius: 999px;
    font-size: 1.1rem;
  }
  .hero-mobile-actions {
    display: none;
  }

  /* ===== Knowledge ===== */
  .knowledge {
    position: relative;
    z-index: 1;
    isolation: isolate;
    overflow: hidden;
    margin-top: -10.5rem;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0) 1rem,
      rgba(255, 255, 255, 0.7) 3.75rem,
      var(--paper) 5.75rem,
      var(--paper) 100%
    );
    padding: clamp(11.25rem, 12.5vw, 12rem) clamp(1.2rem, 4vw, 3.5rem)
      clamp(3rem, 7vw, 6rem);
  }
  .knowledge-inner {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: minmax(0, 1.08fr) minmax(340px, 0.92fr);
    gap: clamp(2rem, 5vw, 4.5rem);
    align-items: center;
    max-width: 1180px;
    margin: 0 auto;
  }
  .knowledge-visual {
    position: relative;
    left: clamp(2.5rem, 5vw, 4.5rem);
    justify-self: end;
    width: min(122%, 780px);
    margin: 0;
    min-width: 0;
  }
  .knowledge-video,
  .knowledge-image {
    display: block;
    width: 100%;
    height: auto;
    background: transparent;
    filter: brightness(1.02);
  }
  .knowledge-copy {
    min-width: 0;
  }
  .knowledge-en {
    margin: 0 0 0.5rem;
    color: var(--sage-deep);
    font-family: "Georgia", "Times New Roman", serif;
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    font-weight: 700;
  }
  .knowledge-title {
    margin: 0;
    color: var(--sage-deep);
    font-size: clamp(1.55rem, 3vw, 2.35rem);
    font-weight: 700;
    letter-spacing: 0.06em;
    line-height: 1.55;
  }
  .knowledge-title span {
    display: block;
  }
  .knowledge-lead {
    margin: 1.2rem 0 1.6rem;
    color: var(--ink);
    font-size: clamp(0.95rem, 1.25vw, 1.05rem);
    line-height: 2;
  }
  .knowledge-flow {
    display: grid;
    gap: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    border-bottom: 1px solid var(--line);
  }
  .knowledge-flow li {
    display: grid;
    grid-template-columns: 5.2rem 1fr;
    gap: 1rem;
    padding: 1rem 0;
    border-top: 1px solid var(--line);
  }
  .knowledge-flow-kicker {
    color: var(--sage-deep);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .knowledge-flow strong,
  .knowledge-flow small {
    display: block;
  }
  .knowledge-flow strong {
    font-size: 1rem;
    line-height: 1.7;
  }
  .knowledge-flow small {
    margin-top: 0.25rem;
    color: var(--ink-soft);
    font-size: 0.88rem;
    line-height: 1.8;
  }
  .knowledge-curve-bg {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    height: clamp(15rem, 27vw, 26rem);
    color: var(--bg);
    pointer-events: none;
  }
  .knowledge-curve-bg svg {
    display: block;
    width: 100%;
    height: 100%;
  }
  .knowledge-curve-bg path {
    fill: currentColor;
  }

  /* ===== Workflow ===== */
  .workflow {
    position: relative;
    isolation: isolate;
    overflow: visible;
    background: transparent;
    padding: 0;
  }
  .feature-band {
    --band-bg: var(--bg);

    position: relative;
    isolation: isolate;
    background: transparent;
    padding: clamp(4.25rem, 7vw, 6.5rem) clamp(1.2rem, 4vw, 3.5rem);
  }
  .section-curve-bg {
    position: absolute;
    top: clamp(-4.5rem, -6vw, -2.5rem);
    left: var(--curve-left, 50%);
    z-index: 0;
    width: var(--curve-width, 100vw);
    height: calc(100% + clamp(6rem, 10vw, 9rem));
    color: var(--band-bg);
    pointer-events: none;
    transform: translateX(-50%);
  }
  .section-curve-bg svg {
    display: block;
    width: 100%;
    height: 100%;
  }
  .section-curve-bg path {
    fill: currentColor;
  }
  .section-curve-bg--flip svg {
    transform: scaleX(-1);
    transform-origin: center;
  }
  .section-curve-bg--mist {
    color: var(--bg);
  }
  .section-curve-bg--paper {
    color: var(--paper);
  }
  .feature-band > :not(.section-curve-bg) {
    position: relative;
    z-index: 1;
  }
  .feature-band + .feature-band {
    margin-top: clamp(-1.4rem, -1.8vw, -0.6rem);
    padding-top: clamp(5rem, 8vw, 7.25rem);
  }
  .feature-band--paper {
    --band-bg: var(--paper);
  }
  .feature-band--mist {
    --band-bg: var(--bg);
  }
  .feature-band--last {
    --curve-left: 52%;
    --curve-width: 124vw;

    padding-bottom: clamp(5rem, 10vw, 8.5rem);
  }
  .workflow-inner {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(340px, 0.54fr) minmax(0, 0.46fr);
    gap: clamp(2rem, 4.5vw, 4rem);
    align-items: center;
    max-width: 1900px;
    margin: 0 auto;
  }
  .workflow-copy {
    min-width: 0;
  }
  .workflow-en {
    margin: 0 0 0.5rem;
    color: var(--sage-deep);
    font-family: "Georgia", "Times New Roman", serif;
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    font-weight: 700;
  }
  .workflow-title {
    margin: 0;
    color: var(--sage-deep);
    font-size: clamp(1.45rem, 2.8vw, 2.2rem);
    font-weight: 700;
    letter-spacing: 0.06em;
    line-height: 1.55;
  }
  .workflow-title span {
    display: block;
  }
  .workflow-lead {
    margin: 1.2rem 0 1.5rem;
    color: var(--ink);
    font-size: clamp(0.95rem, 1.25vw, 1.05rem);
    line-height: 2;
  }
  .workflow-list {
    display: grid;
    gap: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    border-bottom: 1px solid var(--line);
  }
  .workflow-list li {
    padding: 0.95rem 0;
    border-top: 1px solid var(--line);
  }
  .workflow-list strong,
  .workflow-list small {
    display: block;
  }
  .workflow-list strong {
    color: var(--sage-deep);
    font-size: 1rem;
    line-height: 1.7;
  }
  .workflow-list small {
    margin-top: 0.2rem;
    color: var(--ink-soft);
    font-size: 0.88rem;
    line-height: 1.8;
  }
  .workflow-media {
    position: relative;
    justify-self: stretch;
    align-self: center;
    min-width: 0;
    margin: 0;
    background: transparent;
    isolation: isolate;
    overflow: visible;
    width: min(114%, 960px);
    translate: clamp(-3.2rem, -2.5vw, -1.25rem) 0;
  }
  .workflow-media::before {
    content: "";
    position: absolute;
    right: -5%;
    bottom: -14%;
    left: -3%;
    z-index: 0;
    height: 80%;
    border-radius: 57% 43% 52% 48% / 58% 56% 44% 42%;
    background: radial-gradient(
      ellipse at 51% 52%,
      var(--bg) 0,
      color-mix(in srgb, var(--bg) 80%, transparent) 46%,
      color-mix(in srgb, var(--bg) 38%, transparent) 74%,
      transparent 100%
    );
    box-shadow: 0 24px 42px rgba(9, 32, 69, 0.04);
    filter: blur(3px);
    mask-image: radial-gradient(
      ellipse at 50% 54%,
      #000 0,
      #000 61%,
      rgba(0, 0, 0, 0.68) 78%,
      transparent 100%
    );
    pointer-events: none;
    transform: rotate(-1deg);
    -webkit-mask-image: radial-gradient(
      ellipse at 50% 54%,
      #000 0,
      #000 61%,
      rgba(0, 0, 0, 0.68) 78%,
      transparent 100%
    );
  }
  .workflow-media::after {
    content: "";
    position: absolute;
    right: 9%;
    bottom: -7%;
    left: 10%;
    z-index: 0;
    height: 20%;
    border-radius: 49% 51% 50% 50% / 50% 50% 54% 46%;
    background: radial-gradient(
      ellipse at 50% 58%,
      rgba(9, 32, 69, 0.105) 0,
      rgba(9, 32, 69, 0.05) 50%,
      rgba(9, 32, 69, 0) 84%
    );
    filter: blur(18px);
    opacity: 0.52;
    pointer-events: none;
    transform: rotate(0.8deg) translateY(8%);
  }
  .workflow-video,
  .workflow-image {
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    background: transparent;
    filter: brightness(1.018);
    object-fit: cover;
    scale: 1.36;
    transform-origin: center;
    transition: opacity 0.18s ease;
  }
  .motion .workflow-video:not(.ready) {
    opacity: 0;
    transition: none;
  }

  .chat-feature {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 1.24fr) minmax(360px, 0.76fr);
    gap: clamp(2rem, 4vw, 4.5rem);
    align-items: center;
    max-width: 1420px;
    margin: 0 auto;
  }
  .chat-feature-media {
    min-width: 0;
    margin: 0;
  }
  .chat-feature-video,
  .chat-feature-image {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    background: transparent;
  }
  .chat-feature-copy {
    justify-self: end;
    min-width: 0;
    max-width: 560px;
  }
  .chat-feature-en {
    margin: 0 0 0.55rem;
    color: var(--sage-deep);
    font-family: "Georgia", "Times New Roman", serif;
    font-size: clamp(1.05rem, 1.8vw, 1.35rem);
    font-weight: 700;
  }
  .chat-feature-title {
    margin: 0;
    color: var(--sage-deep);
    font-size: clamp(1.45rem, 2.8vw, 2.2rem);
    font-weight: 700;
    letter-spacing: 0.06em;
    line-height: 1.55;
  }
  .chat-feature-title span {
    display: block;
  }
  .chat-feature-lead {
    margin: 1.2rem 0 1.45rem;
    color: var(--ink);
    font-size: clamp(0.95rem, 1.2vw, 1.05rem);
    line-height: 2;
  }
  .chat-feature-list {
    display: grid;
    gap: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    border-bottom: 1px solid rgba(85, 113, 135, 0.28);
  }
  .chat-feature-list li {
    padding: 0.95rem 0;
    border-top: 1px solid rgba(85, 113, 135, 0.28);
  }
  .chat-feature-list strong,
  .chat-feature-list small {
    display: block;
  }
  .chat-feature-list strong {
    color: var(--sage-deep);
    font-size: 1rem;
    line-height: 1.7;
  }
  .chat-feature-list small {
    margin-top: 0.2rem;
    color: var(--ink-soft);
    font-size: 0.88rem;
    line-height: 1.8;
  }

  .call-feature {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(360px, 0.76fr) minmax(0, 1.24fr);
    gap: clamp(2rem, 4vw, 4.5rem);
    align-items: center;
    max-width: 1420px;
    margin: 0 auto;
  }
  .call-feature-copy {
    min-width: 0;
    max-width: 560px;
  }
  .call-feature-en {
    margin: 0 0 0.55rem;
    color: var(--sage-deep);
    font-family: "Georgia", "Times New Roman", serif;
    font-size: clamp(1.05rem, 1.8vw, 1.35rem);
    font-weight: 700;
  }
  .call-feature-title {
    margin: 0;
    color: var(--sage-deep);
    font-size: clamp(1.45rem, 2.8vw, 2.2rem);
    font-weight: 700;
    letter-spacing: 0.06em;
    line-height: 1.55;
  }
  .call-feature-title span {
    display: block;
  }
  .call-feature-lead {
    margin: 1.2rem 0 1.45rem;
    color: var(--ink);
    font-size: clamp(0.95rem, 1.2vw, 1.05rem);
    line-height: 2;
  }
  .call-feature-list {
    display: grid;
    gap: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    border-bottom: 1px solid rgba(85, 113, 135, 0.28);
  }
  .call-feature-list li {
    padding: 0.95rem 0;
    border-top: 1px solid rgba(85, 113, 135, 0.28);
  }
  .call-feature-list strong,
  .call-feature-list small {
    display: block;
  }
  .call-feature-list strong {
    color: var(--sage-deep);
    font-size: 1rem;
    line-height: 1.7;
  }
  .call-feature-list small {
    margin-top: 0.2rem;
    color: var(--ink-soft);
    font-size: 0.88rem;
    line-height: 1.8;
  }
  .call-feature-media {
    position: relative;
    min-width: 0;
    margin: 0;
    isolation: isolate;
  }
  .call-feature-media::before {
    content: "";
    position: absolute;
    inset: 8% 2% -8% 4%;
    z-index: 0;
    border-radius: 56% 44% 48% 52% / 54% 50% 50% 46%;
    background: radial-gradient(
      ellipse at 48% 48%,
      rgba(255, 255, 255, 0.94) 0,
      rgba(255, 255, 255, 0.76) 48%,
      rgba(198, 208, 220, 0.34) 72%,
      rgba(198, 208, 220, 0) 100%
    );
    filter: blur(6px);
    pointer-events: none;
    transform: rotate(1.5deg);
  }
  .call-feature-window {
    position: relative;
    z-index: 1;
    overflow: hidden;
    padding: clamp(0.72rem, 1.5vw, 1rem);
    border: 1px solid rgba(85, 113, 135, 0.2);
    border-radius: 14px;
    background: linear-gradient(
      150deg,
      rgba(255, 255, 255, 0.96) 0,
      rgba(255, 255, 255, 0.88) 52%,
      rgba(228, 233, 240, 0.72) 100%
    );
    box-shadow:
      0 28px 70px rgba(9, 32, 69, 0.11),
      inset 0 1px 0 rgba(255, 255, 255, 0.92);
  }
  .call-feature-window-bar {
    display: flex;
    gap: 0.42rem;
    align-items: center;
    height: 0.9rem;
    margin: 0 0 0.65rem;
  }
  .call-feature-window-bar i {
    display: block;
    width: 0.46rem;
    height: 0.46rem;
    border-radius: 999px;
    background: rgba(85, 113, 135, 0.28);
  }
  .call-feature-window-bar i:first-child {
    background: rgba(224, 122, 102, 0.72);
  }
  .call-feature-video,
  .call-feature-image {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    border-radius: 10px;
    background: #fff;
    filter: brightness(1.015);
    object-fit: cover;
  }
  .call-feature-cards {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(1.15rem, 2.4vw, 2rem);
    margin-top: clamp(-0.75rem, -0.5vw, -0.25rem);
  }
  .call-feature-card {
    min-width: 0;
  }
  .call-feature-card-video,
  .call-feature-card-image {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    border: 1px solid rgba(85, 113, 135, 0.16);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.82);
    box-shadow: 0 18px 44px rgba(9, 32, 69, 0.07);
  }
  .call-feature-card-body {
    padding-top: 1rem;
  }
  .call-feature-card-title {
    margin: 0;
    color: var(--sage-deep);
    font-size: clamp(1.02rem, 1.55vw, 1.24rem);
    font-weight: 800;
    letter-spacing: 0.02em;
    line-height: 1.55;
  }
  .call-feature-card-text {
    margin: 0.45rem 0 0;
    color: var(--ink-soft);
    font-size: 0.9rem;
    line-height: 1.85;
  }

  /* ===== Function ===== */
  .function {
    position: relative;
    isolation: isolate;
    padding: clamp(3rem, 7vw, 6rem) clamp(1.2rem, 4vw, 3.5rem)
      clamp(3rem, 8vw, 7rem);
    max-width: 1180px;
    margin: clamp(-1.5rem, -2vw, -0.75rem) auto 0;
  }
  .function-curve-bg {
    position: absolute;
    top: clamp(-4.5rem, -6vw, -2.25rem);
    left: 50%;
    z-index: 0;
    width: 100vw;
    height: calc(100% + clamp(6rem, 10vw, 9rem));
    color: var(--curve-sage);
    pointer-events: none;
    transform: translateX(-50%);
  }
  .function-curve-bg svg {
    display: block;
    width: 100%;
    height: 100%;
  }
  .function-curve-bg path {
    fill: currentColor;
  }
  .function > :not(.function-curve-bg) {
    position: relative;
    z-index: 1;
  }
  .customer-success-hero {
    display: grid;
    grid-template-columns: minmax(360px, 0.95fr) minmax(0, 1.05fr);
    gap: clamp(2rem, 5vw, 4.5rem);
    align-items: center;
    max-width: 1180px;
    margin: 0 auto;
  }
  .function-head {
    min-width: 0;
  }
  .function-en {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
    margin: 0;
    font-size: clamp(2.1rem, 5.8vw, 4.8rem);
    font-weight: 700;
    letter-spacing: 0.02em;
    line-height: 1.08;
    color: var(--sage-deep);
    font-family: "Georgia", "Times New Roman", serif;
  }
  .function-ja {
    margin: 0.45rem 0 0;
    color: var(--sage-deep);
    font-size: clamp(1.45rem, 2.8vw, 2.15rem);
    font-weight: 700;
    letter-spacing: 0.12em;
  }
  .customer-success-lead {
    margin: clamp(1.25rem, 3vw, 2rem) 0 0;
    color: var(--sage-deep);
    font-size: clamp(1.05rem, 1.7vw, 1.35rem);
    font-weight: 700;
    line-height: 1.8;
  }
  .customer-success-body {
    margin: 1rem 0 0;
    color: var(--ink);
    font-size: clamp(0.95rem, 1.25vw, 1.05rem);
    line-height: 2;
  }
  .customer-success-media {
    position: relative;
    isolation: isolate;
    min-width: 0;
    margin: 0;
    padding: clamp(0.7rem, 1.6vw, 1.2rem);
  }
  .customer-success-media::before {
    position: absolute;
    inset: 0;
    z-index: 0;
    background: rgba(255, 255, 255, 0.96);
    border-radius: 58% 42% 61% 39% / 50% 55% 45% 50%;
    box-shadow: 0 28px 70px rgba(9, 32, 69, 0.13);
    content: "";
    pointer-events: none;
  }
  .customer-success-video,
  .customer-success-video-fallback {
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    border: 0;
    border-radius: 56% 44% 59% 41% / 48% 53% 47% 52%;
    background: transparent;
    box-shadow: none;
    object-fit: cover;
  }
  .customer-success-steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(1.15rem, 2.4vw, 2rem);
    max-width: 1180px;
    margin: clamp(2rem, 5vw, 3.5rem) auto 0;
    padding: 0;
    list-style: none;
  }
  .customer-success-step {
    min-width: 0;
  }
  .customer-success-step-media {
    margin: 0;
  }
  .customer-success-step-video,
  .customer-success-step-image {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    border: 1px solid rgba(85, 113, 135, 0.16);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.82);
    box-shadow: 0 18px 44px rgba(9, 32, 69, 0.07);
    object-fit: cover;
  }
  .customer-success-step-copy {
    padding-top: 1rem;
  }
  .customer-success-step-title {
    margin: 0;
    color: var(--sage-deep);
    font-size: clamp(1.02rem, 1.55vw, 1.24rem);
    font-weight: 800;
    letter-spacing: 0.02em;
    line-height: 1.55;
  }
  .customer-success-step-body {
    color: var(--ink-soft);
    margin: 0.45rem 0 0;
    font-size: 0.9rem;
    line-height: 1.85;
  }

  /* ===== Case study ===== */
  .case {
    position: relative;
    isolation: isolate;
    background: transparent;
    margin-top: clamp(-2.1rem, -3vw, -1rem);
    padding: clamp(3rem, 8vw, 7rem) clamp(1.2rem, 4vw, 3.5rem);
  }
  .case > :not(.section-curve-bg) {
    position: relative;
    z-index: 1;
  }
  .case-head,
  .news-head {
    max-width: 1180px;
    margin: 0 auto 2.5rem;
  }
  .case-en,
  .news-en {
    margin: 0;
    font-size: clamp(1.4rem, 2.4vw, 2rem);
    font-weight: 700;
    color: var(--sage-deep);
    font-family: "Georgia", "Times New Roman", serif;
  }
  .case-title,
  .news-title {
    margin: 0.2rem 0 0;
    font-size: clamp(1.2rem, 2vw, 1.6rem);
    font-weight: 700;
    letter-spacing: 0.1em;
  }
  .case-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.6rem;
    max-width: 1180px;
    margin: 0 auto;
  }
  .case-card {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1.2rem;
    align-items: center;
    padding: 1rem;
    border-radius: 14px;
    border: 1px solid var(--line);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }
  .case-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 30px rgba(9, 32, 69, 0.1);
  }
  .case-card-photo {
    width: 100%;
    height: auto;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    border-radius: 10px;
  }
  .case-card-town {
    display: inline-block;
    margin-bottom: 0.4rem;
    padding: 0.2rem 0.7rem;
    border-radius: 999px;
    background: var(--sage-light);
    color: var(--sage-deep);
    font-size: 0.8rem;
    font-weight: 700;
  }
  .case-card-title {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.7;
  }
  /* ===== News ===== */
  .news {
    position: relative;
    isolation: isolate;
    margin-top: clamp(-2.2rem, -3vw, -1rem);
    background: transparent;
    padding: clamp(4.5rem, 9vw, 7rem) clamp(1.2rem, 4vw, 3.5rem)
      clamp(3rem, 8vw, 6rem);
  }
  .news > :not(.section-curve-bg) {
    position: relative;
    z-index: 1;
  }
  .news-list {
    list-style: none;
    margin: 0 auto;
    padding: 0;
    max-width: 1180px;
  }
  .news-item {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 1.5rem;
    align-items: baseline;
    padding: 1.3rem 0.4rem;
    border-bottom: 1px solid var(--line);
  }
  .news-date {
    font-weight: 700;
    font-size: 0.9rem;
    color: var(--sage-deep);
    white-space: nowrap;
  }
  .news-text {
    font-size: 0.95rem;
  }
  .news-go {
    color: var(--ink-soft);
  }

  /* ===== CTA ===== */
  .cta {
    padding: clamp(2rem, 6vw, 4rem) clamp(1.2rem, 4vw, 3.5rem)
      clamp(3rem, 8vw, 6rem);
  }
  .cta-inner {
    max-width: 900px;
    margin: 0 auto;
    padding: clamp(2.5rem, 6vw, 4.5rem);
    text-align: center;
    background: linear-gradient(140deg, var(--sage-light), var(--sage));
    border-radius: 24px;
  }
  .cta-title {
    margin: 0;
    font-size: clamp(1.4rem, 3vw, 2.2rem);
    font-weight: 700;
    letter-spacing: 0.08em;
    color: var(--sage-deep);
  }
  .cta-title span {
    display: block;
  }
  .cta-sub {
    margin: 1rem 0 2rem;
    color: #394556;
  }
  .cta-btn {
    display: inline-block;
    border: none;
    font: inherit;
    cursor: pointer;
    padding: 0.9rem 2.4rem;
    border-radius: 999px;
    background: var(--navy);
    color: #fff;
    font-weight: 700;
    transition:
      transform 0.2s ease,
      background 0.2s ease;
  }
  .cta-btn:hover {
    background: var(--navy-deep);
    transform: translateY(-2px);
  }

  /* ===== Footer ===== */
  .sc-footer {
    background: var(--navy);
    color: #e8edf2;
    padding: clamp(3rem, 6vw, 4.5rem) clamp(1.2rem, 4vw, 3.5rem);
  }
  .foot-top {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1.5rem;
    max-width: 1180px;
    margin: 0 auto;
  }
  .foot-brand {
    display: flex;
    align-items: center;
  }
  .foot-logo {
    display: block;
    width: clamp(96px, 10vw, 132px);
    height: auto;
  }
  .foot-addr {
    margin: 0;
    font-size: 0.85rem;
    line-height: 1.9;
    color: #b9c4d4;
  }
  .foot-links {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    max-width: 1180px;
    margin: 2rem auto;
    padding: 1.5rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.14);
    border-bottom: 1px solid rgba(255, 255, 255, 0.14);
  }
  .foot-links a {
    font-size: 0.88rem;
    color: #d6deea;
  }
  .foot-links a:hover {
    color: #fff;
  }
  .foot-link-btn {
    padding: 0;
    border: none;
    background: none;
    font: inherit;
    font-size: 0.88rem;
    color: #d6deea;
    cursor: pointer;
  }
  .foot-link-btn:hover {
    color: #fff;
  }
  .foot-copy {
    max-width: 1180px;
    margin: 0 auto;
    font-size: 0.78rem;
    color: #9aa8bd;
  }

  /* ===== Reveal(JS+モーション時のみ) ===== */
  .motion [data-reveal] {
    opacity: 0;
    transform: translateY(20px);
    transition:
      opacity 0.7s ease,
      transform 0.7s ease;
  }
  .motion :global([data-reveal].is-in) {
    opacity: 1;
    transform: none;
  }

  /* ===== Responsive ===== */
  @media (max-width: 1240px) {
    .workflow-inner {
      grid-template-columns: minmax(0, 0.5fr) minmax(0, 0.5fr);
    }
    .workflow-media {
      width: 100%;
      transform: none;
      translate: 0 0;
    }
    .workflow-video,
    .workflow-image {
      scale: 1.2;
    }
    .chat-feature {
      grid-template-columns: minmax(0, 1.16fr) minmax(340px, 0.84fr);
    }
    .call-feature {
      grid-template-columns: minmax(340px, 0.84fr) minmax(0, 1.16fr);
    }
  }

  @media (max-width: 860px) {
    .sc-nav {
      display: none;
    }
    .hero {
      min-height: auto;
    }
    .hero-inner {
      grid-template-columns: minmax(0, 1fr);
      justify-items: center;
      text-align: center;
      width: 100%;
      box-sizing: border-box;
      min-height: auto;
      align-items: center;
      padding: 2rem clamp(1.2rem, 4vw, 3.5rem) 3rem;
    }
    .hero-copy {
      height: auto;
      margin-top: 0;
    }
    .hero-media {
      width: 100%;
      margin-top: 1.25rem;
      transform: none;
    }
    .hero-video,
    .hero-video-fallback {
      width: min(900px, 140vw);
    }
    .hero-title {
      font-size: clamp(1.65rem, 8vw, 2.4rem);
      letter-spacing: 0.1em;
    }
    .hero-sub {
      font-size: clamp(0.42rem, 2.1vw, 0.82rem);
      letter-spacing: 0;
    }
    .hero-news {
      position: static;
      width: 100%;
      margin: 1.5rem auto 0;
      text-align: left;
    }
    .hero-mobile-actions {
      position: relative;
      z-index: 3;
      display: grid;
      gap: 0.7rem;
      align-items: center;
      box-sizing: border-box;
      width: 100%;
      margin: 1.1rem auto 0;
      padding: 0.8rem;
      border: 1px solid rgba(9, 32, 69, 0.1);
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.82);
      box-shadow: 0 14px 36px rgba(9, 32, 69, 0.12);
      backdrop-filter: blur(8px);
    }
    .hero-mobile-contact {
      width: 100%;
      border: none;
      border-radius: 999px;
      background: var(--navy);
      color: #fff;
      cursor: pointer;
      font: inherit;
      font-size: 1rem;
      font-weight: 800;
      line-height: 1.4;
      padding: 0.95rem 1.2rem;
      white-space: nowrap;
      box-shadow: 0 10px 22px rgba(9, 32, 69, 0.18);
    }
    .hero-mobile-company {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 1.8rem;
      color: var(--navy);
      font-size: 0.86rem;
      font-weight: 700;
      line-height: 1.4;
      white-space: nowrap;
    }
    .knowledge {
      margin-top: 0;
      background: var(--paper);
      padding-top: clamp(2.5rem, 8vw, 3.5rem);
    }
    .knowledge-curve-bg {
      height: clamp(13rem, 58vw, 17rem);
    }
    .feature-band {
      padding: clamp(3rem, 9vw, 4.75rem) clamp(1.2rem, 4vw, 3.5rem);
      padding-bottom: clamp(5.75rem, 18vw, 7.25rem);
    }
    .section-curve-bg {
      top: -3rem;
      width: var(--curve-width, 132vw);
      height: calc(100% + 4.5rem);
    }
    .feature-band,
    .case,
    .news,
    .function {
      background: var(--band-bg, var(--paper));
    }
    .function {
      --band-bg: var(--curve-sage);
    }
    .case {
      --band-bg: var(--paper);
    }
    .news {
      --band-bg: var(--bg);
    }
    .section-curve-bg,
    .function-curve-bg {
      display: none;
    }
    .feature-band::before,
    .case::before,
    .news::before,
    .function::before {
      position: absolute;
      top: clamp(-3rem, -9vw, -2.1rem);
      left: 50%;
      z-index: 0;
      width: 170vw;
      height: clamp(5.5rem, 22vw, 7.5rem);
      border-radius: 50%;
      background: var(--band-bg, var(--paper));
      content: "";
      pointer-events: none;
      transform: translateX(-50%);
    }
    .feature-band > :not(.section-curve-bg),
    .case > :not(.section-curve-bg),
    .news > :not(.section-curve-bg),
    .function > :not(.function-curve-bg) {
      position: relative;
      z-index: 2;
    }
    .feature-band + .feature-band {
      margin-top: 0;
      padding-top: clamp(4.25rem, 11vw, 5.75rem);
    }
    .feature-band--last {
      --curve-left: 54%;
      --curve-width: 148vw;

      padding-bottom: clamp(6.5rem, 18vw, 8rem);
    }
    .knowledge-visual {
      left: auto;
      justify-self: stretch;
      width: 100%;
    }
    .workflow-media {
      width: 100%;
      transform: none;
    }
    .workflow-video,
    .workflow-image {
      scale: 1.08;
    }
    .knowledge-inner,
    .workflow-inner,
    .chat-feature,
    .call-feature,
    .customer-success-hero,
    .customer-success-steps,
    .case-grid {
      grid-template-columns: 1fr;
    }
    .knowledge-inner,
    .workflow-inner,
    .chat-feature,
    .call-feature,
    .customer-success-hero {
      row-gap: 0;
    }
    .knowledge-copy,
    .workflow-copy,
    .chat-feature-copy,
    .call-feature-copy,
    .function-head {
      display: contents;
    }
    .knowledge-en,
    .workflow-en,
    .chat-feature-en,
    .call-feature-en,
    .function-en {
      order: 1;
    }
    .knowledge-title,
    .workflow-title,
    .chat-feature-title,
    .call-feature-title,
    .function-ja {
      order: 2;
    }
    .knowledge-visual,
    .workflow-media,
    .chat-feature-media,
    .call-feature-media,
    .customer-success-media {
      order: 3;
      margin-top: clamp(1.1rem, 5vw, 1.7rem);
      margin-bottom: clamp(1.2rem, 5vw, 1.9rem);
    }
    .knowledge-lead,
    .workflow-lead,
    .chat-feature-lead,
    .call-feature-lead,
    .customer-success-lead {
      order: 4;
      margin-top: 0;
    }
    .knowledge-flow,
    .workflow-list,
    .chat-feature-list,
    .call-feature-list,
    .customer-success-body {
      order: 5;
    }
    .chat-feature {
      margin: 0 auto;
    }
    .chat-feature-copy {
      justify-self: stretch;
      max-width: none;
    }
    .call-feature {
      margin: 0 auto;
    }
    .call-feature-copy {
      max-width: none;
    }
    .call-feature-window {
      padding: clamp(0.5rem, 2.5vw, 0.72rem);
    }
    .call-feature-cards {
      order: 6;
      grid-template-columns: 1fr;
      gap: 1.6rem;
      margin-top: clamp(1.4rem, 6vw, 2rem);
    }
    .call-feature-card,
    .customer-success-step {
      display: flex;
      flex-direction: column;
    }
    .call-feature-card-body {
      order: 1;
      padding-top: 0;
      padding-bottom: 0.8rem;
    }
    .call-feature-card-video,
    .call-feature-card-image {
      order: 2;
    }
    .customer-success-step-copy {
      order: 1;
      padding-top: 0;
      padding-bottom: 0.8rem;
    }
    .customer-success-step-media {
      order: 2;
    }
    .knowledge-flow li {
      grid-template-columns: 1fr;
      gap: 0.35rem;
    }
    .case-card {
      grid-template-columns: 1fr;
      gap: 0.9rem;
    }
    .case-card-body {
      order: 1;
    }
    .case-card-photo {
      order: 2;
    }
    .function-head {
      text-align: left;
    }
    .function {
      margin-top: 0;
      padding-top: clamp(3.5rem, 10vw, 5rem);
      padding-bottom: clamp(5.75rem, 18vw, 7.5rem);
    }
    .function-curve-bg {
      top: -2.25rem;
      width: 132vw;
      height: calc(100% + 4.5rem);
      transform: translateX(-47%);
    }
    .function-en {
      justify-content: flex-start;
    }
    .case {
      margin-top: 0;
      padding-top: clamp(4rem, 10vw, 5rem);
      padding-bottom: clamp(5.75rem, 18vw, 7.5rem);
    }
    .news {
      margin-top: 0;
      padding-top: clamp(4rem, 10vw, 5.5rem);
    }
    .news-item {
      grid-template-columns: 1fr;
      gap: 0.4rem;
    }
    .news-go {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .lp *,
    .lp *::before,
    .lp *::after {
      animation-duration: 0.01ms;
      animation-iteration-count: 1;
      scroll-behavior: auto;
      transition-duration: 0.01ms;
    }
  }
</style>
