import React from 'react';
import './App.css';
// import HookReducer2 from './components/HookReducer2'
import FocusInput from './components/HookRef'


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
      {/* <HookReducer2 /> */}
      <FocusInput />
    </div>
  );
}

export default App;
