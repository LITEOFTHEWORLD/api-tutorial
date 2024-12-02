const getData = async (id) => {
  const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const resData = await data.json();
  return resData;
};

const PostPage = async ({ params }) => {
  const { id } = params;
  console.log(id);

  const post = await getData(id);
  console.log(post);

  return (
    <div>
      <p>{post.userId}</p>
      <p>{post.id}</p>
      <p>{post.title}</p>
      <p>{post.body}</p>
    </div>
  );
};

export default PostPage;
