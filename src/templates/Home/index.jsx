import { useEffect, useState, useCallback } from "react";
import { Button } from "../../components/Button";
import { Posts } from "../../components/Posts";
import { SearchBar } from "../../components/SearchBar";
import { loadPosts } from "../../utils/load-posts";
import "./styles.css";



export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const isMorePostsToLoad = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue ? allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase())
    }) : posts;

    // Função de call back, array vazio = array de dependencia, caso a variavel mudar, o useEffect é executado novamente
    //Funciona como um componentDidMount, componentDidUpdate, componentWillUnmount
  

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos)
  }, []);

    useEffect(() => {
      handleLoadPosts(0, postsPerPage);
    }, [handleLoadPosts, postsPerPage])

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

   const handleSearchInput = (e) => {
    const {value} = e.target;
    setSearchValue(value);
  }

  return (
      <div className="container">
        <div className="search-container">
          {!!searchValue && (
          <>
          <h2>Result: {searchValue} | Total: {filteredPosts.length}</h2>
          </>
        )}
        <SearchBar searchValue={searchValue} handleChange={handleSearchInput}/>
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p>Não há posts com o critério de busca</p>
        )}


        <div className="button-container">
          {!searchValue && (
            <Button disabled={isMorePostsToLoad} text="Load more posts" handleMorePosts={loadMorePosts} />
          )}
        </div>
      </div>
    );
}
// class Home2 extends Component {
//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 2,
//     searchValue: ''
//   };

//   async componentDidMount() {
//     await this.loadPosts();
//   }

//   loadPosts = async () => {
//     const { page, postsPerPage } = this.state;
//     const postsAndPhotos = await loadPosts();
//     this.setState({
//       posts: postsAndPhotos.slice(page, postsPerPage),
//       allPosts: postsAndPhotos,
//     });
//   };

//   loadMorePosts = () => {
//     const { page, postsPerPage, allPosts, posts } = this.state;
//     const nextPage = page + postsPerPage;
//     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    
//     posts.push(...nextPosts)

//     this.setState({posts, page: nextPage})
//   };

//   handleSearchInput = (e) => {
//     const {value} = e.target;
//     this.setState({searchValue: value})
//   }

//   render() {
//     const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
//     const isMorePostsToLoad = page + postsPerPage >= allPosts.length;

//     const filteredPosts = !!searchValue ? allPosts.filter(post => {
//       return post.title.toLowerCase().includes(searchValue.toLowerCase())
//     }) : posts;


//     return (
//       <div className="container">
//         <div className="search-container">
//           {!!searchValue && (
//           <>
//           <h2>Result: {searchValue} | Total: {filteredPosts.length}</h2>
//           </>
//         )}
//         <SearchBar searchValue={searchValue} handleChange={this.handleSearchInput}/>
//         </div>

//         {filteredPosts.length > 0 && (
//           <Posts posts={filteredPosts} />
//         )}

//         {filteredPosts.length === 0 && (
//           <p>Não há posts com o critério de busca</p>
//         )}


//         <div className="button-container">
//           {!searchValue && (
//             <Button disabled={isMorePostsToLoad} text="Load more posts" handleMorePosts={this.loadMorePosts} />
//           )}
//         </div>
//       </div>
//     );
//   }
// }

export default Home;
