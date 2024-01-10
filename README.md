# Nuisance Report Tracker

An Angular web application developed as a final project for the "Client-side Development" course at Simon Fraser University.

## What is this application?

This application allows users to report any nuisances they experience on an interactive map! Users will be able to add and store the locations of these occurrences,
which then can be used to create new reports, representing the instances of these nuisances. The reports will then be displayed on the map as a marker, and in the table below the map.

## Application features

Users can:
  - Add and store a list of locations, by navigating to a page, via the "ADD LOCATION" navigation button, where you add a new location by placing a marker on the given map and giving it a name.
  - Create a new instance of a nuisance as a report, by clicking "CREATE NUISANCE REPORT" and filling out the necessary details in the revealed form.
    - Reports will have an associated status, which can be represented as either "OPEN" or "RESOLVED".
  - Sort the reports in the table, below the map, by clicking on a table header to sort the header's contents in either ascending or descending order.
  - View the number of nuisances reported at a given location, by clicking on an existing marker to reveal the count.
  - View extra information of a report, by clicking the "MORE INFO" button associated with the report.
  - Manage your existing reports, either by changing a report's status to "RESOLVED" or by eliminating it from the table via the "DELETE" button.
    - Users will need to enter an associated "passkey" via the browser's alert pop-up to pass the verification for these operations.

## Frameworks and Technologies used

  - Angular, the application framework, which utilizes HTML, CSS, and Typescript to construct the application.
  - Leaflet, the API handling the display and interaction of the embedded map.
  - OpenStreetMaps, the base map used for displaying reports and for the creation of location instances.
