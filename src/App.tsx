import 'antd/dist/antd.css';
import React, { FunctionComponent } from 'react';
import './App.css';
import { ToolsPageContainer } from './Components/tools-page';

const App: FunctionComponent = () => {

  return (
    <div className="container">
      <ToolsPageContainer />
    </div>
  );
}

export default App;
