import { h } from 'preact';
import { Fragment, useState } from 'preact/compat';
import _ from 'lodash';
import SearchBox from '../SearchBox';
import { getPage } from '../../wikiAPI';
import localforage from 'localforage';

// const maxTTL = 10000;
const maxTTL = 1000 * 60 * 60 * 24;
const needsUpdate = (pageData) => {
  if (!pageData || !pageData.updated) {
    return true;
  }
  const diff = new Date() - pageData.updated;
  return diff > maxTTL;
};

const App = () => {
  const [pageData, setPageData] = useState(null);
  const onPageSelected = async (pageId) => {
    console.log("Page selected: ", pageId);
    let pageData = await localforage.getItem(pageId);
    if (needsUpdate(pageData)) {
      setPageData(null);
      const pageContent = await getPage(pageId);
      console.log("Page loded: ", pageContent);
      pageData = {
        title: pageContent.title,
        text: pageContent.text,
        // price: pageContent.info.price,
        // img: pageContent.mainImage,
        // url: pageContent.url,
        // content: pageContent.content,
        updated: new Date()
      };
      await localforage.setItem(pageId, pageData);
    }
    setPageData(pageData);
  };
  return (
    <>
      <SearchBox
        onPageSelected={onPageSelected}
      />
      <div id="item-details">
        {
          (pageData)
            ? (
              <>
                <h1>{pageData.title}</h1>
                <div dangerouslySetInnerHTML={{__html: pageData.text}}></div>
                {/* <img src={pageData.img} />
                <div>Price: {pageData.price}</div>
                {
                  pageData.content.map((section) => (
                    <>
                      <h2>{section.title}</h2>
                      <p>{section.content}</p>
                    </>
                  ))
                } */}
              </>
            )
            : null
        }
      </div>
    </>
  );
};

export default App;