import React from "react";
import {getArticleTypes, postArticle, postArticleWithImage, putArticleWithImage} from '../../requests';
import { Button, Input, Row, Col, Label, Form, FormGroup } from 'reactstrap';
import Editor from "./Editor";
import {arrToObj} from "../helpers";
import { ArticleSchema } from './schemas';
import { SingleDatePicker } from 'react-dates';
import moment from "moment";

class Article extends React.Component {
    state = {
        articleTypes: {},
        loading: false,
        date: null,
        body: '',
    };

    render() {
        const { article } = this.props;
        const { articleTypes } = this.state;

        let tt = Object.values(articleTypes);

        let UI = tt ?  <Input name='articleTypeId' id="articleTypeId" type="select">
            {tt.map((item) => <option selected={ article && article.articleTypeId === item.articleId} value={item.articleId}>{item.articleTypeName}</option>)}
        </Input> : null;


        return (
            <div className="">
                <Form onSubmit={this.submit}>
                    <Row>
                        <Col className={"col-xs-24 col-lg-16"}>
                            <div className={"p-4"}>
                                <FormGroup>
                                    <Label for="articleTypeId">
                                        Category
                                    </Label>
                                    { UI }
                                </FormGroup>
                                <FormGroup>
                                    <Label for="subject">
                                        Subject
                                    </Label>
                                    <Input name='subject' id="subject" defaultValue={ article ? article.subject : "" }/>
                                </FormGroup><FormGroup>
                                <Label for="body">
                                    Body
                                </Label>
                                <Editor name='body' defaultValue={ article ? article.body : "" } onChange={this.handleChange} />
                                </FormGroup><FormGroup>
                                    <Label for="summary">
                                        Summary
                                    </Label>
                                    <Input name='summary' type="textarea" id="summary" defaultValue={ article ? article.summary : "" }/>
                                </FormGroup>
                            </div>
                        </Col>
                        <Col className={"col-xs-24 col-lg-8 bg-light"}>
                            <div className={"p-4"}>
                            <FormGroup>
                                <Label for="date">
                                    Publish Date
                                </Label>
                                <div>
                                <SingleDatePicker
                                    date={this.state.date}
                                    onDateChange={date => this.setState({ date })}
                                    focused={this.state.focused}
                                    onFocusChange={({ focused }) => this.setState({ focused })}
                                    id="publishDate"
                                    numberOfMonths={1}
                                />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="file">
                                    Featured Image
                                </Label>
                                <Input name='file' type="file" id="file" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="pictureUrl">
                                    Picture URL
                                </Label>
                                <Input name='pictureUrl' readonly disabled type="text" id="pictureUrl" value={article ? article.pictureUrl : ""}/>
                            </FormGroup>
                            <button type="submit" className="btn btn-primary" disabled={this.state.loading}>
                                { this.state.loading ? 'Loading...' : this.props.article ? "Update" : "Create" }
                            </button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }

    componentDidMount() {
        const { article } = this.props;
        getArticleTypes().then(articles => {
            this.setState((state) => ({
                articleTypes: arrToObj(articles, 'articleId')
            }));
        });
        article ? this.setState({
            date: moment(article.date)
        }) : this.setState({
            date: moment()
        });
    }

    handleChange = (newContent) => {
        this.setState({
            body: newContent
        })
    };

    addArticle = payload => {
        this.setState({
            loading: true
        });
        postArticleWithImage(payload, 'file').then((res) => {
            this.props.onNewArticle(res);
            this.setState({
                loading: false
            });
        });
    };

    handleArticleUpdate = payload => {
        putArticleWithImage(payload, 'file').then((res) => {
            this.props.onUpdateArticle(res);
        });
    };

    submit = e => {
        e.preventDefault();
        let {date, body} = this.state;
        let updateKey = this.props.updateKey;
        let formData = new FormData(e.target);

        // alert(JSON.stringify(this.state));
        //
        // // ArticleSchema.isValid().then(() => {
        // //
        // // });

        updateKey ? formData.append('id', updateKey) : null;
        let payload = {};
        for (let entry of formData) {
            payload[entry[0]] = entry[1]
        }
        payload.date = date;
        payload.body = body;

        // alert(JSON.stringify(payload));
        updateKey
            ? this.handleArticleUpdate(payload)
            : this.addArticle(payload);
    };
}



export default Article;
