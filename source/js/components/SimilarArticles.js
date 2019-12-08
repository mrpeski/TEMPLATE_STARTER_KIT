import React from 'react';
import {getArticlesByType} from "../requests";
import {api} from "../requests/routes";
import moment from "moment";
import {arrToObj} from "./helpers";

export default class SimilarArticles extends React.Component {

    render() {

        let articlesArr = Object.values(this.state.articles);
        articlesArr.sort((a, b) => b.date > a.date);

        return articlesArr ?
            <React.Fragment>
                <div className="text-center mt-8 mb-4">
                    <h3>Similar Articles</h3>
                </div>
                <div className="row justify-content-between">
                    {
                        articlesArr.map((article, i) => {
                            const date = article && article.date || Date.now();
                            return <div className="col-xs-24 col-lg-7 mb-5 post" key={i}>
                                <div className="post-mini">
                                    <img
                                        src={article.pictureUrl ? api.article.get.articleImage(article.pictureUrl) : '/images/blog/mill.jpg'}/>
                                </div>
                                <span className="d-block mt-4 mb-4"> {moment(date).format("Do MMMM YYYY")} </span>
                                <a href={`/single/index.html?r=${article.id}`} className="t-18">{article.subject}</a>
                                <p>{article.summary}</p>
                            </div>
                        })
                    }
                </div>
            </React.Fragment> : null;
    }
    state = {
        page: 1,
        size: 3,
        articles: {},
        updateKey: null,
        modal: false,
        loading: false
    };

    componentDidMount() {
        const { page, size } = this.state;
        const { activeArticle } = this.props;
        let type = activeArticle.articleTypeId;
        type && getArticlesByType(type,page,size).then(articles => {
            this.setState((state) => ({
                articles: arrToObj(articles)
            }))
        });
    }
}