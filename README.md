This is a template for Rails projects with React injected in to the asset pipeline.

app/assets/javascripts contains the bundle.js file which is picked up in the asset pipeline.
client directory holds all component information and entry.jsx which is targeting in the webpack config

To use:
`$ git clone git@github.com:veneziacarl/react_rails_boilerplate.git`

Server commands:
in two separate windows in your rails root run
`$ webpack start`
`$ rails s`

TODO:
- [ ] add in react transforms for reloading and error catching
