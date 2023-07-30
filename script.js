const body = document.querySelector("body")
const containerEle = document.createElement("div")
containerEle.classList.add("container")
body.append(containerEle)

async function fetchData() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all')
    const data = await response.json('')

    const rowEle = document.querySelector('.row')

    
    const limitedData = data.slice(0, 24);

    limitedData.forEach(element => {
      const cardDiv = document.createElement("div")
      cardDiv.classList.add("card", "col-lg-4", "col-sm-12")
      cardDiv.setAttribute("style", "width: 18rem;")
      const headerCard = document.createElement("div")
      headerCard.classList.add("card-header")
      headerCard.innerText = `${element.name.official}`
      const img = document.createElement("img")
      img.setAttribute("src", `${element.flags.png}`)
      const cardBodyDiv = document.createElement("div")
      cardBodyDiv.classList.add("card-body")
      const p = document.createElement("p")
      p.classList.add('card-text')
      p.innerHTML = `Capital: <span>${element.capital}</span>`
      const p2 = document.createElement("p")
      p2.classList.add('card-text')
      p2.innerHTML = `Country Codes: <span>${element.cca2}, ${element.ccn3}, ${element.cioc}</span>`
      const p3 = document.createElement("p")
      p3.classList.add('card-text')
      p3.innerHTML = `Region: <span>${element.region}</span>`
      const p4 = document.createElement("p")
      p4.classList.add('card-text')
      p4.innerHTML = `Lat, Long: <span>${element.latlng}</span>`
      const button = document.createElement("button")
      button.innerText = "Click for Weather"
      button.setAttribute("class", "btn btn-outline-light")
      cardBodyDiv.append(p, p2, p3, p4, button)
      cardDiv.append(headerCard, img, cardBodyDiv)
      rowEle.append(cardDiv)

      const button2 = document.createElement("button")
      button2.innerText = "reset"
      button2.setAttribute("class", "btn btn-outline-light")
      cardDiv.append(button2)
      button2.onclick = function () {
        location.reload()
      }
      button2.style.display = "none"

      button.setAttribute("city", `${element.capital}`)
      button.addEventListener("click", fetchDataForWeather)

      async function fetchDataForWeather() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${button.getAttribute("city")}&appid=5fcb0017515c5ce56a59facaf1f66cf2&units=metric`)
        const data = await response.json()
        cardDiv.innerHTML = ""
        button2.style.display = "block"

        const wrapperDiv = document.createElement("div")
        const para = document.createElement("p")
        para.setAttribute("class", "card-text")
        para.innerText = `Main: ${data.weather[0].main}`
        const para2 = document.createElement("p")
        para2.classList.add("card-text")
        para2.innerText=`Description: ${data.weather[0].description}` 
        const para3 = document.createElement("p")
        para3.classList.add("card-text")
        para3.innerHTML=`Temperature: ${data.main.temp}\u00B0C` 
        const para4 = document.createElement("p")
        para4.classList.add("card-text")
        para4.innerHTML=`Pressure: ${data.main.pressure}(Pa)` 
        const para5 = document.createElement("p")
        para5.classList.add("card-text")
        para5.innerHTML=`Humidity: ${data.main.humidity}g.m-3` 
        const para6 = document.createElement("p")
        para6.classList.add("card-text")
        para6.innerHTML=`Wind Speed: ${data.wind.speed}kmph`
        const para7 = document.createElement("p")
        para7.classList.add("card-text")
        para7.innerHTML=`Visibility: ${data.visibility}m`  
                
        wrapperDiv.append(para, para2, para3, para4, para5, para6, para7)
        cardDiv.append(wrapperDiv, button2)
      }
    });
  } catch (err) {
    console.log(err)
  }
}

fetchData()
