import React,{useContext, useEffect} from 'react';
import EventContext from "../context/events/EventContext";
import Slide from "../component/Slide";
import Spinner from '../component/Spinner';
const Volunteered = () => {
    const context = useContext(EventContext);
    const {events ,volunteeredEvents,isLoading} = context;

    useEffect(() => {

        volunteeredEvents();
          // eslint-disable-next-line
      }, [])

  return (
    <div className="row my-3 mx-2">
      
      {isLoading ? <Spinner/>:events.length === 0 ?<div className='container mx-2' >No events to display</div>:events.map((event)=>{
        return <Slide key={event._id} event = {event} isvolunteer={true}/>
      })}
    
   
    </div>
  )
}

export default Volunteered