import React from 'react';
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from 'hooks/useVisualMode';


const EMPTY = "EMPTY";
const SHOW = "SHOW";

export default function Appointment(props) {
  const { time, interview } = props

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  
  return (
    <article className="appointment">
      <Header time={time} />
      {props.interview ? <Show student={interview.student} interviewer={interview.interviewer}/> : <Empty />}
    </article>
    
  )
}


