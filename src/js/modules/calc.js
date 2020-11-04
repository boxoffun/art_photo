import {
    getDescriptions
} from '../services/requests';

const calc = (size, material, option, promocode, result) => {
    const sizeBlock = document.querySelector(size),
        materialBlock = document.querySelector(material),
        optionBlock = document.querySelector(option),
        promocodeBlock = document.querySelector(promocode),
        resultBlock = document.querySelector(result)

    // console.log(sizeBlock, materialBlock, optionBlock)

    getDescriptions('http://localhost:3000/descriptions')
        .then(res => {
            createInfo(res)
        })

    function createInfo(response) {
        for (let key in response) {
            let element = document.getElementById(key)
            response[key].forEach(item => {
                let optionElem = document.createElement('option')
                element.appendChild(optionElem)
                for (let option in item) {
                    if (option === 'value') {
                        optionElem.setAttribute(option, item[option])
                    }
                    if (option === 'title') {
                        optionElem.textContent = item[option]
                    }
                    if (option === 'name') {
                        optionElem.setAttribute('title', item[option])
                    }
                }
            })
        }
    }

    let sum = 0

    function calcFunc() {
        let options = this.options  //this - это селекты
        if (options) {
            let selected = options.selectedIndex

            options.forEach(option => {
                option.removeAttribute('selected')
            })
            options[selected].setAttribute('selected', 'true')   // установка selected для выбраных option
        }
        

        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionBlock.value))

        if (sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = 'Пожалуйста, выберите размер и материал'
        } else if (promocodeBlock.value === 'IWANTPOPART') {
            resultBlock.textContent = Math.round(sum * 0.7)
        } else {
            resultBlock.textContent = sum
        }
    }

    sizeBlock.addEventListener('change', calcFunc)
    materialBlock.addEventListener('change', calcFunc)
    optionBlock.addEventListener('change', calcFunc)
    promocodeBlock.addEventListener('input', calcFunc)

}

export default calc;

// сделать запросы о материалах итд с сервера (при каждом событии change)  *
// делать селект с дефолтным значением после отправки *
//запретить отправлять форму если не заполнено одно из полей    