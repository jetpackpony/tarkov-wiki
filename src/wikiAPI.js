import wiki from 'wikijs';
import _ from 'lodash';

const w = wiki({
  apiUrl: 'https://escapefromtarkov.gamepedia.com/api.php',
  origin: "*"
});

export const search = async (term, limit = 10) => {
  //return w.search(term, limit);
  return Promise.resolve(["Damaged hard drive", "Dogtag"]);
};

export const getPage = async (title) => {
  const page = await w.page(title);
  const promises = {
    backlinks: page.backlinks(),
    categories: page.categories(),
    content: page.content(),
    coordinates: page.coordinates(),
    // // externalLinks: page.externalLinks(),   this one not working
    fullInfo: page.fullInfo(),
    html: page.html(),
    images: page.images(),
    info: page.info(),
    langlinks: page.langlinks(),
    links: page.links(),
    mainImage: page.mainImage(),
    raw: page.raw,
    rawContent: page.rawContent(),
    rawImages: page.rawImages(),
    rawInfo: page.rawInfo(),
    references: page.references(),
    sections: page.sections(),
    summary: page.summary(),
    tables: page.tables(),
    url: page.url(),
  };
  return _.zipObject(_.keys(promises), await Promise.all(_.values(promises)));
};
