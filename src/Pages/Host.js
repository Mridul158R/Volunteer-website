import React, { useContext, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router";
import EventContext from "../context/events/EventContext";
import axios from 'axios'
const Host = () => {
  let navigate = useNavigate(); 
  const context = useContext(EventContext);
  const {addEvent} = context;
  const [selectedDate, setSelectedDate] = useState(null);
  const [event, setEvent] = useState({id:"",image:"", title: "", description: "", address: "",volunteer: "",date : "" })
  const [image,setImage]=useState();
  const handleDateChange = (date) => {
    setSelectedDate(date.toDate()); 
    event.date = date.toDate();
  
  };
  const onChange =async (e) => 
   { 
    setEvent({ ...event, [e.target.name]: e.target.value })
   }

const handleFileUpload = async (e)=>{
  const file = e.target.files[0];
   setImage(file);
}

const handleSubmit = async(e)=>{
  e.preventDefault();
  const formData= new FormData()
  formData.append('image',image)
    if(localStorage.getItem('token')){
      navigate("/")
      addEvent(image.name,event.title, event.description, event.address, event.date , event.volunteer);
      await axios.post("http://localhost:5000/upload-image",formData,
      {
        headers:{"Content-Type":"multipart/form-data"},
      })
    

  }
  else{
    navigate("/login");
  }
   
  
  }
  const handlePositiveInteger=async(e)=>{
    let num=Number(e.target.value)
    if(Number.isInteger(num) && num>0 && num<50)
    {
      // console.log(num)
      setEvent({...event,[e.target.name]:e.target.value})
    }
  }
  
  return (
    <>
    <div className='container'>
    <form onSubmit={handleSubmit}>
  <div className="mb-3 my-1">
    <label htmlFor="image" className="form-label">Image</label>
    <input type="file" name="image"  className="form-control" id="image"  onChange={handleFileUpload} accept="image/*"/>
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
    <input type="number" className="form-control" id="volunteer" name="volunteer" value ={event.volunteer} onChange={handlePositiveInteger}  onKeyDown={ e => ( e.keyCode === 69 || e.keyCode === 190 ) && e.preventDefault() }
    />
  </div>
  
  
    <div className="mb-3">
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
    </div>
  <div className="mb-3"><button type="submit" className="btn btn-primary">Submit</button></div>
</form>

    </div>
    </>
  )
}

export default  Host

