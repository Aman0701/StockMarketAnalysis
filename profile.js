const detail = document.getElementById('detail');


export async function getProfile(name,bookvalue,profit){
    const response = await fetch('https://stocks3.onrender.com/api/stocks/getstocksprofiledata');
    const data = await response.json();
    detail.innerHTML = "";
    const div = document.createElement('div');
    div.classList.add('headStyle');
    const title = document.createElement('h2');
    title.innerText = name;

    const value = document.createElement('h2');
    value.innerText = `$${bookvalue}`;

    const pft = document.createElement('h2');
    pft.innerText = `${profit}%`;
    if(profit <= 0){
        pft.classList.add('red');
    }else{
        pft.classList.add('green')
    }
    div.appendChild(title);
    div.appendChild(pft);
    div.appendChild(value);
    
    detail.appendChild(div);

    const para = document.createElement('p');
    para.innerText = data.stocksProfileData[0][name].summary;
    detail.appendChild(para);
}