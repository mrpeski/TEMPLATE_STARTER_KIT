import React from 'react';
import {getArticles} from "../requests";
import {arrToObj} from "./helpers";
import {api} from "../requests/routes";
import moment from "moment";

export default class NewsPage extends React.Component {
    render() {
        let articlesArr = Object.values(this.state.articles);
        articlesArr.sort((a,b) => b.date > a.date);

        let articlesList = articlesArr ? articlesArr.map( (article, i) => {
                const date = article && article.date || Date.now();
                return <div className="col-xs-24 col-lg-7 mb-5 post" key={i}>
                            <div className="post-mini">
                                <img src={ article.pictureUrl ? api.article.get.articleImage(article.pictureUrl) : '/images/blog/mill.jpg' } />
                            </div>
                            <span className="d-block mt-4 mb-4"> {moment(date).format("Do MMMM YYYY")} </span>
                            <a href={`/single/index.html?r=${article.id}`} className="t-18">{article.subject}</a>
                            <p>{article.summary}</p>
                        </div>
            }) : null;

        return <React.Fragment>
                    <div className="row justify-content-center mb-7 no-gutters">
                        <div className="col-xs-24 col-lg-16">
                            <div style={{width: "100%", overflow: "hidden"}}>
                                <img src="/images/blog/hero.jpg" className="w-100"/>
                            </div>
                        </div>
                        <div className="col-xs-24 col-lg-8">
                            <div className="p-6 bg-gray-dark h-100">
                                <a href="/single/index.html"><h2 className="text-color-yellow t-18">Turning Leads Into Guests With
                                    Content&UX</h2></a>
                                <p className="text-color-light">
                                    The goal of every tourist website is to turn potential leads into guests by guidinThe goal of
                                    every tourist website is to turn potential leads into guests by guidin....
                                </p>
                            </div>
                        </div>
                    </div>
            <div className="row justify-content-between">
                { articlesList }
            </div>
            <div className="row justify-content-center" onClick={this.loadMore}>
                <button className="btn btn-outline-gray"> { this.state.loading ? 'Loading...' : 'See More News' }</button>
            </div>
        </React.Fragment>
    }

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            size: 6,
            articles: {},
            updateKey: null,
            modal: false,
            loading: false
        };
        this.loadMore = this.loadMore.bind(this)
    }

    componentDidMount() {
        const { page, size } = this.state;
        getArticles(page,size).then(articles => {
            this.setState((state) => ({
                articles: arrToObj(articles)
            }))
        });
    }

    loadMore(e){
            let page = this.state.page + 1;
            this.setState({
                loading: true
            });
            getArticles(page,this.state.size).then(articles => {
                let newArticles = arrToObj(articles);
                this.setState((state) => ({
                    articles: { ...newArticles, ...state.articles },
                    page,
                    loading: false
                }))
            });
    }
}