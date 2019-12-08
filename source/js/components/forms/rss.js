import React from "react";
import { postFeed, putFeed  } from '../../requests';
import { Button, Input, Label, Form, FormGroup } from 'reactstrap';

class RSS extends React.Component {

    render() {
        const { article } = this.props;
        return (
            <div className="">
                <Form onSubmit={this.submit}>
                    <FormGroup>
                        <Label for="subject">
                            Subject
                        </Label>
                        <Input name='subject' id="subject" defaultValue={ article ? article.subject : "" }/>
                    </FormGroup><FormGroup>
                    <Label for="summary">
                        Summary
                    </Label>
                    <Input name='summary' type="textarea" id="summary" defaultValue={ article ? article.summary : "" }/>
                </FormGroup><FormGroup>
                    <Label for="url">
                        URL
                    </Label>
                    <Input name='url' type="text" id="url" defaultValue={ article ? article.url : "" }/>
                </FormGroup>
                    <FormGroup>
                    <Label for="date">
                        Publish Date
                    </Label>
                    <Input name='date' type="date" id="date" defaultValue={ article ? article.date : "" }/>
                </FormGroup>
                    <button type="submit" className="btn btn-primary">
                        {this.props.article ? "Update" : "Add"}
                    </button>
                </Form>
            </div>
        );
    }

    addArticle = payload => {
        postFeed(payload).then((res) => {
            this.props.onNewArticle(res)
        });
    };

    handleArticleUpdate = payload => {
        putFeed(payload).then((res) => {
            this.props.onUpdateArticle(res)
        });
    };

    submit = e => {
        e.preventDefault();
        let updateKey = this.props.updateKey;
        let formData = new FormData(e.target);
        // formData.append('articleTypeId', '1');
        updateKey ? formData.append('id', updateKey) : null;
        let payload = {};
        for (let entry of formData) {
            payload[entry[0]] = entry[1]
        }
        // console.log(payload);
        updateKey
            ? this.handleArticleUpdate(payload)
            : this.addArticle(payload);
    };
}



export default RSS;
