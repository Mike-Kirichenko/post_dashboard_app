const { REACT_APP_GRAPHQL_ENDPOINT: gqlEndpoint } = process.env;

export const graphqlRequest = async (query, variables = {}) => {
  const token = `Bearer ${localStorage.getItem('token')}`;
  const res = await fetch(gqlEndpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json', Authorization: token },
    body: JSON.stringify({ query, variables }),
  });
  const resBody = await res.json();
  if (resBody.errors) {
    const message = resBody.errors.map((error) => error.message).join('\n');
    throw new Error(message);
  }
  return resBody.data;
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
            user {
               firstName
               lastName
            }
          }
        qty
      }
  }`,
    variables
  );
  return posts;
};

export const deletePosts = async (postIds, query) => {
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
              user {
                  firstName
                  lastName
              }
          },
          qty
          activePage
      }
  }`,
    postIds,
    query
  );
  return withoutDeleted;
};
