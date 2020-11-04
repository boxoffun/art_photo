const slides = (sliders, direction, prev, next) => {
    let slideIndex = 1,
        paused = false

    const items = document.querySelectorAll(sliders)

    function showSlides(n) {
        if (n > items.length) {
            slideIndex = 1
        }
        if (n < slideIndex) {
            slideIndex = items.length
        }

        items.forEach(item => {
            item.classList.add('animated')
            item.style.display = 'none'
        })

        items[slideIndex - 1].style.display = 'block'
    }

    showSlides(slideIndex)

    function changeSlide(n) {
        showSlides(slideIndex += n)
    }

    try {
        const prevBtn = document.querySelector(prev),
            nextBtn = document.querySelector(next)

        prevBtn.addEventListener('click', () => {
            changeSlide(-1)
            items[slideIndex - 1].classList.remove('slideInRight')
            items[slideIndex - 1].classList.add('slideInLeft')
        })

        nextBtn.addEventListener('click', () => {
            changeSlide(1)
            items[slideIndex - 1].classList.remove('slideInLeft')
            items[slideIndex - 1].classList.add('slideInRight')

        })

    } catch (error) {
        // console.warn(`I don't have any prev and next buttons`)
    }

    function activateAnimation() {
        if (direction === 'vertical') {
            paused = setInterval(() => {
                changeSlide(1)
                items[slideIndex - 1].classList.add('fadeInDown')
    
            }, 3000);
        } else {
            paused = setInterval(() => {
                changeSlide(1)
                items[slideIndex - 1].classList.remove('slideInLeft')
                items[slideIndex - 1].classList.add('slideInRight')
            }, 3000);
        }
    }

    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused)
    })

    items[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation()
    })


}



export default slides;