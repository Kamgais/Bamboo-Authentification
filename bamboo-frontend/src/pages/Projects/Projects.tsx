import React, {FunctionComponent} from 'react'
import {MdOutlineAdd} from 'react-icons/md';
import './projects.scss';

import { useProjects, useSingleUser } from '../../hooks';
import { ProjectDto } from '../../api/interfaces';
import { ProjectTableRow } from '../../components';
import AppRequestSpinner from '../../components/AppRequestSpinner/AppRequestSpinner';



const Projects: FunctionComponent = () => {
  const {data: projects, isFetching} = useProjects();

 // const participantIds = 
 // const authors = authorIds?.map((id) => {useSingleUser(!!authorIds, id!)})

  
  return (
    <div className="projects_container">
     {
       isFetching && (
        <AppRequestSpinner/>
       )
     }
      <div className="projects_container_head">
        <h3 className='projects_container_head_title'>List Projects</h3>
        <button className="projects_container_head_add_button">
          <MdOutlineAdd/>
        </button>
      </div>
      <div className="projects_container_table">
        <table className='projects_container_table_element'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Project Name</th>
                    <th>Project Category</th>
                    <th>Author</th>
                    <th>Members</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    projects?.map((project, index) => (
                       <ProjectTableRow row={project} key={index}/>
                    ))
                }
               
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Projects