import swal from 'sweetalert2'

function Success(message) {

    return swal({
        type: 'success',
        title: `Succesfully ${message}`,
        showConfirmButton: false,
        timer: 1500
    })
}

export default Success