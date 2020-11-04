const accordion = (triggerSelector, itemsSelector) => {
    const headers = document.querySelectorAll(triggerSelector)

    headers.forEach(header => {
        header.addEventListener('click', function () {
            if (!this.classList.contains('active-style')) {
                headers.forEach(header => {
                    header.classList.remove('active-style')
                    header.nextElementSibling.classList.remove('active-content')
                    header.nextElementSibling.style.maxHeight = '0px'; 
                })
                this.classList.add('active-style')
                this.nextElementSibling.classList.add('active-content')
                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px'; 
            }

        })
    })

    //     blocks = document.querySelectorAll(itemsSelector)

    // blocks.forEach(block => {
    //     block.classList.add('animated', 'fadeInDown')
    // })

    // headers.forEach(header => {
    //     header.addEventListener('click', function (){
    //         if (!this.classList.contains('active')) {
    //             headers.forEach(header => {
    //                 header.classList.remove('active', 'active-style')
    //             })
    //             this.classList.add('active', 'active-style')
    //         }
    //     })
    // })

}

export default accordion;