import React from 'react';
import {HistoricalTable} from './components/historicaltable';
import {Toolbar} from './components/toolbar';
import {socket, WebSocketProvider} from './context/websocketcontext';

function App() {
  return (
    <div className="App">
      <WebSocketProvider value={socket}>
        <Toolbar />
        <HistoricalTable />
      </WebSocketProvider>
    </div>
  );
}

export default App;
