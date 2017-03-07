import React, { Component } from 'react'
import { Link } from 'react-router'

import Post from './../../posts/containers/Post.jsx'
import Loading from './../../shared/components/Loading.jsx'

import api from './../../api'

class Profile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: {},
      posts: [],
      loading: true,
    }
  }

  async componentDidMount () {
    const [user, posts] = await Promise.all([
      await api.user.getSingle(this.props.params.id),
      await api.user.getPosts(this.props.params.id)
    ])
    
    this.setState({
      user,
      posts,
      loading: false
    })
  }

  render () {
    if (this.state.loading) {
      return <Loading />
    }

    return (
      <section name="profile">
        <h2>Profile of {this.state.user.name}</h2>

        <fieldset>
          <legend>Basic info</legend>
          <input type="email" value={this.state.user.email} disabled />
        </fieldset>

        {this.state.user.address && (
          <fieldset>
            <legend>Address</legend>

            <address>
              {this.state.user.address.street} <br />
              {this.state.user.address.suite} <br />
              {this.state.user.address.city} <br />
              {this.state.user.address.zipcode} <br />
            </address>

          </fieldset>
        )}

        <section>
          {
            this.state.posts.map(post => {
              return <Post key={post.id} {...post} user={this.state.user} />
            })
          }
        </section>
      </section>
    )
  }
}

export default Profile
