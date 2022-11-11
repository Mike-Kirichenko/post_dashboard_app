export const loadPostsQuery = `query PostsQuery ($query: QueryObj) {
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
}`;

export const deletePostsMutation = `mutation DeletePosts ($postIds: [ID], $query: QueryObj){
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
}`;

export const loadCategoriesQuery = `query CategoriesQuery {
  categories {
      id
      name
  }
}
`;

export const createPostMutation = `mutation CreatePost ($input: CreatePostInput, $file: Upload, $query: QueryObj) {
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
}`;
