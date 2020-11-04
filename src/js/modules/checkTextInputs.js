const checkTextInputs = (selector) => {
    const txtInputs = document.querySelectorAll(selector)

    txtInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key.match(/[^^[А-ЯЁ][а-яё] [0-9]/ig)) {
                e.preventDefault()
            } 
        })

        input.addEventListener('input', (e) => {
            if (!input.value.match(/^[А-ЯЁ][а-яё]*$/ig)) {
                input.value = ''
            }
        })

    })

}

export default checkTextInputs;