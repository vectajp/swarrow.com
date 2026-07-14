<script lang="ts">
  import { getContext, onMount } from "svelte";
  import {
    chatCustomerSuccessIntro,
    chatCustomerSuccessSteps,
    chatDownloadCta,
    chatFeatureCopy,
    pageDescription,
    products,
    site,
    siteName,
  } from "$lib/swarrow/content";
  import ProductPage from "$lib/swarrow/ProductPage.svelte";

  const REVEAL_SELECTOR = "[data-reveal]";
  const AUTOPLAY_VIDEO_SELECTOR =
    ".product-feature-video, .customer-success-step-video";

  const playVideo = (video: HTMLVideoElement) => {
    video.muted = true;
    void video.play().catch(() => {});
  };
  const runCleanups = (cleanups: Array<() => void>) => {
    for (const cleanup of cleanups) {
      cleanup();
    }
  };

  const { openContactModal } = getContext<{ openContactModal: () => void }>(
    "swarrow-download-modal",
  );
  const { isReducedMotion } = getContext<{ isReducedMotion: () => boolean }>(
    "swarrow-motion",
  );

  const product = products.find((item) => item.id === "chat");
  const pageTitle = `Swarrow Chat｜${product?.category ?? ""}`;
  const canonicalUrl = `${site}/chat`;

  onMount(() => {
    const cleanups: Array<() => void> = [];

    if (isReducedMotion()) {
      for (const el of document.querySelectorAll<HTMLElement>(
        REVEAL_SELECTOR,
      )) {
        el.classList.add("is-in");
      }
      return () => runCleanups(cleanups);
    }

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
  <meta name="description" content={product?.benefit ?? pageDescription}>
  <meta name="theme-color" content="#f4f4f6">
  <link rel="canonical" href={canonicalUrl}>
  <meta name="robots" content="index,follow">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content={siteName}>
  <meta property="og:title" content={pageTitle}>
  <meta property="og:description" content={product?.benefit ?? pageDescription}>
  <meta property="og:url" content={canonicalUrl}>

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content={pageTitle}>
  <meta
    name="twitter:description"
    content={product?.benefit ?? pageDescription}
  >
</svelte:head>

<main id="top">
  <ProductPage
    productName="Swarrow Chat"
    productIcon="/swarrow-call/swarrow-chat-icon-flat.png"
    bandVariant="mist"
    mediaPosition="left"
    feature={chatFeatureCopy}
    videoSources={[{ src: "/swarrow-call/chat-ui.webm", type: "video/webm" }]}
    poster="/swarrow-call/chat-ui.webp"
    fallbackAlt="ホームページやLINEに設置できるSwarrow Chatの画面"
    customerSuccessIntro={chatCustomerSuccessIntro}
    customerSuccessSteps={chatCustomerSuccessSteps}
    downloadCta={chatDownloadCta}
    onOpenDownloadModal={openContactModal}
  />
</main>
