import React, {FunctionComponent} from 'react'
import './addProjectPage.scss';
import { Form, Formik } from 'formik';
import { FormControl } from '../../components';

const AddProjectPage: FunctionComponent = () => {
  return (
    <div className="add_project_container">
        <div className="add_project_head">
            <h3 className="add_project_title">Create Project</h3>
            <button className="add_project_add_member_button">Add Member</button>
        </div>
        <div className="add_project_form">
            <Formik initialValues={{}} validationSchema={{}} onSubmit={() => {}}>
                {
                    ({isSubmitting, isValid, dirty}) => (
                        <Form>
                            <FormControl withLabel={true} control='input' name='title' label='Project name'/>
                            <FormControl withLabel={true} control='placeholder' name='description' label='Description'/>
                            <FormControl withLabel={true} control='date' name='startDate' label='Start Date'/>
                            <FormControl withLabel={true} control='date' name='endDate' label='End Date'/>
                        </Form>
                    )
                }
            </Formik>
        </div>
    </div>
  )
}

export default AddProjectPage