import React, {FunctionComponent} from 'react'
import './tableMembers.scss';
import { ParticipationDto } from '../../api/interfaces';
import { useQueries } from 'react-query';
import { getUserById } from '../../api/services';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';


type MemberProps = {
    participants: ParticipationDto[]
}

const ProjectTableMembers: FunctionComponent<MemberProps> = ({participants}) => {
    const members = useQueries(
        participants.map((participant) => ({queryKey: ['particiapnt', participant.id], queryFn: () => getUserById(participant.userId!)}))
    )
    console.log(members)
  return (
        <>
        {
        members.length !== 0 && (
            <>
            <div className='member-item'>{members[0]?.data}</div>
        <div className='member-item'>{members[1]?.data}</div>
        <div className='member-item'>{members[2]?.data}</div>
        </>
            )
        }
        <Tippy content='Add a member'>
         <div className='member-item'>+</div>
        </Tippy>
        
        </>
  )
}

export default ProjectTableMembers