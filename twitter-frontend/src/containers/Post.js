import React, { Component } from 'react'

class Post extends Component {
    state = {
        like_count: 0
    };

    componentDidMount() {
        this.setState({
            like_count: this.props.like_count
        });
    }
    
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

        return (
            <div className={this.props.isRef ? "ref-post" : "post"}>
                <div className="title">
                    <span>{this.props.author}</span>
                </div>
                <div className="content">
                    <p>{this.props.content}</p>
                    {this.props.reference != null && 
                        <Post author={this.props.reference.author.username} content={this.props.reference.content} 
                            created_date={this.props.reference.created_date} 
                            like_count={this.props.reference.like_count}
                            isRef={true} /> 
                    }
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

Post.defaultProps = {
    isRef: false
};

export default Post;