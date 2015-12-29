# Habitual
### lifestyle design app

Server commands:
in two separate windows in your rails root run
`$ webpack start`
`$ rails s`

**TODO:**

Where I left off:
put a pry in the controller update method and try and get the update function to work property. having issues actually getting the update to persist.

_phase 1_
- [x] complete Entry component
- [x] complete HabitForm component
- [x] complete HabitLabelRow component
- [x] complete HabitList component
- [x] complete HabitDetails component
- [x] switch from using `tables` to using `spans` and `divs`
- [x] complete table drop down on click animation
- [x] add delete path
- [x] add edit button functionality
- [x] add dynamic in-line editing to description
- [ ] add dynamic in-line editing to title
- [ ] add cancel button to inline-editing
- [ ] retain multi-line functionality in description
- [ ] add drag-and-drop functionality
- [x] refactor import statements to be more like `import { Card, CardActions, CardExpandable, etc.. } from 'material-ui';`
- [ ] do wireframes and user stories/criteria
- [ ] fix delete and edit paths to not have to use habit.id.id (change object being passed in)
- [ ] change form habit type to radio button from text area
- [ ] add monthly view
- [ ] add yearly view
- [ ] add infinite scroll box
- [x] build out JSON API
- [ ] strengthen params in API (require habit as parent param, etc)
- [ ] make sure blank/null can't be sent through on the ajax update success call

_phase 2_
- [ ] switch from Sinatra/ActiveRecord to rails
- [ ] install hot reloader
- [ ] switch to rails foundation
- [ ] add in 'skip' capability
- [ ] write tests
- [ ] create user log in with OAuth and internal user creation
- [ ] add dynamic rendering based off of screen size (
  examples of how this one guy did it:
  https://github.com/andrewngu/sound-redux/blob/master/scripts/containers/App.js#L47
  https://github.com/andrewngu/sound-redux/blob/master/scripts/actions/environment.js#L20
  )


_future phases_
- [ ] add styling
- [ ] add tracking / stats system
- [ ] add twilio integration
- [ ] add IBM api integration

*current issues:*
- [ ] issues in AJAX success for handleOpenTab: not allowing me to string interpolate (tab) might have to just do a large logic block with separate AJAX calls for different tabs

*gems, etc. that I'm not sure how to add to Gemfile yet..*
<ul>
<li>npm react-tap-event-plugin</li>
<li>npm material-ui</li>
<li>npm React-Wysiwyg</li>
<li>
font: <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet' type='text/css'>
</li>
</ul>

https://github.com/tastejs/todomvc/tree/gh-pages/examples/react as an example
