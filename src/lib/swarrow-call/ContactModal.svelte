<script lang="ts">
  import { env } from "$env/dynamic/public";

  interface Props {
    open: boolean;
    onClose: () => void;
  }

  let { open, onClose }: Props = $props();

  type FormState = "idle" | "submitting" | "done" | "error";

  const FALLBACK_DOWNLOAD_REQUEST_API_URL =
    "https://api.swarrow.com/download-requests";
  const TURNSTILE_SCRIPT_URL =
    "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

  // 外部バックエンドの送信先。未設定時は本番相当のフォールバックへ倒す
  // (functions/api/contact.ts は廃止済みのため、この契約が唯一の送信経路)。
  const DOWNLOAD_REQUEST_API_URL =
    env.PUBLIC_DOWNLOAD_REQUEST_API_URL || FALLBACK_DOWNLOAD_REQUEST_API_URL;
  // Turnstile はフォールバック不可(サイトキー無しでは認証自体が成立しない)。
  // 未設定時はフォーム下部にエラーメッセージを表示するのみに留める。
  const TURNSTILE_SITE_KEY = env.PUBLIC_TURNSTILE_SITE_KEY;

  // 同一コンポーネントインスタンス内でスクリプトタグの二重挿入を防ぐキャッシュ。
  // 読み込み失敗時は null に戻し、次回の効果発火で再試行できるようにする。
  let turnstileScriptPromise: Promise<void> | null = null;

  function loadTurnstileScript(): Promise<void> {
    if (window.turnstile) {
      return Promise.resolve();
    }

    if (turnstileScriptPromise) {
      return turnstileScriptPromise;
    }

    turnstileScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = TURNSTILE_SCRIPT_URL;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => {
        turnstileScriptPromise = null;
        reject(new Error("Failed to load Turnstile"));
      };
      document.head.appendChild(script);
    });

    return turnstileScriptPromise;
  }

  let companyName = $state("");
  let name = $state("");
  let nameKana = $state("");
  let email = $state("");
  let inquiry = $state("");
  let formState = $state<FormState>("idle");
  let errorMessage = $state("");
  let turnstileToken = $state<string | null>(null);

  // Turnstile ウィジェットの描画エフェクトを "submitting"/"error" のような
  // 中間状態遷移のたびに再実行させないための派生値。$derived はメモ化されるため、
  // formState が "done" になったかどうかが実際に変化したときだけ通知される
  // (参照実装の useEffect 依存配列 [isOpen, submitted] に相当)。
  let submitted = $derived(formState === "done");

  let turnstileContainer: HTMLDivElement | undefined = $state();
  let turnstileWidgetId: string | null = null;

  let abortController: AbortController | undefined;

  const resetForm = () => {
    companyName = "";
    name = "";
    nameKana = "";
    email = "";
    inquiry = "";
    formState = "idle";
    errorMessage = "";
    turnstileToken = null;
  };

  const destroyTurnstileWidget = () => {
    if (turnstileWidgetId && window.turnstile) {
      window.turnstile.remove(turnstileWidgetId);
    }
    turnstileWidgetId = null;
    turnstileToken = null;
  };

  const handleClose = () => {
    // 送信中にモーダルを閉じた場合、進行中のリクエストを中断してから状態をリセットする。
    // こうしないと後から解決/拒否した fetch が閉じた後に formState を書き換えてしまう。
    abortController?.abort();
    abortController = undefined;
    destroyTurnstileWidget();
    resetForm();
    onClose();
  };

  let closeButton: HTMLButtonElement | undefined = $state();

  $effect(() => {
    if (open) {
      closeButton?.focus();
    }
  });

  // モーダルが開いていて、かつ未送信の間だけ Turnstile ウィジェットを描画する。
  $effect(() => {
    if (!open || submitted) {
      return;
    }

    if (!TURNSTILE_SITE_KEY) {
      errorMessage = "認証設定が未完了です";
      return;
    }

    let cancelled = false;

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !turnstileContainer || !window.turnstile) {
          return;
        }

        if (turnstileWidgetId) {
          window.turnstile.remove(turnstileWidgetId);
        }

        turnstileWidgetId = window.turnstile.render(turnstileContainer, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token) => {
            turnstileToken = token;
            errorMessage = "";
          },
          "expired-callback": () => {
            turnstileToken = null;
          },
          "error-callback": () => {
            turnstileToken = null;
            errorMessage = "認証確認に失敗しました。再度お試しください。";
          },
        });
      })
      .catch(() => {
        if (cancelled) {
          return;
        }
        errorMessage = "認証設定の読み込みに失敗しました";
      });

    return () => {
      cancelled = true;
      destroyTurnstileWidget();
    };
  });

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    if (!turnstileToken) {
      errorMessage = "認証確認が完了していません";
      return;
    }

    formState = "submitting";
    errorMessage = "";

    const controller = new AbortController();
    abortController = controller;

    try {
      const response = await fetch(DOWNLOAD_REQUEST_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          name,
          nameKana,
          email,
          inquiry,
          turnstileToken,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "送信に失敗しました");
      }

      formState = "done";
    } catch (error) {
      // モーダルが閉じられて中断された送信は、既に resetForm 済みなので状態を触らない。
      if (controller.signal.aborted) {
        return;
      }
      if (error instanceof TypeError) {
        // fetch 自体の失敗(オフライン等のネットワークエラー)。英語の生メッセージを出さない。
        errorMessage =
          "通信エラーが発生しました。しばらくしてから再度お試しください。";
      } else {
        errorMessage =
          error instanceof Error
            ? error.message
            : "送信中にエラーが発生しました";
      }
      formState = "error";
      // 送信失敗時は同じウィジェットをリセットして再度認証させる(remove ではなく reset)。
      if (turnstileWidgetId && window.turnstile) {
        window.turnstile.reset(turnstileWidgetId);
      }
      turnstileToken = null;
    } finally {
      if (abortController === controller) {
        abortController = undefined;
      }
    }
  };
