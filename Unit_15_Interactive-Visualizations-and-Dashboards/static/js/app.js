function buildMetadata(sample) {
  d3.json(`/metadata/${sample}`).then((data) => {
    //select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    //clear any existing metadata
    PANEL.html("");

    
    Object.entries(data).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key}: ${value}`);
    });

    //Build the Gauge Chart
    buildGauge(data.WFREQ);
  });
}

function buildCharts(sample) {
  d3.json(`/samples/${sample}`).then((data) => {
    const otu_ids = data.otu_ids;
    const otu_labels = data.otu_labels;
    const sample_values = data.sample_values;

    //Bubble Chart
    var bubbleLayout = {
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" }
    };
    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
        }
      }
    ];

    Plotly.plot("bubble", bubbleData, bubbleLayout);

    //Pie Chart
    var pieData = [
      {
        values: sample_values.slice(0, 10),
        labels: otu_ids.slice(0, 10),
        hovertext: otu_labels.slice(0, 10),
        hoverinfo: "hovertext",
        type: "pie"
      }
    ];

    var pieLayout = {
      margin: { t: 0, l: 0 }
    };

    Plotly.plot("pie", pieData, pieLayout);
  });
}

function init() {
  // dropdown select element
  var selector = d3.select("#selDataset");

  // Use sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // initialize plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
