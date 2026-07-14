<script lang="ts">
  import type {
    CallCapability,
    CustomerSuccessStep,
    DownloadCtaCopy,
    ProductFeatureCopy,
  } from "$lib/swarrow/content";
  import { downloadCtaLabel } from "$lib/swarrow/content";

  interface Props {
    productName: string;
    productIcon: string;
    bandVariant: "mist" | "paper";
    mediaPosition: "left" | "right";
    feature: ProductFeatureCopy;
    videoSources: { src: string; type: string }[];
    poster: string;
    fallbackAlt: string;
    extraCards?: readonly CallCapability[];
    customerSuccessIntro: { lead: string; body: string };
    customerSuccessSteps: readonly CustomerSuccessStep[];
    downloadCta: DownloadCtaCopy;
    onOpenDownloadModal: () => void;
  }

  let {
    productName,
    productIcon,
    bandVariant,
    mediaPosition,
    feature,
    videoSources,
    poster,
    fallbackAlt,
    extraCards,
    customerSuccessIntro,
    customerSuccessSteps,
    downloadCta,
    onOpenDownloadModal,
  }: Props = $props();
</script>

<section
  class="feature-band feature-band--{bandVariant}"
  aria-labelledby="product-feature-title"
>
  <div
    class="section-curve-bg section-curve-bg--{bandVariant}{bandVariant ===
    'paper'
      ? ' section-curve-bg--flip'
      : ''}{bandVariant === 'mist' ? ' chat-top-curve' : ''}"
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
  <div class="product-feature product-feature--{mediaPosition}" data-reveal>
    {#if mediaPosition === "left"}
      <figure class="product-feature-media">
        <video
          class="product-feature-video"
          {poster}
          muted
          loop
          playsinline
          preload="none"
          width="1280"
          height="720"
          aria-label={fallbackAlt}
        >
          {#each videoSources as source (source.src)}
            <source src={source.src} type={source.type}>
          {/each}
          <img
            class="product-feature-image"
            src={poster}
            alt={fallbackAlt}
            width="1672"
            height="941"
            loading="lazy"
            decoding="async"
          >
        </video>
      </figure>

      <div class="product-feature-copy">
        <p class="product-feature-en">{feature.en}</p>
        <h1 id="product-feature-title" class="product-feature-title">
          <span class="product-feature-title-label">{feature.titleLabel}</span>
          <span class="feature-product-name">
            <img
              class="feature-product-icon"
              src={productIcon}
              alt=""
              width="961"
              height="1006"
              decoding="async"
            >
            {productName}
          </span>
        </h1>
        <p class="product-feature-lead">{feature.lead}</p>
        <ul class="product-feature-list">
          {#each feature.list as item (item.title)}
            <li>
              <strong>{item.title}</strong>
              <small>{item.body}</small>
            </li>
          {/each}
        </ul>
      </div>
    {:else}
      <div class="product-feature-copy">
        <p class="product-feature-en">{feature.en}</p>
        <h1 id="product-feature-title" class="product-feature-title">
          <span class="product-feature-title-label">{feature.titleLabel}</span>
          <span class="feature-product-name">
            <img
              class="feature-product-icon"
              src={productIcon}
              alt=""
              width="961"
              height="1006"
              decoding="async"
            >
            {productName}
          </span>
        </h1>
        <p class="product-feature-lead">{feature.lead}</p>
        <ul class="product-feature-list">
          {#each feature.list as item (item.title)}
            <li>
              <strong>{item.title}</strong>
              <small>{item.body}</small>
            </li>
          {/each}
        </ul>
      </div>

      <figure class="product-feature-media">
        <video
          class="product-feature-video"
          {poster}
          muted
          loop
          playsinline
          preload="none"
          width="1280"
          height="720"
          aria-label={fallbackAlt}
        >
          {#each videoSources as source (source.src)}
            <source src={source.src} type={source.type}>
          {/each}
          <img
            class="product-feature-image"
            src={poster}
            alt={fallbackAlt}
            width="1672"
            height="941"
            loading="lazy"
            decoding="async"
          >
        </video>
      </figure>
    {/if}

    {#if extraCards}
      <div class="call-feature-cards">
        {#each extraCards as capability (capability.title)}
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
              <h3 class="call-feature-card-title">{capability.title}</h3>
              <p class="call-feature-card-text">{capability.body}</p>
            </div>
          </article>
        {/each}
      </div>
    {/if}
  </div>
</section>

<section id="support" class="function" aria-labelledby="support-title">
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
      <h2 id="support-title" class="function-ja">カスタマーサクセス</h2>
      <p class="customer-success-lead">{customerSuccessIntro.lead}</p>
      <p class="customer-success-body">{customerSuccessIntro.body}</p>
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

<section id="contact" class="cta" aria-labelledby="contact-title">
  <div class="cta-inner" data-reveal>
    <h2 id="contact-title" class="cta-title">
      {#each downloadCta.heading as line (line)}
        <span>{line}</span>
      {/each}
    </h2>
    <p class="cta-sub">{downloadCta.sub}</p>
    <button type="button" class="cta-btn" onclick={onOpenDownloadModal}>
      {downloadCtaLabel}<span class="ext">↗</span>
    </button>
  </div>
</section>

<style>
  #support,
  #contact {
    scroll-margin-top: 5.5rem;
  }

  .ext {
    display: inline-block;
    margin-left: 0.25em;
    font-size: 0.82em;
    transform: translateY(-0.05em);
  }

  /* ===== Feature band ===== */
  .feature-band {
    --band-bg: var(--bg);

    position: relative;
    isolation: isolate;
    background: transparent;
    padding: clamp(4.25rem, 7vw, 6.5rem) clamp(1.2rem, 4vw, 3.5rem);
  }
  .feature-band--paper {
    --band-bg: var(--paper);
  }
  .feature-band--mist {
    --band-bg: var(--bg);
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

  /* ===== Product feature (chat / call 共通) ===== */
  .product-feature {
    position: relative;
    z-index: 1;
    display: grid;
    gap: clamp(2rem, 4vw, 4.5rem);
    align-items: center;
    max-width: 1420px;
    margin: 0 auto;
  }
  .product-feature--left {
    grid-template-columns: minmax(0, 1.24fr) minmax(360px, 0.76fr);
  }
  .product-feature--right {
    grid-template-columns: minmax(360px, 0.76fr) minmax(0, 1.24fr);
  }
  .product-feature-media {
    min-width: 0;
    margin: 0;
  }
  .product-feature-video,
  .product-feature-image {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    background: transparent;
  }
  .product-feature-copy {
    justify-self: end;
    min-width: 0;
    max-width: 560px;
  }
  .product-feature-en {
    margin: 0 0 0.55rem;
    color: var(--sage-deep);
    font-family: "Georgia", "Times New Roman", serif;
    font-size: clamp(1.05rem, 1.8vw, 1.35rem);
    font-weight: 700;
  }
  .product-feature-title {
    margin: 0;
    color: var(--sage-deep);
    font-size: clamp(1.45rem, 2.8vw, 2.2rem);
    font-weight: 700;
    letter-spacing: 0.06em;
    line-height: 1.55;
  }
  .product-feature-title span {
    display: block;
  }
  .product-feature-title-label {
    white-space: nowrap;
  }
  .product-feature-title .feature-product-name {
    display: flex;
    align-items: center;
    gap: 0.65rem;
  }
  .feature-product-icon {
    display: block;
    width: clamp(2rem, 3.5vw, 2.75rem);
    height: auto;
    flex: 0 0 auto;
  }
  .product-feature-lead {
    margin: 1.2rem 0 1.45rem;
    color: var(--ink);
    font-size: clamp(0.95rem, 1.2vw, 1.05rem);
    line-height: 2;
  }
  .product-feature-list {
    display: grid;
    gap: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    border-bottom: 1px solid rgba(85, 113, 135, 0.28);
  }
  .product-feature-list li {
    padding: 0.95rem 0;
    border-top: 1px solid rgba(85, 113, 135, 0.28);
  }
  .product-feature-list strong,
  .product-feature-list small {
    display: block;
  }
  .product-feature-list strong {
    color: var(--sage-deep);
    font-size: 1rem;
    line-height: 1.7;
  }
  .product-feature-list small {
    margin-top: 0.2rem;
    color: var(--ink-soft);
    font-size: 0.88rem;
    line-height: 1.8;
  }

  /* ===== Call capability cards (extraCards) ===== */
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

  /* ===== Function (customer success) ===== */
  .function {
    position: relative;
    isolation: isolate;
    padding: clamp(3rem, 7vw, 6rem) clamp(1.2rem, 4vw, 3.5rem)
      clamp(3rem, 8vw, 7rem);
    max-width: 1180px;
    margin: clamp(-1.5rem, -2vw, -0.75rem) auto 0;
  }
  .function::before {
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 0;
    width: 100vw;
    height: 100%;
    background: var(--paper);
    content: "";
    pointer-events: none;
    transform: translateX(-50%);
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

  /* ===== Responsive ===== */
  /* mediaPosition="right" の表示順は order ではなく DOM 順序の切り替え
           （テンプレート側の {#if mediaPosition === "left"}...{:else}...{/if}）
           で実現している。860px 以下は display:contents による独自の order
           制御で「コピー→動画」の順に再配置する（別の仕組み、変更不要）。 */

  @media (max-width: 1240px) {
    .product-feature--left {
      grid-template-columns: minmax(0, 1.16fr) minmax(340px, 0.84fr);
    }
    .product-feature--right {
      grid-template-columns: minmax(340px, 0.84fr) minmax(0, 1.16fr);
    }
  }

  @media (max-width: 860px) {
    .feature-band {
      padding: clamp(3rem, 9vw, 4.75rem) clamp(1.2rem, 4vw, 3.5rem);
      padding-bottom: clamp(5.75rem, 18vw, 7.25rem);
    }
    .section-curve-bg {
      top: -3rem;
      width: var(--curve-width, 132vw);
      height: calc(100% + 4.5rem);
    }
    .section-curve-bg,
    .function-curve-bg {
      display: none;
    }
    .feature-band > :not(.section-curve-bg),
    .function > :not(.function-curve-bg) {
      position: relative;
      z-index: 2;
    }
    .product-feature,
    .customer-success-hero,
    .customer-success-steps {
      grid-template-columns: 1fr;
    }
    .product-feature,
    .customer-success-hero {
      row-gap: 0;
    }
    .product-feature-copy,
    .function-head {
      display: contents;
    }
    .product-feature-en,
    .function-en {
      order: 1;
    }
    .product-feature-title,
    .function-ja {
      order: 2;
    }
    .product-feature-title-label {
      font-size: clamp(1.12rem, 6vw, 1em);
      letter-spacing: 0.02em;
    }
    .product-feature-media,
    .customer-success-media {
      order: 3;
      margin-top: clamp(1.1rem, 5vw, 1.7rem);
      margin-bottom: clamp(1.2rem, 5vw, 1.9rem);
    }
    .product-feature-lead,
    .customer-success-lead {
      order: 4;
      margin-top: 0;
    }
    .product-feature-list,
    .customer-success-body {
      order: 5;
    }
    .product-feature {
      margin: 0 auto;
    }
    .product-feature-copy {
      justify-self: stretch;
      max-width: none;
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
    .function-head {
      text-align: left;
    }
    .function {
      margin-top: 0;
      padding-top: clamp(3.5rem, 10vw, 5rem);
      padding-bottom: clamp(5.75rem, 18vw, 7.5rem);
    }
  }
</style>
