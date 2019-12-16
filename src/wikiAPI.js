import _ from 'lodash';
import buildUrl from 'build-url';

const API_URL = "https://escapefromtarkov.gamepedia.com/";

export const search = async (term, limit = 10) => {
  const req = buildUrl(API_URL, {
    path: 'api.php',
    queryParams: {
      format: "json",
      origin: "*",
      action: "query",
      list: "search",
      srsearch: term,
      srlimit: limit
    }
  });
  const res = await fetch(req);
  const json = await res.json();
  const out = json.query.search.map((r) => ({
    title: r.title,
    pageId: r.pageid
  }));
  return out;
};

export const getPage = async (pageId) => {
  const req = buildUrl(API_URL, {
    path: 'api.php',
    queryParams: {
      format: "json",
      origin: "*",
      action: "parse",
      disabletoc: "true",
      prop: "text|displaytitle",
      mobileformat: "true",
      pageid: pageId
    }
  });
  const res = await fetch(req);
  const json = await res.json();
  const out = {
    title: json.parse.displaytitle,
    text: json.parse.text["*"]
  };
  return out;
};
