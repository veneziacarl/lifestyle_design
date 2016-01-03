# Habitual
### lifestyle design app

**Commands:**
in two separate windows in your rails root run:
<ul>
  <li>`$ npm start`</li>
  <li>`$ rails s`</li>
</ul>

**TODO:**

Where I left off:
  - cleanup all the terribad code I wrote while figuring this out
  - make the changes to ordering persist on refresh


_phase 1_
- [ ] retain multi-line functionality in description but NOT title
- [ ] do wireframes and user stories/criteria
- [ ] change form habit type to radio button from text area
- [ ] add monthly view
- [ ] add yearly view
- [ ] add infinite scroll box
- [ ] strengthen params in API for update function (require habit as parent param, etc)
- [ ] make sure blank/null can't be sent through on the ajax update success call
- [ ] get the cancel & edit & submit buttons to apply to both the description and the title instead of just one or the other, and fix the positioning of them.
- [ ] change up DB schema to include time_types, times, goals, etc
- [ ] add actions to tabs
- [ ] get the radio button to reset after successful submission
- [ ] improve controlled form performance (current slow and choppy)

_phase 2_
- [ ] add in 'skip' capability
- [ ] write tests
- [ ] create user log in with OAuth and internal user creation
- [ ] add dynamic rendering based off of screen size
- [ ] create goals


_future phases_
- [ ] add styling
- [ ] add tracking / stats system
- [ ] add twilio integration
- [ ] add IBM api integration

*current issues:*
