import React, { useContext, useState } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import "react-datepicker/dist/react-datepicker.css";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router";
import EventContext from "../context/events/EventContext";


const Host = () => {
  let navigate = useNavigate(); 
  const context = useContext(EventContext);
  const {events, addEvent} = context;
  const [selectedDate, setSelectedDate] = useState(null);
  const [event, setEvent] = useState({id:"",image:"", title: "", description: "", address: "",volunteer: "",date : "" })
  const handleDateChange = (date) => {
    setSelectedDate(date.toDate()); 
    // setSelectedDate(date); // Convert to a Date object
    event.date = date.toDate();
    console.log(selectedDate);
  };
  const onChange =async (e) => {
    
    setEvent({ ...event, [e.target.name]: e.target.value })
   
}

const handleFileUpload = async (e)=>{
  const file = e.target.files[0];
    let base64 = await convertToBase64(file);
    setEvent({ ...event, image: base64 });
}

const handleSubmit = async(e)=>{
  e.preventDefault();
  console.log(event);
  console.log(localStorage.getItem('token'));
  if(localStorage.getItem('token')){
    addEvent(event.image, event.title, event.description, event.address, event.date , event.volunteer);
    navigate("/")
  }
  else{
    navigate("/login");
  }
  }

  return (
    <>
    <div className='container'>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="image" className="form-label">Image</label>
    <input type="file" name="image"  className="form-control" id="image"  onChange={handleFileUpload} accept=".jpeg, .png, .jpg"/>
  </div>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Name of Event</label>
    <input type="text" name="title"  className="form-control" id="tile" value ={event.title} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name="description" value ={event.description} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="address" className="form-label">Address</label>
    <input type="text" className="form-control" id="address" name="address" value ={event.address} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="volunteer" className="form-label">Volunteer</label>
    <input type="number" className="form-control" id="volunteer" name="volunteer" value ={event.volunteer} onChange={onChange}/>
  </div>
  
  
  <button type="submit" className="btn btn-primary">Submit</button>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disablePast
        value={selectedDate}
        onChange={handleDateChange}
      />
      <TextField
        label="Selected Date"
        value={selectedDate ? selectedDate.toDateString() : ''}
        // You can use the selectedDate value in your form input as needed
      />
    </LocalizationProvider>
</form>

    </div>
    </>
  )
}

export default  Host

function convertToBase64(file){
  return new Promise((resolve,reject)=>{
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload=()=>{
      resolve(fileReader.result)
    };
    fileReader.onerror = (error)=>{
      reject(error);
    }
  })
} 