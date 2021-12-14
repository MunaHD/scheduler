import React from 'react';
import PropTypes from 'prop-types';
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem"

const InterviewerList = (props) => {
  
  const { interviewers, onChange} = props;
  const InterviewItems = interviewers.map((int) => <InterviewerListItem key={int.id} {...int} selected={int.id === props.value} setInterviewer={() => onChange(int.id)}/> )
  return (
    <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">
   {InterviewItems}   
  </ul>
</section>
  )
}
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;
