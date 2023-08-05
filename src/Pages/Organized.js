import React,{useContext, useEffect} from 'react';
import EventContext from "../context/events/EventContext";
import OrganizedEventCard from '../component/OrganizedEventCard';

const Organized = () => {
    const context = useContext(EventContext);
    const {events ,getEvents} = context;

    useEffect(() => {

        getEvents();
          // eslint-disable-next-line
      }, [])

  return (
    <div className="row my-3 mx-2">
      <div className="container mx-2">
      {events.length === 0 && "No notes to display"}
      </div>
      {events.map((event)=>{
        return <OrganizedEventCard key={event._id} event = {event} />
      })}

    </div>
  )
}

export default Organized
