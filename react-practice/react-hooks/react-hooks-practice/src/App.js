import React from 'react';
import './App.css';
import HookReducer2 from './components/HookReducer2'

export const UserContext = React.createContext()
export const ChannelContext = React.createContext()

function App() {
  return (
    <div className="App">
      {/* <UserContext.Provider value={'janily'} >
        <ChannelContext.Provider value={'Code'} >
          <ComponentC />
        </ChannelContext.Provider>
      </UserContext.Provider> */}
      <HookReducer2 />
    </div>
  );
}

export default App;
