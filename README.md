# belly-button-challenge
deployed to: https://kaitlynntnguyen.github.io/belly-button-challenge/

We are building an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels. This program uses D3 library to examine data about belly button diversity. A dropdown menu is used to select a test subject id. The subject’s demographic information is displayed. A bar chart, bubble chart and a gauge chart also update once the ID is changed.

## Steps : 
  - Read in samples.json using the D3 library;

  - Retrieve metadata info for each test subject and display this in the form of an unordered list item as a key-value pair on the dashboard;

  - Get required data for plotting, including sample_values, otu_ids and otu_labels which were used to create a trace and plot the bar chart;


The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

Demographics information is populated based upon a user-selected test subject ID. 

Files:  
  - `Static/js/app.js`: A JavaScript file which loads the data from a URL and produces the displayed dashboard.
  - `index.html`: A html file used to open the dashboard in the browser
  - `samples.json`: A .json file with a copy of the data loaded from the URL
