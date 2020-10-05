import React from 'react';
import './App.css';
import ComponentC from './components/HookComponentC'

export const UserContext = React.createContext()
export const ChannelContext = React.createContext()

function App() {
  return (
    <div className="App">
      <UserContext.Provider value={'janily'} >
        <ChannelContext.Provider value={'Code'} >
          <ComponentC />
        </ChannelContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
