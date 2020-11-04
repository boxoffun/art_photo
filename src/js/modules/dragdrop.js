const drop = () => {
    const inputs = document.querySelectorAll('input[name="upload"]');
    // console.log(inputs)

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        inputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false)
        })
    })

    function preventDefaults(e) {
        e.preventDefault()
        e.stopPropagation()
    }

    function highlight(item) {
        item.parentElement.querySelector('button').classList.add('drag_drop', 'animated', 'fadeInOut')
        item.parentElement.querySelector('button').textContent = "Перенесите изображение в эту область"
    }

    function unhighlight(item) {
        item.parentElement.querySelector('button').classList.remove('drag_drop')
        item.parentElement.querySelector('button').textContent = "Загрузить фотографию"
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        inputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false)
        })
    });

    ['dragleave', 'drop'].forEach(eventName => {
        inputs.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input), false)
        })
    });

    inputs.forEach(input => {
        input.addEventListener('drop', e => {
            input.files = e.dataTransfer.files

            let arr = input.files[0].name.split('.'),
                dots
            arr[0].length > 6 ? dots = "..." : dots = '.'
            const name = arr[0].substring(0, 6) + dots + arr[1].substring(0, 6)
            input.previousElementSibling.textContent = name
        })
    })
}

export default drop;