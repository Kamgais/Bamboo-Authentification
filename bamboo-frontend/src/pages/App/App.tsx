import React, {FunctionComponent} from 'react'
import './app.scss';
import { AppSideBar, SearchBar, SideBarXtra } from '../../components';
import { Outlet } from 'react-router-dom';


const App: FunctionComponent = () => {
   
  return (
    <div className="app_container">
      <SideBarXtra/>
      <AppSideBar/>
      <SearchBar/>
      <div className="app_container_content">
        <Outlet/>
      </div>
    </div>
  )
}

export default App