// "use client";
// import React, { useState } from "react";

// const page = () => {
//   const [counter, setCounter] = useState(100);
//   const [data, setData] = useState([]);

//   const getData = async () => {
//     try {
//       const res = await fetch("https://swapi.dev/api/people");
//       const resData = await res.json();
//       setData(resData.results);
//       console.log(resData);
//       console.log(resData.results);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   getData();
//   return (
//     <div>
//       {counter}
//       <button onClick={() => setCounter(counter + 1)}>increment</button>
//       <button onClick={() => setCounter(counter - 1)}> decrease </button>
//       {data?.map((dat) => {
//         return (
//           <div key={dat.height}>
//             <p>{dat.name}</p>
//             <p>{dat.hair_color}</p>
//             <p>{dat.eye_color}</p>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default page;

//   const obj = {
//     id: 1,
//     name: "john",
//   };
//   const { id, name } = obj;
//   //   console.log(obj.name);
//   console.log(name);

// "use client";
// import Link from "next/link";
// import React, { useState } from "react";

// const page = () => {
//   const [post, setPost] = useState([]);
//   const getData = async () => {
//     const data = await fetch("https://jsonplaceholder.typicode.com/posts");
//     const resData = await data.json();
//     setPost(resData);
//     console.log(resData);
//   };

//   return (
//     <div>
//       <button onClick={getData}>click</button>
//       {post.map((data) => {
//         return (
//           <div key={data.id}>
//             <p>{data.id}</p>
//             <p>{data.userId}</p>
//             <p>{data.title}</p>
//             <p>{data.body}</p>
//             <Link href={`/post/${data.id}`}>more info</Link>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default page;
