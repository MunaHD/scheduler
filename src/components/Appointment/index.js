import React from 'react';
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from 'hooks/useVisualMode';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';

const EMPTY          = "EMPTY";
const SHOW           = "SHOW";
const CREATE         = "CREATE";
const SAVING         = "SAVING";
const DELETING       = "DELETING";
const CONFIRM        = "CONFIRM";
const EDIT           = "EDIT";
const ERROR_SAVE     = "ERROR_SAVE" 
const ERROR_DELETE   = "ERROR_DELETE" 

export default function Appointment(props) { 
  const {
    id,
    time,
    interview,
    interviewers,
    bookInterview,
    deleteInterview
  } = props
  const { mode, transition, back } = useVisualMode( interview ? SHOW : EMPTY );
  
  
  function save(name, interviewer) {
    //set the interview with the student name and the interviewer that is passed to the function
    const interview = {
      student: name,
      interviewer
    };
    //transition to show the saving status
    transition(SAVING);
    
    // pass the interview we made and the id to the function 
    //- then transition to show the saved appointment
    // if it fails we show the error message
    bookInterview(id, interview)
    .then(() => {
      transition(SHOW);
      })
    .catch(() => {
      transition(ERROR_SAVE, true);
    })
  }

  function deleteAppointment() {
    //show the deleting status
    transition(DELETING, true);
    //delete the appointment at the specified id
    //- then show the empty appointment slot
    // if it fails then we show the error message
    deleteInterview(id)
    .then(() => {
      transition(EMPTY);
    })
    .catch(() => {
      transition(ERROR_DELETE, true);
    })
      
  } 

  return (
    <article className="appointment"  data-testid="appointment">
      <Header time={time} />

      {mode === EMPTY && (
        <Empty
          onAdd={() => transition(CREATE)}
        />
      )}
      
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}

      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          student={interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      
      {mode === ERROR_DELETE && (
        <Error
          message="could not cancel appointment."
          onClose={() => back()}
        />
      )}
      
      {mode === ERROR_SAVE && (
        <Error
          message="could not save appointment."
          onClose={() => back()}
        />
      )}
    
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => back()}
          onConfirm={deleteAppointment}
        />
      )}
    
      {mode === SAVING && (
        <Status
          message="Saving"
        />
      )}
    
      {mode === DELETING && (
        <Status
          message="Deleting"
        />
      )}
    </article>
  
  )
}
