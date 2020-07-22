import React, {useState} from 'react';
import './App.css';
import OpenlayersMap from "components/map/OpenlayersMap";

function App() {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <h1>Openlayers workshop</h1>
      <div>
        <button onClick={() => setVisible(!visible)}>show/hidden</button>
      </div>
      { visible && <OpenlayersMap /> }
    </div>
  );
}

export default App;
