import { PostCard } from "../PostCard";
import "./styles.css";

export const Posts = ({ posts }) => (
   <article className="posts">
    {posts.map((post) => (
      <PostCard
        title={post.title}
        body={post.body}
        id={post.id}
        cover={post.cover}
        key={post.id}
      />
    ))}
  </article>
)

