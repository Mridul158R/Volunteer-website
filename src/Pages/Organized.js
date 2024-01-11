import React,{useContext, useEffect} from 'react';
import EventContext from "../context/events/EventContext";
import OrganizedEventCard from '../component/OrganizedEventCard';
import Spinner from '../component/Spinner';

const Organized = () => {
    const context = useContext(EventContext);
    const {isLoading,events ,getEvents} = context;

    useEffect(() => {

        getEvents();
          // eslint-disable-next-line
      }, [])

  return (
    <div className="row my-3 mx-2">
      
      {isLoading?<Spinner/>:events.length===0 ? <div className="container mx-2">No notes to display</div>
      :events.length>0 && events.map((event)=>{
        return <OrganizedEventCard key={event._id} event = {event} />
      })}

    </div>
  )
}

export default Organized
