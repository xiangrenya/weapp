const cheerio = require('cheerio');
const axios = require('axios');

const BASE_URL = 'https://github.com';

async function getRepositories(language = 'javascript', since = 'daily') {
  const url = `${BASE_URL}/trending/${language}?since=${since}`;
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);
  const repositories = $('.repo-list li')
    .get()
    .map(repo => iterateRepo($(repo)));
  return repositories;
}

exports.getRepositories = getRepositories;

function iterateRepo($repo) {
  const title = $repo
    .find('h3')
    .text()
    .trim();
  const relativeUrl = $repo.find('h3 > a').attr('href');
  const url = BASE_URL + relativeUrl;
  const description = $repo
    .find('.py-1 p')
    .text()
    .trim();
  // 有些仓库没有显示语言，会出现 undefined 的错误
  let lang = null;
  let langColor = null;
  const $lang = $repo.find('[itemprop=programmingLanguage]');
  if ($lang.length) {
    lang = $lang.text().trim();
    langColor = $repo.find('.repo-language-color').css('background-color');
  }
  const stars = parseInt(
    $repo
      .find(`[href="${relativeUrl}/stargazers"]`)
      .text()
      .trim()
      .replace(',', '')
  );
  const currentPeriodStars = parseInt(
    $repo
      .find('.float-sm-right')
      .text()
      .trim()
      .split(' ')[0]
      .replace(',', '')
  );
  const forks = parseInt(
    $repo
      .find(`[href="${relativeUrl}/network"]`)
      .text()
      .trim()
      .replace(',', '')
  );
  return {
    title,
    url,
    description,
    lang,
    langColor,
    stars,
    currentPeriodStars,
    forks
  };
}
