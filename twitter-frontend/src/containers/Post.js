import React, { Component } from 'react'

class Post extends Component {
    state = {
        like_count: 0
    };
    
    render() {
        const duration = Date.now() - new Date(this.props.created_date);
        let spand_time_stamp = "";
        const calc = (dur, denominator) => {
            return Math.floor(dur / denominator);
        }
        if (duration < 1000 * 60) {
            spand_time_stamp = `${calc(duration, 1000)}초 전`;
        } else if (duration < 1000 * 60 * 60) {
            spand_time_stamp = `${calc(duration, 1000 * 60)}분 전`;
        } else if (duration < 1000 * 60 * 60 * 24) {
            spand_time_stamp = `${calc(duration, 1000 * 60 * 60)}시간 전`;
        } else {
            spand_time_stamp = `${calc(duration, 1000 * 60 * 60 * 24)}일 전`;
        }
        const days = duration / (1000 * 3600 * 24);
        const hours = days / 24;

        console.log(days);

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
                    <spawn className="footer-item time-spand-stamp">{spand_time_stamp}</spawn>
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