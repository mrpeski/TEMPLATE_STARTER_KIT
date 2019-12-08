import React from "react";
import { postArticleType, putArticleType  } from '../../requests';
import { Button, Input, Label, Form, FormGroup } from 'reactstrap';

class ArticleType extends React.Component {

    render() {
        const { article } = this.props;
        return (
            <div className="">
                <Form onSubmit={this.submit}>
                    <FormGroup>
                        <Label for="articleTypeName">
                            Name
                        </Label>
                        <Input name='articleTypeName' id="articleTypeName" defaultValue={ article ? article.articleTypeName : "" }/>
                    </FormGroup>
                    <button type="submit" className="btn btn-primary">
                        {this.props.article ? "Update" : "Add"}
                    </button>
                </Form>
            </div>
        );
    }

    addArticle = payload => {
        postArticleType(payload).then((res) => {
            this.props.onNewArticle(res)
        });
    };

    handleArticleUpdate = payload => {
        putArticleType(payload).then((res) => {
            this.props.onUpdateArticle(res)
        });
    };

    submit = e => {
        e.preventDefault();
        let updateKey = this.props.updateKey;
        let formData = new FormData(e.target);
        updateKey ? formData.append('articleId', updateKey) : null;
        let payload = {};
        for (let entry of formData) {
            payload[entry[0]] = entry[1]
        }
        updateKey
            ? this.handleArticleUpdate(payload)
            : this.addArticle(payload);
    };
}



export default ArticleType;
