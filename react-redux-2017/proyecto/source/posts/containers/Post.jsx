import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from './../../actions';

import styles from './Post.css';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    if (!!this.props.user && !!this.props.comments.size > 0) return this.setState({ loading: false });

    await Promise.all([
      await this.props.actions.loadUser(this.props.userId),
      await this.props.actions.loadCommentsForPost(this.props.id),
    ]);

    return this.setState({
      loading: false,
    });
  }

  render() {
    return (
      <article className={styles.post} id={`post-${this.props.id}`}>
        <h2 className={styles.title}>
          <Link className={styles.user} to={`/post/${this.props.id}`}>{this.props.title}</Link>
        </h2>
        <p className={styles.body}>
          {this.props.body}
        </p>
        {!this.state.loading && (
          <div className={styles.meta}>
            <Link className={styles.user} to={`/user/${this.props.user.get('id')}`}>
              {this.props.user.get('name')}
            </Link>
            <span className={styles.comments}>
              <FormattedMessage
                id="post.meta.comments"
                values={{
                  amount: this.props.comments.size,
                }}
              />
            </span>
            <Link to={`/post/${this.props.id}`}>
              <FormattedMessage id="post.meta.readMore" />
            </Link>
          </div>
        )}
      </article>
    );
  }
}

Post.propTypes = {
  id: PropTypes.number,
  userId: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  comments: PropTypes.objectOf(PropTypes.object),
  actions: PropTypes.objectOf(PropTypes.func),
  size: PropTypes.number,
  get: PropTypes.func,
};

function mapStateToProps(state, props) {
  return {
    comments: state.get('comments').filter(comment => comment.get('postId') === props.id),
    user: state.get('users').get(props.userId),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
