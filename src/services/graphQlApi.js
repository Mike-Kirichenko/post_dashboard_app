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
  return resBody.data.posts;
};

export const loadPosts = async (variables) => {
  const posts = await graphqlRequest(
    `query PostsQuery ($page: Int, $limit: Int, $dateFrom: String, $dateTo: String) {
      posts(page: $page, limit: $limit, dateFrom: $dateFrom, dateTo: $dateTo) {
          list{
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
          }
        qty
      }
  }`,
    variables
  );
  return posts;
};
