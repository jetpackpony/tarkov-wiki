import { h } from 'preact';
import { Fragment, useState } from 'preact/compat';
import _ from 'lodash';
import SearchBox from '../SearchBox';
import { getPage } from '../../wikiAPI';

const App = () => {
  const [pageData, setPageData] = useState(null);
  const onPageSelected = async (pageTitle) => {
    console.log("Page selected: ", pageTitle);
    const pageContent = await getPage(pageTitle);
    console.log("Page loded: ", pageContent);
    setPageData({
      title: pageTitle,
      price: pageContent.info.price,
      img: pageContent.mainImage,
      url: pageContent.url,
      content: pageContent.content
    })
  };
  return (
    <>
      <SearchBox onPageSelected={onPageSelected} />
      <div id="item-details">
        {
          (pageData)
            ? (
              <>
                <h1><a href={pageData.url}>{pageData.title}</a></h1>
                <img src={pageData.img} />
                <div>Price: {pageData.price}</div>
                {
                  pageData.content.map((section) => (
                    <>
                      <h2>{section.title}</h2>
                      <p>{section.content}</p>
                    </>
                  ))
                }
              </>
            )
            : null
        }
      </div>
    </>
  );
};

export default App;