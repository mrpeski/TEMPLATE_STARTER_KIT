import 'jquery.steps'
import 'jquery-steps.css'

let wizard = $("#wizard").steps();

wizard.steps("add", {
    title: "HTML code",
    content: "<strong>HTML code</strong>"
});
