import { Component } from "react";
import { Button } from "../../components/Button";
import { Posts } from "../../components/Posts";
import { loadPosts } from "../../utils/load-posts";
import "./styles.css";

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    
    posts.push(...nextPosts)

    this.setState({posts, page: nextPage})
  };

  render() {
    const { posts, page, postsPerPage, allPosts } = this.state;
    const isMorePostsToLoad = page + postsPerPage >= allPosts.length;
    return (
      <div className="container">
        <Posts posts={posts} />
        <div className="button-container">
          <Button disabled={isMorePostsToLoad} text="Load more posts" handleMorePosts={this.loadMorePosts} />
        </div>
      </div>
    );
  }
}

export default Home;
