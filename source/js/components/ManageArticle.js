import React from 'react';
import Article from "./forms/article";
import { Button, Modal, ModalBody, ModalHeader, Table, Input } from 'reactstrap';
import {deleteArticle, getArticles, getArticleTypes} from "../requests";
import { arrToObj } from "./helpers"
import { ToastContainer } from "react-toastify";

class ManageArticle extends React.Component {

    render() {
        let articlesArr = Object.values(this.state.articles);
        let { count } = this.state;

        let articlesList = articlesArr ? articlesArr.map((item, i) => (
            <tr key={item.id}>
                <td>
                    {i+1}
                </td>
                <td>
                    {item.subject}
                </td>
                <td>
                    {item.date}
                </td>
                <td>
                    <button onClick={() => this.edit(item.id)} className={"btn-link"}>Edit</button>
                    <button onClick={() => this.handleDeleteArticle(item.id)} className={"btn-link"}>Delete</button>
                </td>
            </tr>
        ))  : null;
        return (
            <div>
                <ToastContainer />
                <Button color="default" onClick={this.addNew} className={'shadow-sm'}>New Article</Button>
                <Table dark className={"mt-4"}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Published Date</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    { articlesList }
                    </tbody>
                </Table>
                <Input type="text" className={"d-inline-block mr-2 shadow-sm"}
                       style={{width: 100}} value={this.state.size}
                       onChange={(e) => this.setState({ size: e.target.value })}
                       disabled={this.state.loading} />
                <Button color="default" onClick={ this.loadLess }
                        disabled={this.state.loading}
                        className={"mr-1 shadow-sm"}>
                    {!this.state.loading ? `Prev ${this.state.size}` : 'Loading...'}
                </Button>
                <Button color="default" onClick={ this.loadMore }
                        className={"ml-1 shadow-sm"}
                        disabled={this.state.loading}>
                    {!this.state.loading ? `Next ${this.state.size}` : 'Loading...'}
                </Button>
                <Modal size={"xl"} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>{ this.state.updateKey ? 'Update Article' : 'New Article'}</ModalHeader>
                    <ModalBody>
                        <Article
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
            size: 10,
            count: null,
            articles: {},
            updateKey: null,
            modal: false,
            loading: false
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        const { page, size } = this.state;
        getArticles(page,size).then(articles => {
            this.setState((state) => ({
                articles: arrToObj(articles),
                count: size
            }))
        });
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
        newArticle ?
        this.setState((state) => ({
            articles: {
                ...state.articles, [newArticle.id]: newArticle
            },
            modal: false
        })) : null;
    };

    updateArticle = (article) => {
        article ?
        this.setState((state) => ({
            articles: {
                ...state.articles,
                [article.id]: article
            },
            modal: false
        })) : null;
    };

    handleDeleteArticle = id => {
        let response = confirm("Are you sure?");
        let art = { ...this.state.articles };
        delete art[id];
        if(response){
            deleteArticle(id).then(() => {
                this.setState((state) => ({
                    articles: { ...art }
                }));
            });
        }
    };

    loadMore = (e) => {
        let page = this.state.page + 1;
        this.setState({
            loading: true
        });
        getArticles(page,this.state.size).then(articles => {
            let newArticles = arrToObj(articles);
            this.setState((state) => ({
                articles: { ...newArticles },
                page,
                count: state.count + state.size,
                loading: false
            }))
        });
    };

    loadLess = (e) => {
        let page = (this.state.page - 1 > 0) ? this.state.page - 1 : 1;
        this.setState({
            loading: true
        });
        getArticles(page,this.state.size).then(articles => {
            let newArticles = arrToObj(articles);
            this.setState((state) => ({
                articles: { ...newArticles },
                page,
                loading: false
            }))
        });
    };
}

export default ManageArticle;