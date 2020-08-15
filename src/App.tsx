import 'antd/dist/antd.css';
import React, { FunctionComponent } from 'react';
import './App.css';
import { ToolsPage } from './Components/tools-page';
// import { RepositoriesContainer } from './Components/Repositories';

const App: FunctionComponent = () => {

  return (
    <div className="container">
      <ToolsPage />
    </div>
  );
}

export default App;
