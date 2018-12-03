
import swal from 'sweetalert2'

function Error(message) {

    return swal({
        type: 'error',
        title: message

    })
}

export default Error