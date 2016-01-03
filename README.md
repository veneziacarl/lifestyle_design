# Habitual
### lifestyle design app

**Commands:**
in two separate windows in your rails root run:
<ul>
  <li>`$ npm start`</li>
  <li>`$ rails s`</li>
</ul>

**TODO:**

*Overall*
- [ ] write tests for React and Rails
- [ ] deploy to heroku


*Dashboard Page*
This page serves as the 'action' page where the daily entries of habits completed or incomplete is done. There is a limited set of stats shown on this page, and there are some auxiliary information for inspirational purposes.
- [ ] finish HabitCard
  - [ ] add in 'complete', 'incomplete', 'skip' capabilities to habit header
    - [ ] add in journal prompt if incomplete or skip is chosen
  - [ ] retain multi-line functionality in description but NOT title
  - [ ] add drag preview
  - [ ] have the card avatar be the symbol of the goal it is connected to
  - [ ] make the changes to ordering from DND persist on refresh
  - [ ] get the cancel & edit & submit buttons to apply to both the description and the title instead of just one or the other, and fix the positioning of them.
  - [ ] allow for the card to be moved by a dropdown menu instead of drag and drop (in the slide down part of the card)
- [ ] finish HabitForm
  - [ ] get the radio button to reset after successful submission
  - [ ] add in more fields - to should be expansive but only a couple fields should be required. There should be a dropdown textfield with predictive typing to set the habit -> goal relationship (tagging system)
- [ ] finish HabitTabs
  - [ ] add monthly view
  - [ ] add yearly view
  - [ ] add infinite scroll box
- [ ] create side stat dashboard
  - [ ] change position of form to be in the stats box on the right of the screen, but only if ADD NEW has been pressed
  - [ ] add mantra
  - [ ] add advice
  - [ ] add 'notecard' stats
  - [ ] add in charts
    - [ ] make stat display change based on which HabitTab is open
- [ ] create sidebar menu
- [ ] refactor to abstract styling
- [ ] add dynamic rendering based off of screen size -> dashboard should only have HabitBox while on mobile
- [ ] style
- [ ] habits should reload at their specified timeframe


*Manager Page*
This page displays stats for individual habits and allows easy rearranging of habits.
- [ ] add dynamic stat tracking which would also function as the "show" page for the habit. stats on journal entries also.
- [ ] create goals box
  - [ ] order and color by time_type
- [ ] create habits box
  - [ ] allow for the habit to be moved by a dropdown menu instead of drag and drop (in the slide down part of the card)
- [ ] create stats / form box
  - [ ] integrate charts
  - [ ] take the form from Dashboard and make it work the same way on this page - the bottom stats bar is replaced with the 'add new' form if the 'add new' button is clicked


*Rails API*
- [ ] strengthen params in API for update function (require habit as parent param, etc)
- [ ] make sure blank/null can't be sent through on the ajax update success call


*Account Page*
- [ ] add twilio integration (as reminders to user)
  - [ ] add in payment authorization if they want this feature enabled
- [ ] add in mailers (as reminders and as a weekly review for user)
- [ ] create user log in with OAuth and native user creation
- [ ] allow user details to be changed
- [ ] allow user preferences to be changed


*Journal Page*
- [ ] 'New' Page
- [ ] integrate wysihtml.com text editor
- [ ] enable markdown
- [ ] allow for tagging with predictive textinput
- [ ] 'Show' Page
- [ ] 'Index' Page


*Inspiration Page*
- [ ] Quote container
- [ ] connect to quote API
- [ ] connect to instagram API / reddit /r/motivation API
- [ ] add in single Quote container that updates to a new quotes automatically and will change quote based on click
- [ ] add in 'save' feature which will append to quotes list
- [ ] add in link to view saved quotes
- [ ] add in Best Practices with examples of how to use the site


*Quotes Page*
- [ ] connect to quote API
- [ ] connect to instagram API / reddit /r/motivation API


*current issues:*
