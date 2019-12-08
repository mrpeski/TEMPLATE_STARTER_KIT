import React from 'react';
import ArticleType from "./forms/articleType";
import {Button, Input, Modal, ModalBody, ModalHeader, Table} from 'reactstrap';
import {deleteArticleType, getArticles, getArticleTypes, getFeeds} from "../requests";
import { arrToObj } from "./helpers"
import {ToastContainer} from "react-toastify";

class ManageArticleType extends React.Component {

    render() {
        let articlesArr = Object.values(this.state.articles);

        let articlesList = articlesArr ? articlesArr.map(item => (
            <tr key={item.articleId}>
                <td>
                    {item.articleTypeName}
                </td>
                <td>
                    <button onClick={() => this.edit(item.articleId)} className={"btn-link"}>Edit</button>
                    <button onClick={() => this.handleDeleteArticle(item.articleId)} className={"btn-link"}>Delete</button>
                </td>
            </tr>
        ))  : null;
        return (
            <div>
                <ToastContainer/>
                <Button color="default" onClick={this.addNew} className={'shadow-sm'}>New ArticleType</Button>
                <Table dark className={"mt-4"}>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    { articlesList }
                    </tbody>
                </Table>
                <Modal size={"xl"} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>{ this.state.updateKey ? 'Update' : 'New'}</ModalHeader>
                    <ModalBody>
                        <ArticleType
                            updateKey={this.state.updateKey}
                            article={this.state.updateKey ? this.state.articles[this.state.updateKey] : null}
                            onToggle={this.toggle}
                            onNewArticle={ this.onNewArticle }
                            onUpdateArticle={ this.updateArticle }
                        />
                    </ModalBody>
                </Modal>
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            size: 6,
            count: null,
            articles: {},
            updateKey: null,
            modal: false,
            loading: false
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        getArticleTypes().then(articles => {
            this.setState((state) => ({
                articles: arrToObj(articles, 'articleId')
            }))
        })
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    edit = id => {
        this.setState({
            modal: true,
            updateKey: id,
        });
    };

    addNew = () => {
        this.setState({
            modal: true,
            updateKey: null,
        });
    };

    onNewArticle = (newArticle) => {
        this.setState((state) => ({
            articles: {
                ...state.articles, [newArticle.articleId]: newArticle
            },
            modal: false
        }));
    };

    updateArticle = (article) => {
        this.setState((state) => ({
            articles: {
                ...state.articles,
                [article.articleId]: article
            },
            modal: false
        }));
    };

    handleDeleteArticle = id => {
        let response = confirm("Are you sure?");
        let art = { ...this.state.articles };
        delete art[id];
        if(response){
            deleteArticleType(id).then(() => {
                this.setState((state) => ({
                    articles: { ...art }
                }));
            });
        }
    };
}

export default ManageArticleType;