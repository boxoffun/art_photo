const mask = (selector) => {
    let setCursorPosition = (pos, elem) => {
        elem.focus()

        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos)
        } else if (elem.createTextRange) {
            let range = elem.createTextRange()

            range.collapse(true)
            range.moveEnd('character', pos)
            range.moveStart('character', pos)
            range.select()
        }
    }


    function createMask(event) {
        let matrix = '+7 (___) ___ __ __',
            i = 0,
            def = matrix.replace(/\D/g, ''),
            val = this.value.replace(/\D/g, '')

        let num = val.substring(0, 1)

        if (event.type === 'input') {
            if (num !== '7') {
                let newStr = val.replace(num, '')
                val = newStr
            }
            
        }

        // this.addEventListener('select', () => {
        //     this.setRangeText('+7', 0, this.value.length)
        // })
        
        // function setCharAt(str, index, chr) {
        //     if(index > str.length-1) return str;
        //     return str.substring(0,index) + chr + str.substring(index+1);
        // }
        

        if (def.length >= val.length) {
            val = def
        }

        this.value = matrix.replace(/./g, (a) => {
            if (/[_\d]/.test(a) && i < val.length) {
                return val.charAt(i++)
            } else {
                if (i >= val.length) {
                    return ''
                } else {
                    return a
                }
            }
        })

        if (event.type === 'blur') {
            if (this.value.length == 2) {
                this.value = ''
            }
        } else {
            setCursorPosition(this.value.length, this)
        }
    }

    let inputs = document.querySelectorAll(selector)

    inputs.forEach(input => {
        input.addEventListener('input', createMask)
        input.addEventListener('focus', createMask)
        input.addEventListener('blur', createMask)
    })
}

export default mask;