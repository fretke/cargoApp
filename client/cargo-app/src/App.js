import React, {useState, useEffect } from 'react';
import ShipArea from "./components/ShipArea";
import DockArea from "./components/DockArea";
import Loading from "./components/Material-UI/Loading"

import ErrorPop from "./components/ErrorPop"
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { getShips, getDock, openErrorWindow } from "./actions";
import { INTERNAL_SERVER_ERROR } from "./utils/errorMessages"



function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(()=>{

    async function getInitData(){
      const res = await fetch("http://localhost:5000/GetInitData", {
        method: "POST",
        credentials: 'same-origin',
        headers:{
          "Content-Type": "application/json"
        },
        // theoretically userId would be used in all requests, but in this case and further requests it is just an example
        // and all requests to the database are done via company name "Demo"
        body: JSON.stringify({userGuid:"5ec53a5e06c11b3540b03cec"}) 
      });
    
      if (res.status === 500){
        dispatch(openErrorWindow(INTERNAL_SERVER_ERROR));
        return;
      }
       return res.json();
    }
    
    getInitData().then((data) => {
      dispatch(getShips(data.ships));
      dispatch(getDock(data.dock.cargoItems));
      setTimeout(() => {
        setDataLoaded(true);
      }, 1000);
    }).catch(err => {
      setDataLoaded(false);
    });
    
  }, [dataLoaded]);

  return (
    <DndProvider backend = {HTML5Backend} >
        <div className="App">
        {dataLoaded && (
          <div>
              <ShipArea />
              <DockArea />
          </div>
        )}
        {!dataLoaded && (
          <Loading />

        )}
        <ErrorPop />
        </div>
    </DndProvider>
  );
}

export default App;
