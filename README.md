# Habitual
### lifestyle design app


[![Codeship Status for veneziacarl/lifestyle_design](https://codeship.com/projects/7fe71170-9e1a-0133-f214-76efcd0f79bd/status?branch=master)](https://codeship.com/projects/127702)
[![Code Climate](https://codeclimate.com/github/veneziacarl/lifestyle_design/badges/gpa.svg)](https://codeclimate.com/github/veneziacarl/lifestyle_design)
![Coverage Status](https://coveralls.io/repos/veneziacarl/lifestyle_design/badge.png)

Ruby on Rails app with ReactJS.

<hr />
**Instructions:**

_Running the app:_ <br />
Webpack minimizes the components in client/components to generate a bundle.js file located in app/assets/javascripts.  The bundle.js file is picked served via the Rails Asset Pipeline to the 'div' specified in client/components/entry.jsx.

In two separate terminal shells, get the app up and running with:
```
npm start
rails s
```
And open `localhost:3000` in your browser to see the app.

_Testing the app:_ <br />
`npm run test` tests React - runs the suite located in the root test directory <br />
`npm run test:watch` tests React - will rerun the suite upon saving any changes. <br />
`rspec` tests Rails - runs the spec folder to test the rails side of the app.


<hr />
