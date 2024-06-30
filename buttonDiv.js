import { getProfile } from "./profile.js";
import { getChart } from "./chart.js";

const buttonDiv = document.getElementById('button');
const duration = document.getElementById('durationButton');
const dur = duration.querySelectorAll('button');
let netProfit;
let currBookValue;
let name = "AAPL";

export async function addStockData(Stocks){
    const response = await fetch('https://stocks3.onrender.com/api/stocks/getstockstatsdata');
    const data = await response.json();

    Stocks.forEach(element => {
        const div = document.createElement('div');
        div.id = element;
        div.classList.add('buttonDiv')
        const button = document.createElement('button');
        button.innerText = element;
        const bookvalue = document.createElement('p');
        bookvalue.innerText = `$${data.stocksStatsData[0][element].bookValue}`;
        const profit = document.createElement('p');
        profit.innerText = `${data.stocksStatsData[0][element].profit.toFixed(2)}%`;
        profit.classList.add('profit');
        if(data.stocksStatsData[0][element].profit <= 0){
            profit.classList.add('red');
        }else{
            profit.classList.add('green');
        }
        div.appendChild(button);
        div.appendChild(bookvalue);
        div.appendChild(profit);
        buttonDiv.appendChild(div);

        currBookValue  = data.stocksStatsData[0][Stocks[0]].bookValue;
        netProfit = data.stocksStatsData[0][Stocks[0]].profit;
        

        button.addEventListener('click',() =>{
            getProfile(button.innerText,data.stocksStatsData[0][element].bookValue,data.stocksStatsData[0][element].profit);
            getChart(button.innerText,"1mo");
            name = button.innerText;
        });
    });
    getProfile("AAPL",currBookValue,netProfit);
    getChart("AAPL","1mo"); 
}

  
        dur.forEach(btn =>{
            btn.addEventListener('click',()=>{
                getChart(name,btn.value);
            });
        });
