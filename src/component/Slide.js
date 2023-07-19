import { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import EventContext from '../context/events/EventContext';

function Slide(props) {
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
    <div className="col-sm-3">
      <div className="my-3" style={{ maxWidth: "18rem" }}>
        <Card>
        <Card.Img variant="top" src={event.image} />
          <Card.Body>
            <Card.Title>{event.title}</Card.Title>
            <Card.Text>{event.description}</Card.Text>
            <Card.Text>{event.address}</Card.Text>
            <Card.Text>{event.date}</Card.Text>
            
              <Button
                variant="primary"
                onClick={handleVolunteer}
                disabled={isRegistered}
              >
                Volunteer
              </Button>
            
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}


export default Slide;
