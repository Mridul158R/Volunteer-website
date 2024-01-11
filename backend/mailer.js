const nodemailer = require("nodemailer");
const Event = require("./models/Event"); 
const moment = require("moment");
const email=process.env.EMAIL;
const password=process.env.PASSWORD;


const mailer = async () => {
  try {
    // Fetch events from the database
    const events = await Event.find({});

    // Get tomorrow's date
    const tomorrow = moment().add(1, "day").startOf("day");

    // Filter events happening tomorrow
    const tomorrowEvents = events.filter((event) =>
      moment(event.date).isSame(tomorrow, "day")
    );
    console.log(tomorrowEvents);

    // Rest of the nodemailer code to send emails using the tomorrowEvents data
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password
      }
    });

    console.log("mailsent");

    // Process the tomorrowEvents data and send emails to registered users
    tomorrowEvents.forEach(async (event) => {
      event.registrations.forEach(async (registration) => {
        const info = await transporter.sendMail({
          from: '<neelamtiwari0815@gmail.com>',
          to: registration.email, 
          subject: "Event Reminder: Tomorrow's Event",
          text: `You are registered for the event: ${event.title} happening tomorrow at ${event.date}.`,
          html: `<b>Event Reminder: Tomorrow's Event</b><br><br>
                 You are registered for the event: <strong>${event.title}</strong> happening tomorrow at ${event.date}.`,
        });
        console.log(`Email sent for event: ${event.title} to ${registration.email}`);
      });
    }); 

    console.log('Emails sent successfully');
  } catch (error) {
    console.error('Failed to send emails:', error);
  }
};

module.exports = mailer;