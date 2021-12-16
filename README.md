# Interview Scheduler

This is a SPA hat was built using the React Javascript library. This application allows the user to save, edit and delete appointment Monday to Friday. The application displays the appointments one day at a time and the side panel shows the available spots for individual days. The daily display allows the user to create up to 5 appointments per day between 12pm - 5pm. The data is stored in an API and retirieved with axios.

## Final Product

### Landing Page

The page displays individual days with 5 slots to book appointments.
!["Screenshot description"](https://github.com/MunaHD/scheduler/blob/master/docs/Opening%20Display.png?raw=true)

### Create an Appointment

The form to create/ edit an appointment.
!["Screenshot description"](https://github.com/MunaHD/scheduler/blob/master/docs/Create:Edit%20Form.png?raw=true)

### Confirmation on Delete

warning to user when deleting.
!["Screenshot description"](https://github.com/MunaHD/scheduler/blob/master/docs/Confirm%20Delete.png?raw=true)

### Error Handling

Error displayed if there is and API error.
!["Screenshot description"](https://github.com/MunaHD/scheduler/blob/master/docs/Error%20Handling.png?raw=true)

### Warnings

Shows an error if the user leaves the name feild empty.
!["Screenshot description"](https://github.com/MunaHD/scheduler/blob/master/docs/Warning%20Field.png?raw=true)

### Mobile Friendly Design

!["Screenshot description"](https://github.com/MunaHD/scheduler/blob/master/docs/Mobile%20Display.png?raw=true)

### Transition States

Animated transitions for saving and deleting.
!["Screenshot description"](https://github.com/MunaHD/scheduler/blob/master/docs/Transition%20Animation.png?raw=true)

## How to Get started

1. Fork this repository, then clone it.
2. Install the dependencies using the npm install command.
3. Start the Webpack Development Server using npm start. The app will be served at http://localhost:8000/.
4. Go to http://localhost:8000/ in your browser.
5. Enjoy the full features of the website!

## Dependencies

- axios ^0.24.0
- classnames ^2.2.6
- normalize.css ^8.0.1
- react ^16.9.0
- react-dom ^16.9.0
- react-hooks-testing-library ^7.0.2
- react-scripts 3.0.0

## Setup

Install dependencies with

```
npm install
```

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
