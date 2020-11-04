const pictureSize = (imgSelector) => {
    const blocks = document.querySelectorAll(imgSelector)

    function showImage(block) {
        const img = block.querySelector('img')
        img.src = img.src.slice(0, -4) + '-1.png'

        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
            p.style.display = 'none'
        })
    }

    function hideImage(block) {
        const img = block.querySelector('img')
        img.src = img.src.slice(0, -6) + '.png'

        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
            p.style.display = 'block'
        })
    }

    blocks.forEach(block => {
        block.addEventListener('mouseover', () => {
            showImage(block)
        })

        block.addEventListener('mouseout', () => {
            hideImage(block)
        })
    })
    
}

export default pictureSize; 