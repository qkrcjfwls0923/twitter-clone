import React, { Component } from 'react'

class Post extends Component {
    state = {
        like_count: 0
    };
    
    render() {
        const passed_date = "1일 전";

        return (
            <div className="post">
                <div className="title">
                    <span>{this.props.author}</span>
                </div>
                <div className="content">
                    <p>{this.props.content}</p>
                    
                </div>
                <hr></hr>
                <div className="footer text-right">
                    <spawn className="footer-item time-spand-stamp">{passed_date}</spawn>
                    <span className="footer-item">
                        <a href="retweet?post-id=7">
                            <i className="fas fa-retweet"></i>
                        </a>
                    </span>
                    <span className="footer-item">
                        <a href="">
                            <i className="far fa-thumbs-up big-icon"></i>
                            <spawn>{this.state.like_count}</spawn>
                        </a>
                    </span>
                </div>
            </div>
        );
    }
}

export default Post;