import React from 'react';
import CKEditor from "react-ckeditor-component";

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
        }
    }

    componentDidMount() {
        const { defaultValue } = this.props;
        this.setState({
            content: defaultValue
        })
    }

    updateContent = (newContent) => {
        this.setState({
            content: newContent
        })
    };

    onChange = (evt) => {
        console.log("onChange fired with event info: ", evt);
        var newContent = evt.editor.getData();
        this.setState({
            content: newContent
        });
        // console.log(newContent);
        this.props.onChange(newContent);
    };

    onBlur = (evt) => {
        console.log("onBlur event called with event info: ", evt);
    };

    afterPaste = (evt) => {
        console.log("afterPaste event called with event info: ", evt);
    };

    render() {
        return (
            <CKEditor
                activeClass="p10"
                content={this.state.content}
                events={{
                    "blur": this.onBlur,
                    "afterPaste": this.afterPaste,
                    "change": this.onChange
                }}
            />
        )
    }
}

export default Editor;