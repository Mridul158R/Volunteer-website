import React,{useContext, useEffect, useRef, useState} from 'react';
import EventContext from "../context/events/EventContext";
import Slide from "./Slide";
import EventState from '../context/events/EventState';

const Events = () => {
    const context = useContext(EventContext);
    const {events ,getallEvents} = context;

    useEffect(() => {

        getallEvents();
          // eslint-disable-next-line
      }, [])
  return (
    <div className="row my-3 mx-2">
      <div className="container mx-2">
      {events.length === 0 && "No notes to display"}
      </div>
      {events.map((event)=>{
        return <Slide key={event._id} event = {event} />
      })}

    </div>
     
  )
}

export default Events
