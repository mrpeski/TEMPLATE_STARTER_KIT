import 'toastr/build/toastr.css'
import $ from 'jquery'
import toastr from 'toastr'

let d = document;
// let info_trigger = d.querySelectorAll(".info");
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

$(".info").on('click', function(){
    toastr.info('Are you the 6 fingered man?')
});
$(".success").on('click', function(){
    toastr.success('Are you the 6 fingered man?')
});
$(".error").on('click', function(){
    toastr.error('Surprise!')
});

