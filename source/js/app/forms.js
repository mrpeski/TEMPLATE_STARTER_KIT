import 'jquery-validation'
import 'select2'
import 'select2/dist/css/select2.min.css'

$("#test").validate({
    rules: {
        username: {
            required: true,
            // Using the normalizer to trim the value of the element
            // before validating it.
            //
            // The value of `this` inside the `normalizer` is the corresponding
            // DOMElement. In this example, `this` references the `username` element.
            normalizer: function(value) {
                return $.trim(value);
            }
        }
    }
});

$(".special--input .form-control").on('change', function(){
    let val = $(this).val();
    if(val) {
        $(this).addClass("filled")
    } else {
        $(this).removeClass("filled")
    }
})

$("#commentForm").validate();


$(document).ready(function() {
    $('.dropdownOptions').select2();
});
