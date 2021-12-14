import React from 'react';
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from 'hooks/useVisualMode';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE= "CREATE";
const SAVING= "SAVING";
const DELETING= "DELETING";
const CONFIRM= "CONFIRM";
const EDIT= "EDIT";

export default function Appointment(props) {
  //console.log(props)
  const { id, time, interview, interviewers,  bookInterview, deleteInterview } = props //props return time
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      }); 
  }

  function deleteAppointment() {
    transition(DELETING)
    deleteInterview(id)
    .then(() => {
      transition(EMPTY);
    });
      
  } 

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY &&  <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer} onDelete={() => transition(CONFIRM)} onEdit={() => transition(EDIT)}/> }
      {mode === CREATE && <Form interviewers={interviewers} onCancel={() => back()} onSave={save} /> }
      {mode === SAVING && <Status message={SAVING}/> }
      {mode === DELETING && <Status message={DELETING}/> }
      {mode === CONFIRM && <Confirm onCancel={() => back()} onConfirm={deleteAppointment}/> }
      {mode === EDIT && <Form interviewers={interviewers} student={interview.student} interviewer={props.interview.interviewer ? props.interview.interviewer.id : null } onCancel={() => back()} onSave={save} /> }
    </article>
    
  )
}


