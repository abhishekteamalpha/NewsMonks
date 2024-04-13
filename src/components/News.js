import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - News Monks`;
  }

  capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1)

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d464b5e1f0aa4ad79a615b0729da288b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      totalPages: Math.ceil(parsedData.totalResults / this.props.pageSize),
      loading: false
    })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevclick = async () => {
    this.setState({ page: this.state.page - 1 })
    this.updateNews();
  }

  handleNextclick = async () => {
    this.setState({ page: this.state.page + 1 })
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d464b5e1f0aa4ad79a615b0729da288b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      totalPages: Math.ceil(parsedData.totalResults / this.props.pageSize),
      loading: false
    })
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{ margin: '35px 0px' }}>News Monks - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="row mx-auto">
            {this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} source={element.source.name} />
              </div>
            })}

          </div>
        </InfiniteScroll>

        <div className="conatiner d-flex justify-content-end">
          <button disabled={this.state.page <= 1} type="button" onClick={this.handlePrevclick} className="btn btn-primary mx-2" >&larr; Previous</button>

          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.handleNextclick} className="btn btn-primary" >Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News

