import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const { name, avatar, setInterviewer } = props
  const interviewerItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });
  
  return <li onClick={setInterviewer} className={interviewerItemClass}>
  <img
    className="interviewers__item-image"
    src={avatar}
    alt={name}
  />
  {props.selected && props.name}
</li>

} 
