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
- add react dnd functionality
  - make it possible to move things up as well as down
  - cleanup all the terribad code I wrote while figuring this out
  - make the changes to ordering persist on refresh


_phase 1_
- [ ] retain multi-line functionality in description but NOT title
- [ ] add drag-and-drop functionality
- [ ] do wireframes and user stories/criteria
- [ ] change form habit type to radio button from text area
- [ ] add monthly view
- [ ] add yearly view
- [ ] add infinite scroll box
- [ ] strengthen params in API for update function (require habit as parent param, etc)
- [ ] make sure blank/null can't be sent through on the ajax update success call
- [ ] get the cancel & edit & submit buttons to apply to both the description and the title instead of just one or the other, and fix the positioning of them.

_phase 2_
- [ ] add in 'skip' capability
- [ ] write tests
- [ ] create user log in with OAuth and internal user creation
- [ ] add dynamic rendering based off of screen size

_future phases_
- [ ] add styling
- [ ] add tracking / stats system
- [ ] add twilio integration
- [ ] add IBM api integration

*current issues:*


*gems, packages, etc. that I'm not sure how to add to a Gemfile yet..*

<ul>
<li>npm react-tap-event-plugin</li>
<li>npm material-ui</li>
<li>npm React-Wysiwyg</li>
<li>
font: <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet' type='text/css'>
</li>
</ul>
