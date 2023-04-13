/**
 * Dashboard Analytics
 */
let temp=[]
let hum=[]
let time=[]

let temp_chart
let hum_chart
let soil_moisture

let source = new EventSource("http://10.90.0.42:3000/");
source.onmessage = function(event) {
  let data = JSON.parse(event.data)
  // console.log(data.soil)
  soil_moisture = Math.round((data.soil/1024)*100)
  // console.log(soil_moisture);
  temp.push(data.temp)
  hum.push(data.hum)
  time.push(new Date().toLocaleTimeString('en-GB', { hour: "numeric", minute: "numeric",second:"numeric"}))


  if(temp.length > 10){
    temp = temp.slice(-10)
  }
  if(hum.length > 10){
    hum = hum.slice(-10)
  }
  if(time.length > 10){
    time = time.slice(-10)
  }

  console.log(temp)
  console.log(hum)

  const tempctx = document.getElementById('tempChart');
  const humctx = document.getElementById('humidChart');

  if(temp_chart != undefined){
    temp_chart.destroy()
  }
  if(hum_chart != undefined){
    hum_chart.destroy()
  }

  temp_chart = new Chart(tempctx, {
type: 'line',
data: {
labels: time,
datasets: [{
  label: 'Temperature',
  data: temp,
  borderWidth: 1
}]
},
options: {
options: {
  responsive: true,
  maintainAspectRatio: false,
  animations: {
    tension: {
      duration: 1000,
      easing: 'linear',
      from: 1,
      to: 0,
      loop: true
    }
  },
  scales: {
    y: { // defining min and max so hiding the dataset does not change scale range
      type:'time',
      time : {
        unit :'minute'
      }
    },
    xAxes: [{
        ticks: {
            autoSkip: false,
            maxRotation: 90,
            minRotation: 90
        }
    }]

    
  }
}

}
});

hum_chart = new Chart(humctx, {
type: 'line',
data: {
labels: time,
datasets: [{
  label: 'Humidity',
  data: hum,
  borderWidth: 1
}]
},
options: {
options: {
  animations: {
    tension: {
      duration: 1000,
      easing: 'linear',
      from: 1,
      to: 0,
      loop: true
    }
  },
  scales: {
    y: { // defining min and max so hiding the dataset does not change scale range
      type:'time',
      time : {
        unit :'minute'
      }
    },
    xAxes: [{
        ticks: {
            autoSkip: false,
            maxRotation: 90,
            minRotation: 90
        }
    }]

    
  }
}

}
});

let cardColor, headingColor, axisColor, shadeColor, borderColor;

  cardColor = config.colors.white;
  headingColor = config.colors.headingColor;
  axisColor = config.colors.axisColor;
  borderColor = config.colors.borderColor;


  // Growth Chart - Radial Bar Chart
  // --------------------------------------------------------------------
  const growthChartEl = document.querySelector('#growthChart'),
    growthChartOptions = {
      series: [soil_moisture],
      labels: ['Soil Moisture'],
      chart: {
        height: 270,
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          size: 250,
          offsetY: 50,
          offsetX:26,
          startAngle: -180,
          endAngle: 180,
          hollow: {
            size: '55%'
          },
          track: {
            background: cardColor,
            strokeWidth: '100%'
          },
          dataLabels: {
            name: {
              offsetY: 15,
              color: headingColor,
              fontSize: '15px',
              fontWeight: '600',
              fontFamily: 'Public Sans'
            },
            value: {
              offsetY: -25,
              color: headingColor,
              fontSize: '22px',
              fontWeight: '500',
              fontFamily: 'Public Sans'
            }
          }
        }
      },
      colors: [config.colors.primary],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          shadeIntensity: 0.5,
          gradientToColors: [config.colors.primary],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 0.6,
          stops: [30, 70, 100]
        }
      },
      stroke: {
        dashArray: 5
      },
      grid: {
        padding: {
          top: -35,
          bottom: -10
        }
      },
      states: {
        hover: {
          filter: {
            type: 'none'
          }
        },
        active: {
          filter: {
            type: 'none'
          }
        }
      }
    };
  if (typeof growthChartEl !== undefined && growthChartEl !== null) {
    const growthChart = new ApexCharts(growthChartEl, growthChartOptions);
    growthChart.render();
  }
// })();


}

console.log(document.getElementById('myRange').value)


function setThreshold(){
let threshold = (document.getElementById('myRange').value * 10.24 )
console.log(threshold)
fetch(`http://10.90.0.42:3000/set_threshold?threshold=${threshold}`)
.then((res) => res.text())
.then((data)=>console.log(data))
.catch((err) => {
   console.log(err.message);
})
}

console.log(soil_moisture)
// (function () {
  