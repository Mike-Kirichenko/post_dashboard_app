import {
  loadPostsQuery,
  loadCategoriesQuery,
  deletePostsMutation,
  createPostMutation,
} from "./graphQLQueryStrings";

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
  const { posts } = await graphqlRequest(loadPostsQuery, variables);
  return posts;
};

export const deletePosts = async (postIdsWithQuery) => {
  const { withoutDeleted } = await graphqlRequest(
    deletePostsMutation,
    postIdsWithQuery
  );
  return withoutDeleted;
};

export const loadCategories = async () => {
  const { categories } = await graphqlRequest(loadCategoriesQuery);
  return categories;
};

export const addPost = async (postDataWithQuery) => {
  const { query } = postDataWithQuery;
  const { categoryId, title, text, img } = postDataWithQuery.postData;
  const formData = new FormData();
  const operations = {
    query: createPostMutation,
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
