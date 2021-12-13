import React from 'react';
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from 'hooks/useVisualMode';
import Form from 'components/Appointment/Form';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE= "CREATE";

export default function Appointment(props) {
  //console.log(props)
  const { id, time, interview, interviewers,  bookInterview } = props //props return time
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

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY &&  <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer}/> }
      {mode === CREATE && <Form interviewers={interviewers} onCancel={() => back()} onSave={save} /> }
    </article>
    
  )
}


