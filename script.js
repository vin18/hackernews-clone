'use strict';

const newsApi = `https://hn.algolia.com/api/v1/search_by_date?tags=story`;

const newsParent = document.querySelector('.news__container');

async function fetchNews(newsApi) {
  const res = await fetch(newsApi);
  const { hits } = await res.json();
  return hits;
}

async function init() {
  const newsData = await fetchNews(newsApi);

  newsParent.innerHTML = newsData
    .slice(0, 13)
    .map((el) => {
      return `<a target="_blank href=${el.url} class="news-item">
      <div class="flex news__item-parent">
        <div class="news__number">
          <span>${el.points}</span>
          <i class="fas fa-caret-up"></i>
        </div>
        <div class="news__item-title">
          <div class="flex items-center">
            <p>${el.title}</p>
          </div>

          <div class="news__item-website">posted by <a href="#">${
            el.author
          }</a> ${moment(el.created_at).fromNow()} | hide | <a href="#">${
        el.num_comments
      } comments</a></div>
        </div>
      </div>
      </a>`;
    })
    .join('');
}

init();
