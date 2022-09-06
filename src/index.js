document.addEventListener('DOMContentLoaded',function(event){
    event.preventDefault()
    
    function initial() {
        const start = fetch('http://localhost:3000/pups')
        .then(resp => resp.json())
        .then(data => renderDogs(data))
        return start
    }
    function renderDogs(dogs) {
        dogs.forEach(renderEach)
    }
    function renderEach(dog) {
        const span = document.createElement('span')
        span.textContent = dog.name
        document.querySelector('#dog-bar').appendChild(span)
        span.addEventListener('click', function() {
            clicked(e, dog.image, dog.isGoodDog, dog.name, dog.id)
        })
    }
    function clicked(e, image, goodAtt, name, dogId) {
        let info = document.querySelector('#dog-info')
        let img = document.createElement('img')
        img.src = image
        let h2 = document.createElement('h2')
        h2.innerHTML = name
        let btn = document.createElement('button')
        btn.textContent = (goodAtt? 'good': 'bad')
        info.appendChild(img)
        info.appendChild(h2)
        info.appendChild(btn)
        btn.addEventListener('click', () => renderDogs(btn, goodAtt, dogId))
    }
    function render(btn, good, dogId) {
        fetch(`http://localhost:3000/pups/${dogId}`, {
            method : `PATCH`,
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                isGoogDog : !goodAtt
            })
        })
        .then(resp => resp.json())
        .then(data =>{
            clicked(data.image, data.isGoodDog, data.name. data.id)
            renderGood()
        })
    }
    function renderGood() {
        fetch('http://localhost:3000/pups')
        .then(resp=> resp.json())
        .then(data => renderBad(data))
    }
    let select = document.querySelector('#good-dog-filter')
    select.addEventListener('click', ()=>{
        fetch('http://localhost:3000/pups')
        .then(resp => resp.json())
        .then(data=>{
            if (select.innerHTML==='Filter good dogs: OFF') {
                select.innerHTML==='Filter good dogs: ON'
                renderBad(data)
            }
            else{
                select.innerHTML==='Filter good dogs: OFF'
                data.forEach(renderEach)
            }
        })
    })
    function renderBad(dog) {
        document.querySelector('#dog-bar').innerHTML = ''
        const goodTrue = dog.filter(info => info.isGoodDog==true)
        goodTrue.forEach(renderinfo)
    }
    function renderInfo(dog) {
        const span = document.createElement('span')
        span.innerHTML = dog.name
        document.querySelector('#dog-bar').appendChild(span)
        span.addEventListener('click', function() {
            dogClick(e, dog.image, dog.isGoodDog, dog.name, dog.id)
    })
}
    initial()
})
