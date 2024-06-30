
let label;
let data2;
let myChart = null;
let peakValue =0;;
let lowValue=999999999999;

export async function getChart(name,duration){
    const response = await fetch('https://stocks3.onrender.com/api/stocks/getstocksdata');
    const data1 = await response.json();
    label = [];
    data2 = []
    const timestamp = data1.stocksData[0][name][duration].timeStamp;
    const dateString = timestamp.map((t) =>{
        const date = new Date(t * 1000);
        return date.toISOString().slice(0,10);
    });
    console.log(dateString);
    peakValue = 0;
    lowValue = 99999999999;
    for(let i =0; i < data1.stocksData[0][name][duration].value.length; i++){
        const date = formateDate(dateString[i]);

        label.push(date);
        data2.push(data1.stocksData[0][name][duration].value[i]);
        if(data1.stocksData[0][name][duration].value[i] > peakValue){
            peakValue = data1.stocksData[0][name][duration].value[i];
        }

        if(data1.stocksData[0][name][duration].value[i] < lowValue){
            lowValue = data1.stocksData[0][name][duration].value[i];
        }
    } 
   displayChart(name);


}

function displayChart(name){
    let stockData = {
        labels: label, // X-axis labels (months)
        datasets: [{
            label: `Peak Value: ${peakValue.toFixed(2)}`,
            data: data2, // Stock prices
            borderColor: 'green',
            borderWidth: 2, // Line thickness
            fill: false, // Fill the area under the line
            tension: 0.5 ,// Line tension (smoothness)
            pointRadius:0
        },
    {
        label:`Low Value${lowValue.toFixed(2)}`,
        borderColor:'red'
    }]
      };
      // Configuration options

      let config = {
        type: 'line', // Chart type
        data: stockData,
        options: {
            responsive: true,
            hover: {
                mode: 'index', // Show vertical line on hover
              },
            scales: {
                x: {
                    display:false,
                    title: {
                        display: false,
                        text: 'Months'
                    }
                },
                y: {
                    display:false,
                    title: {
                        display: false,
                        text: 'Price (USD)'
                    },
                    beginAtZero: false // Y-axis does not start at zero
                },

            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    label:{
                        filter:(legendItem) => legendItem.text === `Low Value${lowValue.toFixed(2)}`
                    }
                }
            },
        }
        
      };
     
      
      // Render the chart
      let ctx = document.getElementById('stockChart')
      let contex = ctx.getContext('2d');
      if(myChart != null){
        myChart.destroy();
      }
      myChart = new Chart(contex, config);

      const tooltip = document.getElementById('tooltip');
      const xAxisLabel = document.getElementById('xAxisLabel');
      const chartWidth = ctx.width;
      const stepX = chartWidth / (data2.length - 1);

        ctx.addEventListener('mousemove', (event) => {
            // contex.clearRect();
            const x = event.offsetX;
      const y = event.offsetY;
      const dataIndex = Math.min(Math.floor(x / stepX), data2.length - 1); // Ensure not to go out of bounds
      const stockValue = data2[dataIndex].toFixed(2);
      const xAxisValue = label[dataIndex];
      console.log(stockValue);
      tooltip.style.display = 'block';
      tooltip.style.left = `${x+58}px`;
    //   tooltip.style.top = `${y - 20}px`;
      tooltip.textContent = `${name}:$${stockValue}`;


      xAxisLabel.style.display = 'block';
      xAxisLabel.style.fontSize = '14px';
      xAxisLabel.style.fontWeight = 'bolder';   
      xAxisLabel.style.left = `${x+60}px`;
      xAxisLabel.textContent = xAxisValue;

        });

        ctx.addEventListener('mouseout', (event) => {
           tooltip.style.display = 'none';
           xAxisLabel.style.display = 'none';
        });
    }




function formateDate(dateString){
    const [year,month,day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}
