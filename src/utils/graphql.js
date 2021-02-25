import gql from 'graphql-tag';

export const GET_POSTS = gql`
  query posts($offset: Int, $limit: Int) {
    posts(pagination : {offset: $offset, limit: $limit}) {
      id
      title
      content
      image
      createdAt
    }
  }
`;
