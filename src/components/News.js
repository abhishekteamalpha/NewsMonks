import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner'



export class News extends Component {


  constructor() {
    super()
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }
  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d464b5e1f0aa4ad79a615b0729da288b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);


    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      // page: 1,
      totalPages: Math.ceil(parsedData.totalResults / this.props.pageSize),
      loading: false
    })
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevclick = async () => {
    // console.log("Previous")
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d464b5e1f0aa4ad79a615b0729da288b&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false
    // })
    this.setState({ page: this.state.page - 1 })
    this.updateNews();
  }
  handleNextclick = async () => {
    // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
    //   console.log("Next")
    //   this.setState({ loading: true });
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d464b5e1f0aa4ad79a615b0729da288b&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false
    //   })
    // }
    this.setState({ page: this.state.page + 1 })
    this.updateNews();
  }
  render() {

    console.log(this.state, "state value");


    return (

      <div className='container my-3' >
        <h1 className="text-center" style={{ margin: '35px 0px' }}>News Monks - Top Headlines</h1>
        {this.state.loading && <Spinner />}

        <div className="row mx-auto">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} source={element.source.name} />
            </div>
          })}

        </div>

        <div className="conatiner d-flex justify-content-end">
          <button disabled={this.state.page <= 1} type="button" onClick={this.handlePrevclick} className="btn btn-primary mx-2" >&larr; Previous</button>

          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.handleNextclick} className="btn btn-primary" >Next &rarr;</button>
        </div>
      </div>



    )
  }
}

export default News
