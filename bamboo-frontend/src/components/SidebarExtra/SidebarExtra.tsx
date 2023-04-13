import React, {FunctionComponent, useState} from 'react'
import { SideBarItem } from '../../utils/sidebarItem'
import {FiSearch} from 'react-icons/fi'
import {MdAdd} from 'react-icons/md'
import './sidebarExtra.scss';


const initialValues = [
    {
        icon: FiSearch,
        label: 'Search',
        isFocused: false,
        route: ''
    },
    {
        icon: MdAdd,
        label: 'Add',
        isFocused: false,
        route: ''
    }
]

const SidebarExtra: FunctionComponent = () => {
    const [items, setItems] = useState<SideBarItem[]>(initialValues)
  return (
    <div className="sidebar_extra_container">
        <ul className="sidebar_extra_list">

        
        {
            items.map((item :any, index: any) => (
                <li className="sidebar_extra_list_item" key={index}>
                    <div className="list_item_icon">
                    <item.icon/>
                    </div>
                    <div className="list_item_label">
                    {item.label}
                    </div>
                     
                </li>
            ))
        }
        </ul>
    </div>
  )
}

export default SidebarExtra