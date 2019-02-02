const cheerio = require('cheerio');
const axios = require('axios');

const GITHUB_URL = 'https://github.com';

async function getRepositories(language = 'all', since = 'daily') {
  const url = `${GITHUB_URL}/trending/${language}?since=${since}`;
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);
  const repositories = $('.repo-list li')
    .get()
    .map(repo => iterateRepo($(repo)));
  return repositories;
}

async function getDevelopers(language = 'all', since = 'daily') {
  const url = `${GITHUB_URL}/trending/developers/${language}?since=${since}`;
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);
  const developers = $('.explore-content li')
    .get()
    .map(dev => iterateDev($(dev)));
  return developers;
}

exports.getRepositories = getRepositories;
exports.getDevelopers = getDevelopers;

function iterateRepo($repo) {
  const title = $repo
    .find('h3')
    .text()
    .trim();
  const relativeUrl = $repo.find('h3 > a').attr('href');
  const url = GITHUB_URL + relativeUrl;
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

function iterateDev($dev) {
  const url = GITHUB_URL + $dev.find('.f3 a').attr('href');
  const name = $dev
    .find('.f3 a span')
    .text()
    .trim()
    .replace(/[\(\)]/g, '');
  $dev.find('.f3 a span').remove();
  const username = $dev
    .find('.f3 a')
    .text()
    .trim();
  const avatar = $dev
    .find('img')
    .attr('src')
    .replace(/\?s=.*$/, '');
  const $repo = $dev.find('.repo-snipit');
  const repoName = $repo
    .find('.repo-snipit-name span.repo')
    .text()
    .trim();
  const repoDesc = $repo
    .find('.repo-snipit-description')
    .text()
    .trim();
  const repoUrl = `${GITHUB_URL}${$repo.attr('href')}`;
  return {
    username,
    name,
    url,
    avatar,
    repo: {
      name: repoName,
      description: repoDesc,
      url: repoUrl
    }
  };
}
