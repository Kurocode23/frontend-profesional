import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from './../../actions';

import Post from './../../posts/containers/Post';
import Loading from './../../shared/components/Loading';

import styles from './Page.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.initialFetch();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }


  async initialFetch() {
    await this.props.actions.postsNextPage();

    this.setState({ loading: false });
  }

  handleScroll() {
    if (this.state.loading) return null;

    const scrolled = window.scrollY;
    const viewportHeight = window.innerHeight;
    const fullHeight = document.body.clientHeight;

    if (!(scrolled + viewportHeight + 300) >= fullHeight) {
      return null;
    }

    return this.setState({
      loading: true,
    }, async () => {
      try {
        await this.props.actions.postsNextPage();
      } catch (error) {
        console.error(error);
      }
    });
  }

  render() {
    return (
      <section className={styles.section} name="Home">
        <section className={styles.list}>
          {
            this.props.posts
              .map(post => <Post key={post.get('id')} {...post.toJS()} />)
              .toArray()
          }

          {this.state.loading && (
            <Loading />
          )}
        </section>
      </section>
    );
  }
}

Home.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
  posts: PropTypes.arrayOf(PropTypes.object),
  page: PropTypes.number,
  get: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    posts: state.get('posts').get('entities'),
    page: state.get('posts').get('page'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
