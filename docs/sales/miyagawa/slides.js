const STORAGE_KEY = "swarrow-miyagawa-hidden-slides";

const body = document.body;
const slides = Array.from(document.querySelectorAll(".slide"));
const tocList = document.querySelector("[data-toc-list]");
const toolbar = document.querySelector(".deck-toolbar");
const settingsPanel = document.querySelector("[data-settings-panel]");
const settingsList = document.querySelector("[data-settings-list]");

let hiddenIds = new Set(loadHiddenIds());
let slideshowActive = false;
let activeSlideId = null;
let slideshowScrollY = 0;

const slideMeta = slides.map((slide, index) => {
  const title = slide.dataset.navTitle
    ?? slide.querySelector(".slide__title")?.textContent.trim()
    ?? `スライド ${index + 1}`;
  return { id: slide.id, title, slide };
});

buildTocList();
buildSettingsList();
applyVisibility();

toolbar?.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;

  if (action === "settings") {
    openSettings();
  }

  if (action === "slideshow") {
    closeSettings();
    enterSlideshow();
  }
});

settingsPanel?.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;

  if (action === "close-settings") {
    closeSettings();
  }

  if (action === "show-all") {
    hiddenIds.clear();
    saveHiddenIds();
    applyVisibility();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (slideshowActive) {
      exitSlideshow();
      return;
    }

    if (!settingsPanel.hidden) {
      closeSettings();
    }
  }

  if (!slideshowActive) return;

  if (["ArrowRight", "PageDown", " "].includes(event.key)) {
    event.preventDefault();
    moveSlide(1);
  }

  if (["ArrowLeft", "PageUp"].includes(event.key)) {
    event.preventDefault();
    moveSlide(-1);
  }
});

document.addEventListener("fullscreenchange", () => {
  if (slideshowActive && !document.fullscreenElement) {
    exitSlideshow({ skipFullscreenExit: true });
  }
});

window.addEventListener("beforeprint", () => {
  closeSettings();
  if (slideshowActive) {
    exitSlideshow();
  }
  body.classList.add("is-printing");
});

window.addEventListener("afterprint", () => {
  body.classList.remove("is-printing");
});

window.addEventListener("hashchange", () => {
  if (!slideshowActive) return;
  const targetId = location.hash.replace("#", "");
  if (targetId && !hiddenIds.has(targetId)) {
    activeSlideId = targetId;
    updateSlideshowView();
  }
});

function buildSettingsList() {
  if (!settingsList) return;

  settingsList.innerHTML = "";

  slideMeta.forEach((meta) => {
    const item = document.createElement("label");
    item.className = "settings-panel__item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = meta.id;
    checkbox.checked = !hiddenIds.has(meta.id);
    checkbox.addEventListener("change", () => toggleSlide(meta.id, checkbox));

    const text = document.createElement("span");
    text.className = "settings-panel__item-text";

    const title = document.createElement("span");
    title.className = "settings-panel__item-title";
    title.textContent = meta.title;

    text.append(title);
    item.append(checkbox, text);
    settingsList.append(item);
  });
}

function buildTocList() {
  if (!tocList) return;

  tocList.innerHTML = "";

  slideMeta.forEach((meta) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = `#${meta.id}`;
    link.textContent = meta.title;
    item.append(link);
    tocList.append(item);
  });
}

function toggleSlide(id, checkbox) {
  const visibleCount = getVisibleSlides().length;

  if (!checkbox.checked && visibleCount <= 1) {
    checkbox.checked = true;
    window.alert("少なくとも1ページは表示してください。");
    return;
  }

  if (checkbox.checked) {
    hiddenIds.delete(id);
  } else {
    hiddenIds.add(id);
  }

  saveHiddenIds();
  applyVisibility();
}

