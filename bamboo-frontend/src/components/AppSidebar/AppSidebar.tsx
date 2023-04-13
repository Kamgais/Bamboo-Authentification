import React, {FunctionComponent, useState, useEffect} from 'react'
import {MdDashboardCustomize,MdAddCircleOutline} from 'react-icons/md';
import {TfiBlackboard} from 'react-icons/tfi'
import {GoProject} from 'react-icons/go'
import {IoSettingsSharp} from 'react-icons/io5'
import { SideBarItem } from '../../utils/sidebarItem';
import './appSidebar.scss';
import { useLocation, useNavigate } from 'react-router-dom';



const AppSidebar: FunctionComponent = () => {
    const navigate = useNavigate();
    const {pathname} =  useLocation();
    console.log(pathname.split('/'))
    useEffect(() => {
        const index = items.findIndex((item) => item.route === pathname.split('/')[2]);
        const newItems = [...items];
        newItems[index].isFocused = true;
        setItems(newItems);
    },[pathname])
    const initialValues = [
        {
            icon: MdDashboardCustomize,
            label: 'Dashboard',
            isFocused: false,
            route: 'dashboard'
        },
    
        {
            icon: TfiBlackboard,
            label: 'Project Managers',
            isFocused: false,
            route: 'projects'
        },
    
        {
            icon: MdAddCircleOutline,
            label: 'Add Project',
            isFocused: false,
            route: 'project/add'
        },
    
        {
            icon: GoProject,
            label: 'Board',
            isFocused: false,
            route: 'board'
        },
    
        {
            icon: MdAddCircleOutline,
            label: 'Add Task',
            isFocused: false,
            route: 'task/add'
        },
    
        {
            icon: IoSettingsSharp,
            label: 'Settings',
            isFocused: false,
            route: 'settings'
        }
    ]
    const [items, setItems] = useState<SideBarItem[]>(initialValues);
       
     const removeAllFocused = () => {
        const newItems = items.map((item) => ({...item, isFocused: false}))
         setItems(newItems)
         
    }

    const setFocused = (route: any) => {
        removeAllFocused();
        navigate(`${route}`)
    }
  return (
    <div className="app_sidebar_container">
        <div className="app_sidebar_head">
            <div className="app_sidebar_img">
                <img src="/fav.png" alt="" className='app_sidebar_img_image' />
            </div>
            <p className="app_sidebar_head_title">Bamboo Manager</p>
        </div>
        <ul className="app_sidebar_list">
            {
                items.map((item: any, index: any) => (
                    <li className={item.isFocused ? "app_sidebar_list_item focused": "app_sidebar_list_item"} key={index}  onClick={() => setFocused(item.route)}>
                        <div className="app_sidebar_list_item_icon">
                            <item.icon/>
                        </div>
                        <div className="app_sidebar_list_item_label">
                            {item.label}
                        </div>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default AppSidebar