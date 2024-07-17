const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const axios = require('axios');
const width = 800; // Width of the chart
const height = 600; // Height of the char
const backgroundColour ='#fff'
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height,backgroundColour  });
const generatechartforces=async(data)=>{
    const labels = data.result.map(item => new Date(item.ratingUpdateTimeSeconds * 1000).toLocaleDateString());
    const ratings = data.result.map(item => item.newRating);
    
  
    const configuration = {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: "User Ratings",
          data: ratings,
          borderColor: 'rgba(255, 159, 64, 1)',
          backgroundColor: 'rgba(255, 159, 64, 1)',
          pointBackgroundColor: 'rgba(255, 159, 64, 1)',
          pointBorderColor: 'black',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255, 159, 64, 1)',
          fill: false,
          tension: 0, // Smooth line
        }]
      },
      options: {
        plugins: {
          legend: {
            display: true,
            labels: {
              color: 'black',
            }
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: function(context) {
                return `Rating: ${context.parsed.y}`;
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
              color: 'black',
            },
            ticks: {
              color: 'black',
            }
          },
          y: {
            title: {
              display: true,
              text: 'Rating',
              color: 'black',
            },
            ticks: {
              color: 'black',
            }
          }
        },
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  
    return await chartJSNodeCanvas.renderToDataURL(configuration);
  
  };
    
  const generatechartcode=async(data)=>{
    // const labels = data.result.map(item => new Date(item.ratingUpdateTimeSeconds * 1000).toLocaleDateString());
    // const ratings = data.result.map(item => item.newRating);
    const labels=data.contestParticipation.map(item=>new Date(item.contest.startTime*1000).toLocaleDateString());
    const ratings=data.contestParticipation.map(item=>item.rating)
  
    const configuration = {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: "User Ratings",
          data: ratings,
          borderColor: 'rgba(255, 159, 64, 1)',
          backgroundColor: 'rgba(255, 159, 64, 1)',
          pointBackgroundColor: 'rgba(255, 159, 64, 1)',
          pointBorderColor: 'black',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255, 159, 64, 1)',
          fill: false,
          tension: 0, // Smooth line
        }]
      },
      options: {
        plugins: {
          legend: {
            display: true,
            labels: {
              color: 'black',
            }
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: function(context) {
                return `Rating: ${context.parsed.y}`;
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
              color: 'black',
            },
            ticks: {
              color: 'black',
            }
          },
          y: {
            title: {
              display: true,
              text: 'Rating',
              color: 'black',
            },
            ticks: {
              color: 'black',
            }
          }
        },
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  
    return await chartJSNodeCanvas.renderToDataURL(configuration);
  }
  module.exports={generatechartcode,generatechartforces};