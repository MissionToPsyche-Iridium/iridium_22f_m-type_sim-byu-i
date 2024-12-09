# NASA Psyche - M-type Asteroid Sampling Simulator

"The NASA Psyche mission is an orbiter mission to the metal-rich (or M-type) asteroid, Psyche, in the asteroid belt between Mars and Jupiter. The spacecraft, which launched in October 2023 and will arrive at the asteroid in mid-2029, will study the asteroid from orbit and will not land on the surface.  It is possible to imagine, however, that after learning about Psyche from orbit, there may be scientists and engineers interested in proposing a future mission to send a robotic lander or rover to sample the surface. To prepare for such a mission, extensive simulations would need to be done ahead of time, taking into account the unique characteristics of the Psyche asteroid. In this project, you will design, create, and test a software model or simulation that would aide in preparation for the process of sampling from the surface of the Psyche asteroid, focusing on the mechanics and logistics of surface sampling operations. The format of the final deliverable is flexible and could be demonstrated via VR, AR, or some web-based or gamified format if time and the skills and interests of the team allow."

## Fall 2024 Team Members

### Front End:
- [Jerry Lane](https://github.com/JRLane-CS)
- [Cayeigh Leishman](https://github.com/CayleighLeishman)
- [Brycen Williams](https://github.com/Brycenjwill)

### Back End:
- [Levi Johnson](https://github.com/levijohnson1227)
- [Ryan Funk](https://github.com/RyanFunk2000)
- [Gerin Wilde](https://github.com/GerinWilde1)

## Building Locally

### Prerequisites

1. Windows based PC
2. [Visual Studio Community (2022) IDE](https://visualstudio.microsoft.com/vs/community/)
    - Within installation, also install the "ASP.NET and web development" workload extension. If you need to install the workload and already have Visual Studio, go to Tools > Get Tools and Features..., to open the Visual Studio Installer. Choose the ASP.NET and web development workload, then choose Modify.
3. [Node.js and npm](https://nodejs.org/en)

### Instructions

1. After cloning the repository onto your Windows machine, navigate to the MASS folder, open "MASS.sln" in Visual Studio, and wait for it to load.

2. You need to access the local terminal on Visual Studio. If it isn't visible, click "View" on the toolbar and select "Terminal".

3. In the command line, install these dependencies:

```console
npm install react react-dom
npm install three
```

4. Press F5 to start the web application through localhost.

5. If running for the first time, you may receive multiple popups regarding certificates. Just click yes to proceed.

6. Two sets of terminal windows and browser tabs should open, one for the back-end, the other for the front-end. If a browser tab doesn't open, it can be opened manually by creating a new browser tab and entering its port address, which looks like this: "https://localhost:5173/". As of December 2024, the ports for the frontend and backend are 5173 and 7248 respectively.

### Troubleshooting
1. Security error: When running npm commands, if you receive a error relating to security, you may need to switch to a different terminal type. to do this:
    - On the terminal view, click the down arrow (▼) next to "+ Developer PowerShell" and select "Developer Command Prompt" (or vice versa if "Developer Command Prompt" is what's causing trouble).
    - Run the necessary npm commands again on the new terminal.


2. Certificate error: If you receive an error on the frontend terminal similar to this...

```console
Error: Could not create certificate.
```
...or this on the backend terminal...
```console
Couldn't start the SPA devekionebt server with command 'npm run dev'.
```

- ...most likely, you need ensure that "%appdata%\Romaing\asp.net\https" is a directory that exists on your machine. To do this:
    - Enable "show hidden files" in Windows settings.
    - Navigate to "C:\Users\(USER)\AppData\Roaming\"
    - If "ASP.NET\https" isn't present, create a new folder called "ASP.NET", then another folder called "https" inside it.
    - Now start the web application again. If done correctly, Visual Studio should now be able to create and store key and pem files to run the client locally on https.

3. Proxy error: If you receive an error on the frontend terminal similar to this...

```console
[HPM] Error occurred while trying to proxy request...
```
- ...it's likely that the front-end started before the back-end. To fix this:
    - On the Visual Studio toolbar, click the down arrow (▼) next to "▶ Start" and select "Configure Startup Projects".
    - Click "Multiple startup projects:" and ensure that the "MASS.Server" project is above the "mass.client" project using the up (↑) and down (↓) buttons.
    - Select Apply to save your changes.

4. Port error: If data from the backend doesn't load correctly, you may need to verify existing or reconfigure new server ports. To do this:
    - On the Solution Explorer in Visual Studio, navigate to MASS.Server/launchsettings.json and find the port number from the applicationUrl property that has an https endpoint.
    - Navigate to mass.client/vite.config.js and find the port number from the target property.
    - Across both files, ensure that both properties have the same value, and change the port number if necessary, again making sure that both properies are matched.
    - Hit Ctrl+S in each file to save your changes before running the web application again.

### Other resources
- For more information regarding how to create an ASP.NET Core app with React in Visual Studio, see Microsoft's documentation on the subject here: [Tutorial: Create an ASP.NET Core app with React in Visual Studio](https://learn.microsoft.com/en-us/visualstudio/javascript/tutorial-asp-net-core-with-react?view=vs-2022#prerequisites)
- For a more in depth guide for regarding those onboarding the project, check the onboarding manual (submission currently pending).