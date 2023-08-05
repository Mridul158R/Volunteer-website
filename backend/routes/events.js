const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const User=require('../models/User');
const Event = require("../models/Event");
const { body, validationResult } = require("express-validator");

router.get("/globalfetchevents", async (req, res) => { 
    const events = await Event.find();
    res.json(events);
});


// Route 1 : Get all the events using : GET "/api/events/fetchallevents" login req.
router.get("/fetchallevents", fetchuser, async (req, res) => {
    const events = await Event.find({ user: req.user.id });
    res.json(events);
});

router.get("/fetchvolunteeredevents", fetchuser, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);
   
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Retrieve the event IDs from the user's registeredEvents array
      const registeredEventIds = user.registeredEvents;
  
      // Find events where the _id field is present in the registeredEventIds array
      const events = await Event.find({ _id: { $in: registeredEventIds } });
  
      res.json(events);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });
  

// Route 2 : ADD the events using : POST "/api/events/addevent" login require
router.post(
    "/addevent",
    fetchuser,
    [
        body("title", "Enter a valid title").isLength({ min: 3 }),
        body("description", "Description must be atleast 5 characters").isLength({
            min: 5,
        }),
    ],
    async (req, res) => {
        try {
            const { image, title, description, address, date, volunteer } = req.body;
            //if err return err
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const event = new Event({
                image,
                title,
                description,
                address,
                date, 
                volunteer,
                user: req.user.id,
            });
            const saveEvent = await event.save();

            res.json(saveEvent);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// Route 3 : update the Events using : POST "/api/events/updateevent" login require
router.post(
    "/updateevent/:id",fetchuser,async (req, res) => {
        // const { name, email } = req.body;
        try{ 

        //Find the event to update
        let event = await Event.findById(req.params.id);
        if(!event){res.status(404).send("Not Found")}
        
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        event.registrations.push({ name: user.name, email: user.email });
        //adding this event to user registered events array
        
        user.registeredEvents.push(req.params.id);
        await user.save();
    
    // Save the updated event
    await event.save();
        // event = await Event.findByIdAndUpdate(req.params.id, {$set : newEvent}, {new:true})
        res.json({event,user});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    })


router.get(
    "/checkRegistration/:eventId",fetchuser,async (req, res) => {
        try{ 
            const userId = req.user.id;
            const eventId = req.params.eventId;
        
            // Find the user by ID
            const user = await User.findById(userId);
        
            // Check if the user exists
            if (!user) {
              return res.status(404).json({ error: 'User not found' });
            }
        
            // Check if the user is registered for the event
            const isRegistered = user.registeredEvents.includes(eventId);
        
            res.json({ isRegistered });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    })

// Route 4 : Delete the events using : DELETE "/api/events/deleteevent" login require
router.delete(
    "/deleteevent/:id",fetchuser,async (req, res) => {
        try {

        //Find the event to delete
        let event = await Event.findById(req.params.id);
        if(!event){res.status(404).send("Not Found")} 

        //check for user
        if(event.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }

        event = await Event.findByIdAndDelete(req.params.id);
        res.json({"Success" : "Event has been deleted", event : event});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    })
    module.exports = router;
