# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Challenges
Most of the challenges I faced during the development of this challenge related to styling the app in a responsive manner with a mobile-first approach (grid view for desktop and single column view for mobile) and paginating the data to avoid presenting too much information in any one page. I overcame these by making appropriate UX decisions with respect to the layout. Another notable challenge was providing visual feedback as the user types, and for this one I decided to debounce the search by 3 seconds as the user enters a query in the search bar.

Please note that I was unable to add unit testing to the challenge as I ran into a unique issue with jest being unable to resolve `antd` (the component library I used) within its tests, even after ejecting the ap from create-react-app and using custom jest config. If I had been able to get the tests to run within the timeframe allocated for this, I would've used smoke-screen and/or snapshot testing to ensure the visual elements I expected for a given element were being rendered.

### Potential improvements
If I had more time, I would've prioritized hunting down the issue with the unit tests and fixing it. After that, I would've added filters and sorting on search results by their various attributes, as well a drill-in page for individual search results with more details about the movie (cast etc).