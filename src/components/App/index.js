import { h } from 'preact';
import { Fragment, useState } from 'preact/compat';
import _ from 'lodash';
import { search, getPage } from '../../wikiAPI';

const searchDelay = 500;

const searchTerm = _.debounce(
  (term, onResult) => {
    search(term)
      .then(onResult);
  },
  searchDelay
);
const onInputChange = (e, onResult) => {
  const val = e.target.value;
  if (val.length >= 3) {
    searchTerm(val, onResult);
  } else {
    searchTerm.cancel();
  }
};

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchRes] = useState([]);
  const onResult = (res) => {
    setIsLoading(false);
    setSearchRes(res);
  };
  const onInput = (e) => {
    setIsLoading(true);
    onInputChange(e, onResult);
  };
  return (
    <>
      <input type="text" onInput={onInput} />
      <div id="search-results">
        {
          (isLoading)
            ? <div>Loading...</div>
            : (
              <ul>
                {
                  searchResults.map((res) => (
                    <li onClick={() => console.log("click", res)}>{res}</li>
                  ))
                }
              </ul>
            )
        }
      </div>
      <div id="item-details"></div>
    </>
  );
};

export default App;