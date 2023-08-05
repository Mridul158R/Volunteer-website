import React,{useContext, useEffect, useRef, useState} from 'react';
import EventContext from "../context/events/EventContext";
import Slide from "./Slide";
import dayjs from 'dayjs';

const Events = () => {
    const context = useContext(EventContext);
    const {events ,getallEvents} = context;
    const today = dayjs().startOf('day');
    const filteredEvents = events.filter((event) =>
    dayjs(event.date).isSame(today, 'day') || dayjs(event.date).isAfter(today)
  );
    useEffect(() => {

        getallEvents();
          // eslint-disable-next-line
      }, [])
  return (
    <div className="row my-3 mx-2">
      <div className="container mx-2">
      {events.length === 0 && "No notes to display"}
      </div>
      {filteredEvents .map((event)=>{
        return <Slide key={event._id} event = {event} />
      })}

    </div>
     
  )
}

export default Events
