const inputEl = document.getElementById("inputText");
const outEl = document.getElementById("output");
const btn = document.getElementById("translateBtn");
const targetEl = document.getElementById("targetLang");
const swapBtn = document.getElementById("swapBtn");

async function translateText() {
  const text = inputEl.value.trim();

  if (!text) {
    outEl.textContent = "Please enter some text.";
    return;
  }

  const target = targetEl.value;
  outEl.textContent = "Translating...";

  const url =
    "https://translate.googleapis.com/translate_a/single" +
    "?client=gtx&sl=auto&tl=" +
    encodeURIComponent(target) +
    "&dt=t&q=" +
    encodeURIComponent(text);

  const res = await fetch(url);
  const data = await res.json();

  const translated = data[0].map((p) => p[0]).join("");

  outEl.textContent = translated || "No translation found.";
}

function safeTranslate() {
  translateText().catch((err) => {
    outEl.textContent = "Error: " + err.message;
    console.error(err);
  });
}

swapBtn.addEventListener("click", () => {
  const translated = outEl.textContent;

  if (!translated || translated === "—") return;

  inputEl.value = translated;
  outEl.textContent = "—";
});

btn.addEventListener("click", safeTranslate);

inputEl.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    safeTranslate();
  }
});
