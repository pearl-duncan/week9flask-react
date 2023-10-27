import React, { Component } from 'react'
import Article from './Article';

export default class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: []
        }
    }

    getNews = async () => {
        console.log('GETTING THE NEWS!')
        const res = await fetch('https://newsapi.org/v2/everything?q=bitcoin&apiKey=4ba2cb57066b49e2b7a8f20f5e0f65c6&pageSize=21');
        const data = await res.json();
        this.setState({
            articles: data.articles
        })
    }

    componentDidMount() {
        this.getNews()
    }

    loadArticles = () => {
        return this.state.articles.map((a, index) => <Article key={index} articleInfo = {a}/>)
    }
    
    loadingChecker =() => (this.state.articles.length === 0) ? <h2>Loading...</h2> : this.loadArticles()

    render() {
        return (
            <>
                <h1>News</h1>
                <div className="container">
                    <div className='row'>
                        {this.loadingChecker()}
                    </div>
                </div>
            </>
        )
    }
}
