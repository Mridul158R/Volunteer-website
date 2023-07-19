import { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import EventContext from '../context/events/EventContext';
import './recent.css'

const RecentCard = (props) => {
    const { event } = props;
  const context = useContext(EventContext);
  const { register, checkRegistration } = context;
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const fetchRegistrationStatus = async () => {
  //     const userRegistered = await checkRegistration(event._id);
  //     await setIsRegistered(userRegistered);
  //     console.log(isRegistered);
  //     setIsLoading(false);
  //   };
  //   fetchRegistrationStatus();
  // }, [event._id, checkRegistration]);

  const handleVolunteer = async () => {
      await console.log(await checkRegistration(event._id));
      await register(event._id);
      setIsRegistered(true);
  };

  // Add this useEffect to update the registration status when the user changes
  useEffect(() => {
    setIsRegistered(false);
  }, [context.user]);



  return (
    <>
      <div className='content grid3 mtop'>
        
          
            <div className='box shadow' >
              <div className='img'>
                <img src={event.image} alt='' />
              </div>
              <div className='text'>
                <div className='category flex'>
                  
                </div>
                <h4>{event.address}</h4>
                <p>
                  <i className='fa fa-location-dot'></i> {event.address}
                </p>
              </div>
              <div className='button flex'>
                <div>
                  <button className='btn2' onClick={handleVolunteer}>Volunteer</button>
                </div>
              </div>
            </div>
          
        
      </div>
    </>
  )
}

export default RecentCard