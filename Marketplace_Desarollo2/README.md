README
*marketplace_angular_ueb*
A web-based accommodation marketplace developed using Angular. The application allows users to browse, filter, and view accommodation details, calculate stay costs, simulate bookings, and manage their reservations. The project was developed as a frontend application utilizing Angular services.

*Members*
Manager: Aguilar Pacheco Samuel
Programmer and information analyst: Silva Solis Santiago Alberto
Web developer and programmer: Malagon Vasquez Daniel Alejandro
Programmer and editor: Quintero Martínez Dayana Katerinne

*Technologies*
- Angular: frontend framework, organized by components, services, routes and forms.
- TypeScript: models and interfaces of the application.
- JSON: file containing the initial accommodation data, read through an Angular service.
- Angular service in memory / localStorage: storage of the simulated bookings.
- Git / GitHub: version control and code repository.
- WebStorm: development tool.
- Figma / Draw.io: design of the prototypes of the main screens.
  All the tools used are free or open source.

*Requirements*
- A computer with an internet connection and the necessary software.
- No backend is required, and there is no integration with a real payment or booking system (frontend only).
- The JSON file with the initial data, keeping its original general structure.
- Node.js (v18.x or v20.x LTS), npm (v9.x or higher), Angular CLI (v17.x or v18.x).

*Installation*
1. Get the source code from the Git/GitHub repository or from the .ZIP file (delivered without the node_modules folder, together with the data needed to run it).
2. Open a terminal in the project root directory and run `npm install` to download and install all dependencies.

*Execution*
- The application does not need a backend: the initial data is loaded from the JSON file through an Angular service, and bookings are kept in memory or in localStorage.
- Run `ng serve -o` (or `npm start`) in your terminal. The CLI will automatically compile the app and open `http://localhost:4200/` in your default web browser.

*Main Features*
1. Home page: shows the platform name, a short description, featured accommodations and access to the search.
2. Accommodation list: shows only active accommodations, with image, name, city, type, capacity, price per night, rating and amenities. Accommodations whose "active" attribute is false are not displayed.
3. Search and filters: dynamic filtering by city, number of guests, accommodation type and maximum price, with an option to clear the filters.
4. Accommodation detail: view accessed through Angular routes, showing description, location, capacity, bedrooms, beds, bathrooms, price, amenities, rules, rating, reviews and images.
5. Quote: from the check-in date, check-out date and number of guests, the application calculates the number of nights, subtotal, the cleaning fee defined for the accommodation, a service fee equal to 10% of the subtotal, and the total.
6. Simulated booking: after a valid quote, the guest's name and email are requested. The booking includes an identifier, accommodation, dates, guests, nights, total value, guest data and the initial status CONFIRMED.
7. "My Bookings": view with the accommodation, city, dates, guests, total value and status of each booking. If there are no bookings, an appropriate message is shown.
8. Interface: consistent, usable and adaptable to different screen sizes, reporting errors and "no results" states.

*General Structure*
- Angular application organized by components, services, routes, forms and TypeScript models/interfaces.
- Separation of responsibilities between presentation, navigation, data access, forms, booking handling and models/interfaces; the application is not implemented in a single component.
- The initial data is stored in a JSON file and is accessed through an Angular service; the interface does not import the JSON directly.
- The repository includes the source code, README.md, .gitignore and the commit history.
- Project Folder: `marketplace_angular_ueb/`
