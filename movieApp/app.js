// API config
const API_KEY = "04c35731a5ee918f014970082a0088b1";
const POPULAR_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const IMG_PATH = "https://image.tmdb.org/t/p/w500";

const FALLBACK ="./images/noavailable.jpg";

const grid = document.getElementById("grid");
const input = document.getElementById("inp");
const searchBtn = document.getElementById("searchBtn");
const popularBtn = document.getElementById("popular");

const modal = document.getElementById("modal");
const modalPoster = document.getElementById("modalPoster");
const modalTitle = document.getElementById("modalTitle");
const modalRelease = document.getElementById("modalRelease");
const modalVotes = document.getElementById("modalVotes");
const modalRating = document.getElementById("modalRating");
const modalOverview = document.getElementById("modalOverview");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");

function escapeHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
async function loadMovies(url) {
  grid.innerHTML =
    "<div style='padding:40px;text-align:center;color:#999'>Loading…</div>";
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Network error");
    const data = await res.json();
    renderMovies(data.results || []);
  } catch (err) {
    console.error(err);
    grid.innerHTML =
      "<div style='padding:40px;text-align:center;color:#999'>Unable to load results.</div>";
  }
}

function renderMovies(list) {
  if (!list || list.length === 0) {
    grid.innerHTML =
      "<div style='padding:40px;text-align:center;color:#999'>No results found.</div>";
    return;
  }

  grid.innerHTML = "";

  list.forEach((movie) => {
    const card = document.createElement("article");
    card.className = "card";

    const posterUrl = movie.poster_path
      ? IMG_PATH + movie.poster_path
      : FALLBACK;

    card.innerHTML = `
      <div class="poster" style="background-image:url('${posterUrl}')"></div>
      <div class="info">
        <div class="title">${escapeHtml(movie.title || "Untitled")}</div>
        <div class="overview-snippet">${escapeHtml(
          movie.overview || "No overview available."
        )}</div>
        <button class="read-more">Read more</button>
      </div>
    `;

    const readMoreBtn = card.querySelector(".read-more");
    readMoreBtn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      openModal(movie);
    });

    card.addEventListener("click", () => openModal(movie));

    grid.appendChild(card);
  });
}

function openModal(movie) {
  const posterUrl = movie.poster_path ? IMG_PATH + movie.poster_path : FALLBACK;
  modalPoster.style.backgroundImage = `url('${posterUrl}')`;
  modalTitle.textContent = movie.title || "Untitled";
  modalRelease.textContent = "Release: " + (movie.release_date || "N/A");
  modalVotes.textContent = "Votes: " + (movie.vote_count || 0);
  modalRating.textContent = "Rating: " + (movie.vote_average || 0).toFixed(1);
  modalOverview.textContent = movie.overview || "No overview available.";

  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function doSearch() {
  const q = input.value.trim();
  if (!q) loadMovies(POPULAR_URL);
  else loadMovies(SEARCH_URL + encodeURIComponent(q));
}

let t;
input.addEventListener("input", () => {
  clearTimeout(t);
  t = setTimeout(doSearch, 400);
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") doSearch();
});
searchBtn.addEventListener("click", doSearch);
popularBtn.addEventListener("click", () => {
  input.value = "";
  loadMovies(POPULAR_URL);
});

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

loadMovies(POPULAR_URL);