function applyVisibility() {
  syncSlideVisibility();

  tocList?.querySelectorAll("a").forEach((link) => {
    const id = link.getAttribute("href")?.replace("#", "");
    const item = link.closest("li");
    if (id && item) {
      item.hidden = hiddenIds.has(id);
    }
  });

  settingsList?.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    input.checked = !hiddenIds.has(input.value);
  });

  if (!slideshowActive) return;

  const visibleSlides = getVisibleSlides();
  if (!visibleSlides.length) {
    exitSlideshow();
    return;
  }

  if (!activeSlideId || hiddenIds.has(activeSlideId)) {
    activeSlideId = visibleSlides[0].id;
  }

  updateSlideshowView();
}

function getVisibleSlides() {
  return slides.filter((slide) => !hiddenIds.has(slide.id));
}

function openSettings() {
  if (!settingsPanel) return;
  settingsPanel.hidden = false;
  body.classList.add("has-settings");
}

function closeSettings() {
  if (!settingsPanel) return;
  settingsPanel.hidden = true;
  body.classList.remove("has-settings");
}

function enterSlideshow() {
  const visibleSlides = getVisibleSlides();
  if (!visibleSlides.length) return;

  slideshowActive = true;
  slideshowScrollY = window.scrollY;
  activeSlideId = getCurrentSlideId({ preferHash: false }) ?? visibleSlides[0].id;
  body.classList.add("is-slideshow");
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  updateSlideshowView();

  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  });

  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().catch(() => {});
  }
}

function exitSlideshow(options = {}) {
  if (!slideshowActive) return;

  slideshowActive = false;
  body.classList.remove("is-slideshow");
  slides.forEach((slide) => slide.classList.remove("is-active"));
  syncSlideVisibility();

  if (activeSlideId) {
    const activeSlide = document.getElementById(activeSlideId);
    activeSlide?.scrollIntoView({ block: "start", behavior: "auto" });
  } else {
    window.scrollTo({ top: slideshowScrollY, left: 0, behavior: "auto" });
  }

  if (!options.skipFullscreenExit && document.fullscreenElement && document.exitFullscreen) {
    document.exitFullscreen().catch(() => {});
  }
}

function moveSlide(delta) {
  if (!slideshowActive) return;

  const visibleSlides = getVisibleSlides();
  const currentIndex = visibleSlides.findIndex((slide) => slide.id === activeSlideId);
  const nextIndex = Math.min(Math.max(currentIndex + delta, 0), visibleSlides.length - 1);
  activeSlideId = visibleSlides[nextIndex].id;
  updateSlideshowView();
}

function updateSlideshowView() {
  const visibleSlides = getVisibleSlides();
  if (!visibleSlides.length) return;

  let currentIndex = visibleSlides.findIndex((slide) => slide.id === activeSlideId);
  if (currentIndex === -1) currentIndex = 0;

  activeSlideId = visibleSlides[currentIndex].id;

  slides.forEach((slide) => {
    slide.classList.toggle("is-active", slide.id === activeSlideId);
  });
  syncSlideVisibility();

  const meta = slideMeta.find((entry) => entry.id === activeSlideId);
  if (meta) {
    document.title = `${meta.title} | SwarrowCall 営業資料`;
  }

  history.replaceState(null, "", `#${activeSlideId}`);
}

function getCurrentSlideId(options = {}) {
  const preferHash = options.preferHash ?? true;

  if (preferHash) {
    const hashId = location.hash.replace("#", "");
    if (hashId && !hiddenIds.has(hashId)) {
      return hashId;
    }
  }

  const visibleSlides = getVisibleSlides();
  if (!visibleSlides.length) return null;

  const threshold = window.scrollY + window.innerHeight * 0.35;
  let currentSlide = visibleSlides[0];

  visibleSlides.forEach((slide) => {
    if (slide.offsetTop <= threshold) {
      currentSlide = slide;
    }
  });

  return currentSlide.id;
}

function loadHiddenIds() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (!value) return [];
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveHiddenIds() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...hiddenIds]));
}

function syncSlideVisibility() {
  slides.forEach((slide) => {
    const userHidden = hiddenIds.has(slide.id);
    const slideshowHidden = slideshowActive && slide.id !== activeSlideId;
    slide.hidden = userHidden || slideshowHidden;
  });
}
