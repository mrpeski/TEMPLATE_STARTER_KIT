import tinymce from 'tinymce/tinymce';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'


// A theme is also required
import 'tinymce/themes/silver/theme';

// Any plugins you want to use has to be imported
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';


tinymce.init({
    selector: 'textarea#editor',
    height: 500,
    menubar: false,
    branding: false,
    plugins: [
      'link paste',
    ],
    toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
    content_css: [
      '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
      '//www.tiny.cloud/css/codepen.min.css'
    ]
  });

  ClassicEditor
  .create( document.querySelector( '#ckeditor' ) )
  .catch( error => {
      console.error( error );
  } );
