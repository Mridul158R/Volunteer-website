import { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import EventContext from '../context/events/EventContext';
import dayjs from 'dayjs';
import 'dayjs/locale/en'; 
import './recent.css'
// import { makeStyles } from '@mui/material';
import styles from './stylesTemp.css'

// const useStyles = (() => {
//     temp:{
//         backkground : "red"
//     }
// })

function OrganizedEventCard(props) {
//   const classes = useStyles();
  const { event } = props;
  const context = useContext(EventContext);
  const { register, checkRegistration } = context;
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = async () => {
    setIsExpanded(!isExpanded);
    console.log(event.registrations);
  };

  // Add this useEffect to update the registration status when the user changes
  useEffect(() => {
    setIsRegistered(false);
  }, [context.user]);

  const formatDate = (date) => {
    return dayjs(date).format('MMMM D, YYYY');
  };
  
  return (
    <div className="col-sm-3 ">
      <Card className='shadow-lg p-3 mb-5 bg-white rounded'>
        <Card.Img variant="top" src={event.image} />
        <Card.Body>
          <Card.Title className='text-center'>{event.title}</Card.Title>
          <div className="d-flex justify-content-between">
            <p className="m-0">
              <i className="bi bi-geo-alt"></i> {event.address}
            </p>
            <p className="m-0">
              <i className="bi bi-calendar"></i> {formatDate(event.date)} 
            </p>
          </div>
          <Card.Text className='mt-2'>{event.description}</Card.Text>
          <div className="d-flex justify-content-center">
            {!isExpanded ? ( 
              <Button
                onClick={handleClick}
                className='btn btn-dark'
              >
                Show Volunteers
              </Button>
            ) : (
              <div>
                {event.registrations.map((user) => (
                  <div key={user.email} className="temp d-flex  justify-content-between">
                  <div>

                    <p className="tempName">{user.name}</p>
                  </div>
                    <p>{user.email}</p>
                  </div>
                ))}
                <Button
                  onClick={handleClick}
                  className='btn btn-dark mt-2'
                >
                  Hide Volunteers
                </Button>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default OrganizedEventCard;
