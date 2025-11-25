// open apps on click

const miniCard = document.querySelectorAll(".mini-card");

miniCard.forEach((card) => {
  card.addEventListener("click", () => {
    const url = card.dataset.url;
    if (url) window.open(url, "_blank", "noopener");
  });
});

// background when hover on cards

const body = document.body;
const movieCard = document.getElementById("movie");
const weather = document.getElementById("weather");
const text = document.getElementById("text");

movieCard.onmouseenter = () => {
  body.style.background = "url('./images/movie.jpg') center/cover no-repeat";
};

movieCard.onmouseleave = () => {
  body.style.background = "";
};

weather.onmouseenter = () => {
  body.style.background = "url('./images/weather.jpg') center/cover no-repeat";
};

weather.onmouseleave = () => {
  body.style.background = "";
};

text.onmouseenter = () => {
  body.style.background = "url('./images/text.jpg') center/cover no-repeat";
};

text.onmouseleave = () => {
  body.style.background = "";
};
