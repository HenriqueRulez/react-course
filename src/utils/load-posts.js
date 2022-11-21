export const loadPosts = async () => {
  const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photoResponse = fetch('https://jsonplaceholder.typicode.com/photos')

    const [posts, photos] = await Promise.all([postsResponse, photoResponse]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();

    //Zip menor array (posts) com maior array (photos)
    const postsAndPhotos = postsJson.map((posts,index) => {
      return { ...posts, cover: photosJson[index].url}
    })

return postsAndPhotos;
}