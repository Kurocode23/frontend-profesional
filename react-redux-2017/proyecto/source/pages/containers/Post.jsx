import React, { Component } from 'react'
import { Link } from 'react-router'

import PostBody from './../../posts/containers/Post.jsx'
import Comment from './../../comments/components/Comment.jsx'

import Loading from './../../shared/components/Loading.jsx'

import api from './../../api'

class Post extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      user: {},
      post: {},
      comments: [],
    }
  }

  async componentDidMount () {
    const [post, comments] = await Promise.all([
      api.post.getSingle(this.props.params.id),
      api.post.getComments(this.props.params.id)
    ])

    const user = await api.user.getSingle(post.userId)

    this.setState({
      loading: false,
      post,
      user,
      comments,
    })
  }
  
  render () {
    if (this.state.loading) {
      return <Loading />
    }

    return (
      <section name="post">
        <PostBody 
          {...this.state.post}
          user={this.state.user}
          comments={this.state.comments}
        />

        <section>
          {
            this.state.comments.map(comment => {
              return <Comment key={comment.id} {...comment} />
            })
          }
        </section>

      </section>
    )
  }
}

export default Post
