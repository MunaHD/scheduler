import React from 'react';
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, onChange } = props
  
  const dayList = days.map((day) => <DayListItem key={day.id} {...day} selected={day.name === props.value} setDay={onChange} />);
  
  return (
    <ul>
      {dayList}
    </ul>
  );
}