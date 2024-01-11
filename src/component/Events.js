import React,{useContext, useEffect,useState} from 'react';
import EventContext from "../context/events/EventContext";
import Slide from "./Slide";
import dayjs from 'dayjs';
import Spinner from './Spinner'
import { is } from 'date-fns/locale';
//event is parent component and slide is child component
//isRender is responsible for re rendering of parent component we are passing it as props to slide component
//when the value of isrender is changed in slide component parent component along with child component is rerendered
const Events = () => {
    const context = useContext(EventContext);
    const {events ,getallEvents,getallrequiredEvents,isLoading} = context;
    const [isRender,setisRender]=useState(0);
    useEffect(() => {
      if(localStorage.getItem('token'))
      { getallrequiredEvents();}
    else
    {getallEvents();}
        // eslint-disable-next-line
    }, [isRender])
    
    const today = dayjs().startOf('day');
    let filteredEvents=[];
    if(events.length>0)
    filteredEvents = events.filter((event) =>
    dayjs(event.date).isSame(today, 'day') || dayjs(event.date).isAfter(today)
  );//events which are not expired
  return (
  
    <div className="row my-3 mx-2">
     {isLoading?<Spinner/>:filteredEvents.length===0 ? <div className='container mx-2'>No events to display</div>: filteredEvents.length>0 && filteredEvents.map((e)=>
   {   
        return <Slide key={e._id} event = {e} isvolunteer={false} setisRender={setisRender} isRender={isRender}/>
  })}

     

    </div>
     
  )
}

export default Events
