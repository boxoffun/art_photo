import {
    postData
} from '../services/requests';

// const sendImage = (elem) => {
//     const input = document.getElementById(elem)

//     let file,
//         api = 'assets/server.php'

//     input.addEventListener('change', function (e) {
//         e.preventDefault()
//         file = e.target.files[0]

//         let formData = new FormData()
//         formData.append('upload', file)

//         postData(api, formData)
//             .then(res => {
//                 console.log(res)
//             })
//             .catch(e => {
//                 console.error(e)
//             })
//             .finally(() => {
//                 console.log('submitted')
//             })

//     })
// }

const sendImage = (elem, event) => {
    const inputImage = document.getElementById(elem)

    let file,
        api = 'assets/server.php'

    inputImage.addEventListener(event, function (e) {
        e.preventDefault()

        if (event === 'drop') {
            file = e.dataTransfer.files[0]
        } else {
            file = e.target.files[0]
        }


        let formData = new FormData()
        formData.append('upload', file)

        postData(api, formData)
            .then(res => {
                console.log(res)
            })
            .catch(e => {
                console.error(e)
            })
            .finally(() => {
                console.log('submitted')
            })

    })
}

export default sendImage;