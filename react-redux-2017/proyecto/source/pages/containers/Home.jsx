import React, { Component } from 'react'
import { Link } from 'react-router'

import Post from '../../posts/containers/Post.jsx'
import Loading from './../../shared/components/Loading.jsx'

import api from './../../api'

class Home extends Component {
  constructor (props) {
    super(props)

    this.handleScroll = this.handleScroll.bind(this)

    this.state = {
      page: 1,
      posts: [],
      loading: true,
    }
  }

  async componentDidMount () {
    const posts = await api.post.getList(this.state.page)
    // debugger

    this.setState({
      posts,
      page: this.state.page + 1,
      loading: false,
    })

    // Despues de que el componente se monte escuchamos el evento scroll en window
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll (event) {
    if (this.state.loading) return null

    const scrolled = window.scrollY
    const viewportHeight = window.innerHeight
    const fullHeight = document.body.clientHeight

    if (!(scrolled + viewportHeight + 300 >= fullHeight)) {
      return null
    }

    this.setState({ loading: true }, async () => {
      try {
        const posts = await api.post.getList(this.state.page)

        this.setState({
          posts: this.state.posts.concat(posts),
          page: this.state.page + 1,
          loading: false,
        })
      } catch (error) {
        console.error(error)
        this.setState({loading: false})
      }
    })
  }

  render () {
    return (
      <section name="home">
        <h1>Home</h1>

        <section>
          {
            this.state.posts.map(post => <Post key={post.id} {...post} />)
          }
          {
            this.state.loading && (
              <Loading />
            )
          }
        </section>
      </section>
    )
  }
}

export default Home
