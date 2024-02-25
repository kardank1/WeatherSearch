

export function getCity(city) {
    const link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=117bcd5592950f9f701a11f5ab982de0&units=metric`
    return fetch(link).then(response => {
        if (!response.ok) {
            throw new Error(response.status) 
        } return response.json(); 
        
    }).catch(er => console.log(er))

}
