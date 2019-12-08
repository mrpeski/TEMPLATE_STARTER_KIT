import React from 'react';
import Social from "./Social";
import {getArticle} from "../requests";
import { api } from "../requests/routes";
import SimilarArticles from "./SimilarArticles";
import moment from "moment";

export default class Article extends React.Component {

    render() {
        const { article } = this.state;
        // console.log(api.article.get.articleImage(article.pictureUrl));
        const date = article && article.date || Date.now();

        const articleUI = article ? <article className="col-lg-16 col-xs-24 bg-white p-6">
            <h4 className="">{ article.subject }</h4>
            <span className="text-color-yellow d-block mt-4 mb-4">{  moment(date).format("Do MMMM YYYY") }</span>
            <Social />
            <img src={ article.pictureUrl ? api.article.get.articleImage(article.pictureUrl) : '/images/bustle.jpg' } className="img-fluid mb-3" />
            <div dangerouslySetInnerHTML={{__html: article.body}} />
        </article> : null;

        return <React.Fragment>
                <div className="row justify-content-center">
                    { articleUI }
                </div>
                {
                    article ?
                    <div className={"col-xs-24"}>
                        <SimilarArticles activeArticle={article} />
                    </div>
                    : null
                }
        </React.Fragment>
    }

    state = {
        article: null
    };

    componentDidMount() {
        let loc = window.location;
        var url = new URL(loc);
        var r = url.searchParams.get("r");
        getArticle(r).then((data) => {
            this.setState({
                article: {...data}
            })
        });
    }
}