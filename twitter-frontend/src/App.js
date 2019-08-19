import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { receiveValue } from './actions';
import Post from './containers/Post'

import './App.css';

class App extends Component  {
    componentDidMount() {
        let getPosts = () => {
            axios.get("http://127.0.0.1:8000/post").then(response => {
                this.props.onReceive(response.data);
            });
        }

        getPosts();
    }

    render() {
        console.log(this.props);
        const posts = this.props.posts.map((post) => {
            return (
                <Post author={post.author.username} content={post.content} created_date={post.created_date} />
            )
        })
        return (
            <div className="container">
                {posts}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onReceive: (value) => {
            dispatch(receiveValue(value));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
