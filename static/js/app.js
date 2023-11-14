//save the URL to a variable
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);

  //Dropdown Menui Iteration
  for (let i = 0; i < data.names.length; i++) {

  d3.select("select").append("option").attr("value",data.names[i]).text(data.names[i])

  };

  //code for initial plots
  function init() {
   
    let sampleValues = data.samples[0].sample_values;
    let otuIds = data.samples[0].otu_ids;
    let otuLabels = data.samples[0].otu_labels;
    let sortedValues = sampleValues.sort((a,b) => b - a);
    let topTen = sortedValues.slice(0,10)

    let numWash = data.metadata[0].wfreq


    let initdata = [{
      type: 'bar',
      x: topTen,
      y: otuIds.map(id => `OTU ${id}`),
      text:otuLabels,
      orientation: 'h'
    }]
    

    var initbub = [{

      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
  
      marker: {
        size: sampleValues,
        color: otuIds
      },
  
      type: 'scatter'
  
  
      }];

      var initgauge = [{
        domain: { x: [0, 1], y: [0, 1] },
        value: numWash,
        title: { text: "Belly Button Washing Freqeuncy: Scrubs per Week" },
        type: "indicator",
        mode: "gauge+number",
  
        gauge: {
          axis: { range: [null, 9], tickwidth: 2, tickcolor: "darkblue" },
          bar: { color: "black" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [0, 1], color: "maroon" },
            { range: [1, 2], color: "red" },
            { range: [2, 3], color: "orange" },
            { range: [3, 4], color: "yellow" },
            { range: [4, 5], color: "green" },
            { range: [5, 6], color: "cyan" },
            { range: [6, 7], color: "blue" },
            { range: [7, 8], color: "violet" },
            { range: [8, 9], color: "purple" },
          ],
  
        }
  
      }
  
      ];
  
      var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
  
      


      
    // plot the initial bar chart
    Plotly.newPlot('bar', initdata)
    //Plot the initial bubble chart
    Plotly.newPlot('bubble', initbub)
    // plot the initial gauge
    Plotly.newPlot('gauge', initgauge, layout);
    //initial demographic info
    let demInfo = data.metadata[0]; 
    let metadata1 = d3.select("#sample-metadata")
    Object.entries(demInfo).forEach(([key, value]) => {
    metadata1.append("p").text(`${key}: ${value}`);
  });

  };
  //call the initial function to get the charts to show up initially
  init();

  // match the dropdown to a function
  var dropdown = document.getElementById("selDataset")
  dropdown.onchange = function optionChanged() {
  
    var selectedValue = document.getElementById("selDataset").value

    let x=0
    for (let j = 0; j < data.names.length; j++) {
    if (selectedValue == data.names[j]) {x=j}}

      // define the variables to be used in the charts

    let sampleValues = data.samples[x].sample_values;
    let otuIds = data.samples[x].otu_ids;
    let otuLabels = data.samples[x].otu_labels;

    let sortedValues = sampleValues.sort((a,b) => b - a);

    let topTen = sortedValues.slice(0,10)


    var bbtrace = [{
      type: 'bar',
      x: topTen,
      y: otuIds.map(id => `OTU ${id}`),
      text:otuLabels,
      orientation: 'h'
    }];
    // plot the chart
    Plotly.newPlot('bar', bbtrace)

    // bubble plot data
    var bubbletrace = [{

    x: otuIds,
    y: sampleValues,
    text: otuLabels,
    mode: 'markers',

    marker: {

      size: sampleValues,
      color: otuIds

    },

    type: 'scatter'


    }];

    //Plot the bubble chart
    Plotly.newPlot('bubble', bubbletrace)

    //Gauge

    let numWash = data.metadata[x].wfreq

    var gdata = [{
      domain: { x: [0, 1], y: [0, 1] },
      value: numWash,
      title: { text: "Belly Button Washing Freqeuncy: Scrubs per Week" },
      type: "indicator",
      mode: "gauge+number",

      gauge: {
        axis: { range: [null, 9], tickwidth: 2, tickcolor: "darkblue" },
        bar: { color: "black" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
          { range: [0, 1], color: "maroon" },
          { range: [1, 2], color: "red" },
          { range: [2, 3], color: "orange" },
          { range: [3, 4], color: "yellow" },
          { range: [4, 5], color: "green" },
          { range: [5, 6], color: "cyan" },
          { range: [6, 7], color: "blue" },
          { range: [7, 8], color: "violet" },
          { range: [8, 9], color: "purple" },
        ],

      }

    }

    ];

    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };

    // plot the gauge
    Plotly.newPlot('gauge', gdata, layout);

    //Demographic Information (Metadata)
    let demInfo = data.metadata[x]; 
    
    // Iterate over each key-value pair in the metadata and display it
    let metadata1 = d3.select("#sample-metadata")
        metadata1.html("") //clear previous entry
      Object.entries(demInfo).forEach(([key, value]) => {
        metadata1.append("p").text(`${key}: ${value}`);
      });

  };


});
