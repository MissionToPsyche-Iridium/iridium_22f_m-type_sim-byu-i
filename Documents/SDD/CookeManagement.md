# Overview of how cookies will be handled in the web application

## General uses for cookies
Cookies are typically used primarily for storing information about a users session, preferences, and settings. They can store session IDs to maintain user states accross several pages. 

## Cookies in a web application without user authentication
As mentioned above, cookies are primarily used for tracking and transmitting user data. This means that cookies will be used for storing authentication / session information, so that users
can access the site accross multiple pages. In an application without user authenticaion, cookies can be used to track other data accross pages.

## How should we use cookies?
If our application consists of one singular page, then there are few uses for cookies. However, if we want to have several pages in our application, such as one for the simulation and one for data about the NASA Psyche mission, then we could implement a cookie that would, for example, save the state of your simmulation for the time your session is active. That way, a user can navigate to other pages in our site wihout losing their progress in the simulation. We could also use cookies to track unique visits to the page by creating user specific IDs, so that NASA could track the public interest in their misison.
