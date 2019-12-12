import { h } from 'preact';
import { Fragment, useState } from 'preact/compat';
import _ from 'lodash';
import SearchBox from '../SearchBox';

const App = () => {
  const onPageSelected = (page) => {
    console.log("Page selected: ", page);
  };
  return (
    <>
      <SearchBox onPageSelected={onPageSelected} />
      <div id="item-details"></div>
    </>
  );
};

export default App;