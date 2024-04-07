import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {


  constructor() {
    super()
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=babb0fcbbed944079569ece03ec8cb4d&page=1&pageSize=20s";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);


    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      page: 1,
      totalPages: Math.ceil(parsedData.totalResults / 20)
    })
  }

  handlePrevclick = async () => {
    console.log("Previous")
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=babb0fcbbed944079569ece03ec8cb4d&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles
    })
  }
  handleNextclick = async () => {
    if(this.state.page + 1 > Math.ceil(this.state.totalResults / 20) ){

    }else{
    console.log("Next")
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=babb0fcbbed944079569ece03ec8cb4d&page=${this.state.page + 1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles
    })
  }
  }
  render() {

    console.log(this.state, "state value");


    return (

      <div className='container my-3' >
        <h2>News Monks - Top Headlines</h2>
        <div className="row mx-auto">
          {this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>
          })}

        </div>
        <div className="conatiner d-flex justify-content-end">
          <button disabled={this.state.page <= 1} type="button" onClick={this.handlePrevclick} className="btn btn-primary mx-2" >&larr; Previous</button>

          <button type="button" onClick={this.handleNextclick} className="btn btn-primary" >Next &rarr;</button>
        </div>
      </div>

    )
  }
}

export default News
