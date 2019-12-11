import { h } from 'preact';

const App = () => {
  const onInputChange = (e) => {
    console.log(e);
  };
  return (
    <input type="text" onChange={onInputChange} />
  );
};

export default App;