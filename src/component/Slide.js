import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import EventContext from '../context/events/EventContext';
import dayjs from 'dayjs';
import 'dayjs/locale/en'; 
import './recent.css'

function Slide(props) {
  const { event } = props;
  const context = useContext(EventContext);
  const { register } = context;
  // const [isRegistered, setIsRegistered] = useState(false);
  

  const handleVolunteer = async () => {
      // await console.log(await checkRegistration(event._id));
      await register(event._id);
      
     props.setisRender(props.isRender+1);
      // setIsRegistered(true);
      
  };
 
  


  const formatDate = (date) => {
    return dayjs(date).format('MMMM D, YYYY');
  };
  return (
    <div className="col-sm-3">
      <Card className='shadow-lg p-3 mb-5 bg-white rounded'>
        {/* {console.log(event.image)} */}
        <Card.Img variant="top" src={require(`../Images/${event.image}`)} />
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
            <Button
              onClick={handleVolunteer}
              disabled={props.isvolunteer}
              className='btn btn-dark  '
            >
              Volunteer
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}


export default Slide;
 