</script>

<svelte:window
  onkeydown={(event) => open && event.key === "Escape" && handleClose()}
/>

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events -- closing on backdrop click is a pointer-only convenience; keyboard users already have an equivalent via the global Escape handler above and the visible close button below -->
  <!-- biome-ignore lint/a11y/useKeyWithClickEvents: closing on backdrop click is a pointer-only convenience; keyboard users already have an equivalent via the global Escape handler above and the visible close button below -->
  <div
    class="modal-backdrop"
    role="dialog"
    aria-modal="true"
    aria-labelledby="contact-modal-title"
    tabindex="-1"
    onclick={handleClose}
  >
    <!-- svelte-ignore a11y_click_events_have_key_events -- this handler only stops click propagation to the backdrop and triggers no action a keyboard user would need -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -- same rationale: click only stops propagation, keyboard users already have an equivalent via Escape and the visible close button -->
    <!-- biome-ignore lint/a11y/useKeyWithClickEvents: this handler only stops click propagation to the backdrop and triggers no action a keyboard user would need -->
    <div
      class="modal"
      role="document"
      onclick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        class="modal-close"
        bind:this={closeButton}
        onclick={handleClose}
        aria-label="閉じる"
      >
        ×
      </button>

      <div class="modal-body">
        {#if formState === "done"}
          <div class="modal-done">
            <h3 id="contact-modal-title">送信が完了しました</h3>
            <p>
              ご入力いただいたメールアドレス宛に、資料ダウンロードリンクを含む
              ご案内をお送りします。担当者よりあらためてご連絡いたします。
            </p>
            <button type="button" class="modal-done-btn" onclick={handleClose}>
              閉じる
            </button>
          </div>
        {:else}
          <h3 id="contact-modal-title">お問い合わせ</h3>
          <p class="modal-lead">
            導入のご相談・デモのご依頼など、以下のフォームからお気軽にお問い合わせください。
          </p>

          <form onsubmit={handleSubmit}>
            <label>
              会社名<span class="required">*</span>
              <input
                type="text"
                bind:value={companyName}
                placeholder="株式会社〇〇"
                required
              >
            </label>
            <label>
              氏名<span class="required">*</span>
              <input
                type="text"
                bind:value={name}
                placeholder="山田 太郎"
                required
              >
            </label>
            <label>
              ふりがな<span class="required">*</span>
              <input
                type="text"
                bind:value={nameKana}
                placeholder="やまだ たろう"
                required
              >
            </label>
            <label>
              メールアドレス<span class="required">*</span>
              <input
                type="email"
                bind:value={email}
                placeholder="example@company.co.jp"
                required
              >
            </label>
            <label>
              お問い合わせ内容
              <textarea
                bind:value={inquiry}
                rows="4"
                placeholder="ご質問・ご要望をご記入ください"
              ></textarea>
            </label>

            <div class="turnstile-wrapper">
              <div bind:this={turnstileContainer}></div>
            </div>

            <button
              type="submit"
              class="modal-submit"
              disabled={formState === "submitting" || !turnstileToken}
            >
              {formState === "submitting" ? "送信中…" : "送信する"}
            </button>

            {#if errorMessage}
              <p role="alert" class="modal-error">{errorMessage}</p>
            {/if}

            <p class="modal-note">
              入力いただいた情報はお問い合わせ対応の目的でのみ使用します。
            </p>
          </form>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: rgba(9, 32, 69, 0.45);
    backdrop-filter: blur(2px);
  }
  .modal {
    position: relative;
    width: 100%;
    max-width: 520px;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 24px;
    background: var(--paper, #fff);
    box-shadow: 0 30px 70px rgba(9, 32, 69, 0.25);
  }
  .modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    border: none;
    background: transparent;
    font-size: 1.5rem;
    line-height: 1;
    color: var(--ink-soft, #5a5f63);
    cursor: pointer;
  }
  .modal-body {
    padding: clamp(1.75rem, 4vw, 2.5rem);
  }
  .modal-body h3 {
    margin: 0 0 0.5rem;
    color: var(--navy, #092045);
    font-size: 1.4rem;
    font-weight: 700;
  }
  .modal-lead {
    margin: 0 0 1.5rem;
    color: var(--ink-soft, #5a5f63);
    font-size: 0.9rem;
    line-height: 1.8;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }
  label {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--navy, #092045);
  }
  .required {
    margin-left: 0.2rem;
    color: var(--coral, #e07a66);
  }
  input,
  textarea {
    padding: 0.75rem 1rem;
    border: 1px solid var(--line, rgba(51, 51, 51, 0.14));
    border-radius: 12px;
    font: inherit;
    color: var(--ink, #333);
    background: var(--bg, #f4f4f6);
  }
  textarea {
    resize: none;
  }
  .turnstile-wrapper {
    display: flex;
    min-height: 65px;
    align-items: center;
    justify-content: center;
  }
  .modal-submit {
    margin-top: 0.4rem;
    padding: 1rem;
    border: none;
    border-radius: 999px;
    background: var(--navy, #092045);
    color: #fff;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  .modal-submit:hover:not(:disabled) {
    background: var(--navy-deep, #061936);
  }
  .modal-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  .modal-error {
    margin: 0;
    color: #c0392b;
    font-size: 0.85rem;
    text-align: center;
  }
  .modal-note {
    margin: 0;
    color: var(--ink-soft, #5a5f63);
    font-size: 0.75rem;
    text-align: center;
  }
  .modal-done {
    text-align: center;
    padding: 1.5rem 0;
  }
  .modal-done p {
    color: var(--ink-soft, #5a5f63);
    line-height: 1.8;
  }
  .modal-done-btn {
    margin-top: 1.5rem;
    padding: 0.85rem 2rem;
    border: none;
    border-radius: 999px;
    background: var(--navy, #092045);
    color: #fff;
    font-weight: 700;
    cursor: pointer;
  }
</style>
