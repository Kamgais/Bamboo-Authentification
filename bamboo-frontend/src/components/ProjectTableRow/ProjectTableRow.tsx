import React, {FunctionComponent} from 'react'
import {RiEdit2Fill,RiDeleteBin4Fill} from 'react-icons/ri'
import './tableRow.scss';
import { ProjectDto } from '../../api/interfaces';
import { useSingleUser } from '../../hooks';
import ProjectTableMembers from '../ProjectTableMembers/ProjectTableMembers';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';


type RowProps = {
    row: ProjectDto;
}

const ProjectTableRow: FunctionComponent<RowProps> = ({row}) => {
    const {data: author} = useSingleUser(true, row.authorId!)
  return (
    <tr>
    <td>{row.id}</td>
    <td>{row.title}</td>
    <td>
        {row.categories && row.categories[0] ? row.categories[0].categoryName : 'No Category specified'}
        </td>
    <td>{author?.username}</td>
    <td>
        <ProjectTableMembers participants={row.particpations!}/>
    </td>
    <td>
        
        <div className="edit">
        <Tippy content='edit'>
        <RiEdit2Fill/>
        </Tippy>
        </div>
        
        <div className="delete">
            <Tippy content='delete'>
            <RiDeleteBin4Fill/>
            </Tippy>
        </div>
    </td>
</tr>
  )
}

export default ProjectTableRow