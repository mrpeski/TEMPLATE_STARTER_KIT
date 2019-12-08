import React from 'react';
import { getFeeds } from "../requests";
import moment from "moment";

export default class RssFeedBucket extends React.Component {

    render() {
        const { list } = this.state;
        return list ? list.map((elem, i) => {
            const date = elem && elem.date || Date.now();
            return elem ? <div className="excerpt" key={i}>
                <span className="d-block mb-2"> {moment(date).format("Do MMMM YYYY")} </span>
                <a href={elem.url}>
                    <h5 className="text-color-yellow">
                        { elem.subject }
                    </h5>
                </a>
                <p>
                    { elem.summary }
                </p>
            </div> : null
        }) : null;
    }

    state = {
        list: null
    };
    componentDidMount() {
        getFeeds(1,6).then((data) => {
            this.setState({
                list: data
            })
        });
    }
}