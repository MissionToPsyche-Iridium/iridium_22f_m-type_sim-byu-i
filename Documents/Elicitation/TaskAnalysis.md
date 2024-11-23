# Task Analysis Document

#### **Project Name:** _M-type Asteroid Sampling Simulator_

#### **Date:** _10/4/2024_

#### **Team Member assigned:** _Ryan Funk_

## Task Analysis

### Task 1: Home Page

- **Goal**:Provide the user a front-end interface to log into, configure, and/or start the simulation.
- **Task Trigger**:The home page is displayed when the user first opens the web app.
- **User Actions**:

  1. Open a login card.
     - Enter username and password.
     - Select the Login button.
     - If incorrect, receive an error message and retry.
     - Select the Guest button.
  2. Open a card for user cookies.
     - Read details of data to be tracked.
     - Select toggle(s) to opt in/out of tracking.
     - Select the Accept or Decline button.
  3. Display a main menu.
     - Select Start button to begin simulation.
     - Select Configure button to adjust simulation parameters and settings.
- **Performance Requirements**:The home page needs to load at less than 3 seconds.
- **System Responses**:

  1. Load and render home page with login or cookie card.
  2. Authenticate user credentials or cookie settings.
  3. Disable unsupported features if user proceeds as Guest.
  4. Grant main menu access upon successful authentication.
  5. Load into simulation when selecting "Start".
  6. Display settings page when selecting "Configure".
- **Error Handling**:

  - If web server is down, notify user that app is unavailable and to try again later.
  - If login fails, display error message with retry option.
  - If cookies card is ignored, auto-set user selection as accepted/declined.

---

### Task 2: Configuration Menu

- **Goal**:Open a configuration page where the user can set and adjust based on levels of interactivity.
- **Task Trigger**:The configuration is displayed when selected from the main menu.
- **User Actions**:

  1. Set interaction level with drop down menu from simple to complex.
  2. Configure parameters such as thrust, rotation, etc...
  3. Configure visual elements like coloring, render type, etc...
  4. Toggle graphics settings to adjust for performance.
  5. Select Write Mission for user to program a survey mission for spacecraft.
  6. Select Save & Exit button at the bottom of the page.
- **System Responses**:

  1. Display or hide parameters based on interaction level user selects.
  2. Display message as user adjusts options explaining its function.
  3. Update visual adjustments in real time as settings are adjusted.
  4. Benchmark graphics changes and report performance impact to user when toggling graphics settings.
  5. Open user programming interface to write survey mission when selecting Write Mission.
  6. Set user-made changes and return to the home page when selecting Save & Exit.
- **Performance Requirements**:Settings should update in real time (as appropriate) and save without any noticeable delay or preventable performance hitch.
- **Error Handling**:

  - If any input parameters are invalid, display error message and don't save invalid option(s).
  - If survey mission program is invalid, display error message with a prompt to rewrite it.

---

### Task 3: Visual Simulation

- **Goal**:Realistically render and simulate Psyche's approach to, orbit of, and sample collection of the target asteroid.
- **Task Trigger**:The initlal simulation is generated when the user selects the "Start" button from the home page or a "Restart" button within the simulation.
- **User Actions**:

  1. Select arrow button that opens a data readout window.
  2. Use touch/mouse controls to manipulate the simulation view.
  3. Select Pause/Resume button to suspend the simulation.
  4. Drag a scale that manipulates the speed of the simulation from real time.
  5. Set point of view with drop down menu.
  6. Display options for real-time decisions of the spacecraft where/as appropriate.
     - Descend/ascend orbit
     - Observe/scan asteroid
     - Sample materials where
     - etc...
  7. Select points of interest for more information.
  8. Select Record button to save running simulation as video or data.
  9. Select Mission button to load and select programmed survey missions.
  10. Select Share button to invite others to view instance.
- **System Responses**:

  1. Data readout opens when selected with statistics, trivia, etc...
  2. Zoom in/out from scroll wheel or touch gesture; change perspective with click/touch and drag.
  3. Freeze simulation and resume from the current and at any point as user dictates.
  4. Speed up or slow down rate of time based on scale position.
  5. Switch camera position to first person, third person, or wide shot views.
  6. Adjust simulation based on real-time adjustments from the user.
  7. Open dialogue box with educational information when selecting parts, samples, locations, etc...
  8. Save simulation recording as internal/external video/data file when selecting Record.
  9. When selecting Mission, open list menu of user-made survey missions to run as user chooses.
  10. Generate and copy hyperlink to user's clipboard to share instance when selecting Share.
- **Performance Requirements**:A front-end operating system is needed to render a 3D environment at 15-30 FPS on all intended devices.
- **Error Handling**:

  - If spacecraft sustains fatal damage at any point, stop the simulation with the option to restart and/or adjust parameters.
  - If survey mission is inoperable due to timing or otherwise, display an error message with adjustment option(s).
