import {
    postData
} from '../services/requests';

const forms = () => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        selects = document.querySelectorAll('select'),
        messages = {
            loading: 'Данные отправляются',
            success: 'Спасибо! Мы с вами свяжемся',
            failure: 'Что-то пошло не так...',
            spinner: 'assets/img/spinner.gif',
            ok: 'assets/img/ok.png',
            fail: 'assets/img/fail.png'
        },
        path = {
            designer: 'assets/server.php',
            question: 'assets/question.php'
        },
        uploads = document.querySelectorAll('[name="upload"]')

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = ''
        })

        selects.forEach(select => { //дефолтное значение 
            select.options[0].setAttribute('selected', 'true')
        })

        uploads.forEach(item => {
            item.previousElementSibling.textContent = "Файл не выбран"
        })
    }

    uploads.forEach(item => {
        let dots;

        item.addEventListener('input', () => {
            let arr = item.files[0].name.split('.')
            arr[0].length > 6 ? dots = "..." : dots = '.'
            const name = arr[0].substring(0, 6) + dots + arr[1].substring(0, 6)
            item.previousElementSibling.textContent = name
        })
    })

    form.forEach(item => {
        // let btn = item.querySelector('.button-order'),
        //     selects = item.querySelectorAll('select'),
        //     inputs = item.querySelectorAll('input')

        // btn.disabled = true
        // btn.style.opacity = '0.5'

        // item.addEventListener('change', () => {
        //     selects.forEach(select => {
        //         if (select.selectedIndex > 0) {
        //             btn.disabled = false
        //             btn.style.opacity = '1'
        //         } else {
        //             btn.disabled = true
        //             btn.style.opacity = '0.5'
        //         }
        //     })

        //     inputs.forEach(input => {
        //         if (input.value !== '') {
        //             btn.disabled = false
        //             btn.style.opacity = '1'
        //         }
        //         else {
        //             btn.disabled = true
        //             btn.style.opacity = '0.5'
        //         }
        //     })
        // })

        item.addEventListener('submit', e => {
            e.preventDefault()
            console.log(item)

            let statusMessage = document.createElement('div')
            statusMessage.classList.add('status', 'd-flex', 'justify-content-center', 'text-center')
            item.parentNode.appendChild(statusMessage)

            item.classList.add('animated', 'fadeOutUp')
            setTimeout(() => {
                item.style.display = 'none'
            }, 400)

            let statusImg = document.createElement('img')
            statusImg.setAttribute('src', messages.spinner)
            statusImg.classList.add('animated', 'fadeInUp')
            statusMessage.appendChild(statusImg)

            let textMessage = document.createElement('div')
            textMessage.textContent = messages.loading
            statusMessage.appendChild(textMessage)

            let formData = new FormData(item)
            let api;

            if (item.classList.contains('calc_form')) {
                item.querySelectorAll('select').forEach((select) => { // добавление в formData данных выбранного селекта
                    let indexSelect = select.selectedIndex,
                        optionVal = select.options[indexSelect].value
                    formData.append(select.id, optionVal)
                })

                let total = item.querySelector('.calc-price') // добавление в formData итоговой суммы
                formData.append('total', +total.textContent)
            }

            item.closest('.popup-design') || item.classList.contains('calc_form') ?
                api = path.designer : api = path.question
            console.log(api)

            postData(api, formData)
                .then(res => {
                    statusImg.setAttribute('src', messages.ok)
                    textMessage.textContent = messages.success
                    console.log(res)
                })
                .catch(() => {
                    statusImg.setAttribute('src', messages.fail)
                    textMessage.textContent = messages.failure
                })
                .finally(() => {
                    clearInputs()

                    setTimeout(() => {
                        statusMessage.remove()

                        item.style.display = 'block'
                        item.classList.remove('fadeOutUp')
                        item.classList.add('fadeInUp')
                    }, 5000);
                })
        })
    })

}

export default forms;