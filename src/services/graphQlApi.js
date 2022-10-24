const { REACT_APP_GRAPHQL_ENDPOINT: gqlEndpoint } = process.env;

const graphqlRequest = async (query, variables = {}) => {
  try {
    const token = `Bearer ${localStorage.getItem("token")}`;
    const res = await fetch(gqlEndpoint, {
      method: "POST",
      headers: { "content-type": "application/json", Authorization: token },
      body: JSON.stringify({ query, variables }),
    });
    const resBody = await res.json();
    if (resBody.errors) {
      const { code } = resBody.errors[0].extensions;
      throw new Error(code);
    }
    return resBody.data;
  } catch ({ message: status }) {
    if (status === "UNAUTHENTICATED") localStorage.removeItem("token");
  }
};

export const loadPosts = async (variables) => {
  const { posts } = await graphqlRequest(
    `query PostsQuery ($query: QueryObj) {
      posts(query: $query) {
          list{
            id
            title
            text
            createdAt
            img
            category {
               name
            }
          }
        qty
      }
  }`,
    variables
  );
  return posts;
};

export const deletePosts = async (postIdsWithQuery) => {
  const { withoutDeleted } = await graphqlRequest(
    `mutation DeletePosts ($postIds: [ID], $query: QueryObj){
      withoutDeleted: deletePosts(postIds: $postIds, query: $query) {
          list {
              id
              title
              text
              createdAt
              updatedAt
              img
               category {
                  name
              }
          },
          qty
          activePage
      }
  }`,
    postIdsWithQuery
  );
  return withoutDeleted;
};

export const loadCategories = async () => {
  const { categories } = await graphqlRequest(
    `query CategoriesQuery {
      categories {
          id
          name
      }
    }
    `
  );
  return categories;
};

export const addPost = async (postDataWithQuery) => {
  const { query } = postDataWithQuery;
  const { categoryId, title, text, img } = postDataWithQuery.postData;
  const formData = new FormData();
  const operations = {
    query: `mutation CreatePost ($input: CreatePostInput, $file: Upload, $query: QueryObj) {
        afterAdded:createPost(input: $input, file: $file, query: $query) {
          list {
            id 
            title 
            text 
            createdAt 
            category {name} img
          },
          qty
          activePage
        }
      }`,
    variables: {
      input: {
        categoryId,
        title,
        text,
      },
      file: null,
      query,
    },
  };
  formData.append("operations", JSON.stringify(operations));
  const map = { 0: ["variables.file"] };
  formData.append("map", JSON.stringify(map));
  formData.append("0", img);

  try {
    const token = `Bearer ${localStorage.getItem("token")}`;
    const res = await fetch(gqlEndpoint, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    });

    const { data } = await res.json();
    if (data.errors) {
      const { code } = data.errors[0].extensions;
      throw new Error(code);
    }
    return data.afterAdded;
  } catch ({ message: status }) {
    if (status === "UNAUTHENTICATED") localStorage.removeItem("token");
  }
};
