import { Component } from "react";
import './App.css';

class App extends Component {
  state = {
    posts: []
  }

  componentDidMount(){
    this.loadPosts();
  }

  loadPosts = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photoResponse = fetch('https://jsonplaceholder.typicode.com/photos')

    const [posts, photos] = await Promise.all([postsResponse, photoResponse]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();

    //Zip menor array (posts) com maior array (photos)
    const postsAndPhotos = postsJson.map((posts,index) => {
      return { ...posts, cover: photosJson[index].url}
    })

    this.setState({posts: postsAndPhotos})
  }

  render(){
    const { posts } = this.state
    return(
      <div className="container">
        <article className="posts">
        {posts.map(post => (
          <div className="post">
            <img src={post.cover} alt={post.title} />
            <section key={post.id} className="post-content">
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </section>
          </div>
        ))}
      </article>
      </div>
    )
  }

}

export default App;
