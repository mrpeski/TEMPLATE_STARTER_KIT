import React from 'react';
import { getArticles } from "../requests";
import moment from "moment";

export default class ArticlesBucket extends React.Component {

    render() {
        const { list } = this.state;
        return list ? list.map((elem, i) => {
            const date = elem && elem.date || Date.now();
            return elem ? <div className="excerpt" key={i}>
                <span className="d-block mb-2"> {moment(date).format("Do MMMM YYYY")} </span>
                <a href={`/single/index.html?r=${elem.id}`}>
                    <h5 className="text-color-yellow">
                        { elem.subject }
                    </h5>
                </a>
                <p className="">
                    <span dangerouslySetInnerHTML={{__html: elem.body.substring(0, 150)}} />
                </p>
            </div> : null
        }) : null;
    }

    state = {
        list: null
    };
    componentDidMount() {
        getArticles(1,6).then((data) => {
            this.setState({
                list: data
            })
        });
    }
}