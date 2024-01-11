import { useState} from "react";
import EventContext from "./EventContext";

const EventState = (props)=>{
  const host ="http://localhost:5000";
      let eventsInitial = [];
      let [events, setEvents] = useState(eventsInitial);
      let [isLoading,setisLoading]=useState(true)
      //Get all the events
      const getallEvents = async ()=>{
        //api call
        setisLoading(true);
        const response = await fetch(`${host}/api/events/globalfetchevents`, {
          method: "GET", 
          
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        // console.log("getall func");
        // console.log(json);
        setEvents(json);
        setisLoading(false);
        
      }
      //Get all the required events
      const getallrequiredEvents = async ()=>{
        //api call
        setisLoading(true);
        const response = await fetch(`${host}/api/events/globalfetchrequiredevents`, {
          method: "GET", 
          
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token')
          },
        });
        const json = await response.json();
        // console.log("getall func");
        // console.log(json);
        setEvents(json);
        setisLoading(false);
        
      }
      //Get all the events user has organized
      const getEvents = async ()=>{
        //api call
        setisLoading(true);
        const response = await fetch(`${host}/api/events/fetchallevents`, {
          method: "GET", 
          
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token')
          },
        });
        const json = await response.json();

        // console.log(json);
        setEvents(json);
        setisLoading(false);
        
      }
      //Get all the events user has been participated
      const volunteeredEvents = async ()=>{
        //api call
        setisLoading(true);
        const response = await fetch(`${host}/api/events/fetchvolunteeredevents`, {
          method: "GET", 
          
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token')
          },
        });
        const json = await response.json();

        // console.log(json);
        setEvents(json);
        setisLoading(false);
        
      }

      

      //ADD a Event
      const addEvent = async (image,title,description,address,date,volunteer)=>{
        //api call
        setisLoading(true);
        const response = await fetch(`${host}/api/events/addevent`, {
          method: "POST", 
          
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token')
          },
          body: JSON.stringify({image,title,description,address,date,volunteer}),
        });
        const event = await response.json();

        // console.log("New event:");
        // console.log(date);
        
        setEvents(events.concat(event));
        setisLoading(false);
      }

      //Delete a event
      // const deleteEvent = async (id)=>{
      //   //api call
      //   const response = await fetch(`${host}/api/events/deleteevent/${id}`, {
      //     method: "DELETE", 
          
      //     headers: {
      //       "Content-Type": "application/json",
      //       "auth-token" : localStorage.getItem('token')
      //     },
      //   });
      //   const json =await response.json(); 
      //   console.log(json);
      //   console.log("deleted event"+id);
      //   const newEvents = events.filter((event)=>{return event._id!==id})
      //   setEvents(newEvents)
      // }

      //EDIT a Event
      // const editEvent = async (id, title, description, tag)=>{
      //   //api call
      //   const response = await fetch(`${host}/api/events/updateevent/${id}`, {
      //     method: "PUT", 
          
      //     headers: {
      //       "Content-Type": "application/json",
      //       "auth-token" : localStorage.getItem('token')
      //     },
      //     body: JSON.stringify({title, description , tag}),
      //   });
      //   const json =await response.json(); 
      //   console.log(json);
      
      //   let newEvents = JSON.parse(JSON.stringify(events))
      //   //logic to edit in client
       
      //     for (let index = 0; index < newEvents.length; index++) {
      //       const element = newEvents[index];
      //       if(element._id === id){
      //         newEvents[index].title = title;
      //         newEvents[index].description = description;
      //         newEvents[index].tag = tag;
      //         break;
      //       }
      //     }
      //     setEvents(newEvents);
        
      // }
      const register = async (id)=>{
        //api call
        setisLoading(true);
        const response = await fetch(`${host}/api/events/updateevent/${id}`, {
          method: "POST", 
          
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token')
          }
        });
        const json =await response.json();
        setisLoading(false); 
        // console.log(json.isRegistered);
        
      }
      
      const checkRegistration = async (id)=>{
        //api call
        const response = await fetch(`${host}/api/events/checkRegistration/${id}`, {
          method: "GET", 
          
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token')
          }
        });
        const json =await response.json(); 
        // console.log(json);
        
        return json;
        
      }

    return (
        <EventContext.Provider value={ {isLoading,events,getallrequiredEvents , getallEvents, volunteeredEvents, addEvent, getEvents , register, checkRegistration} }>
          {props.children}
        </EventContext.Provider>
      )

    
}

export default EventState;  