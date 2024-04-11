import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl , source} = this.props;
        return (
            <div className='my-3'>
                <div className="card" >
                    <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ right: '-10px' ,top : '-10px', zIndex : '1'  }}>
                        {source}</span>
                    <img src={!imageUrl ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEzE7jsd4pmXTNj0QQLmuXkf-swTYxbloaEXw1vegtFQ&s" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}..</p>
                        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>

            </div>
        )
    }
}

export default NewsItem
