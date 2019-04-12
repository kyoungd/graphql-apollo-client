import ApolloBost, { gql } from 'apollo-boost';

const client = new ApolloBost({
  uri: "http://localhost:4000"
});

const getUsers = gql`
  query {
    users (orderBy: createdAt_ASC) {
      id
      name
      email
      posts {
        id
        title
        published
      }
    }
  }
`

client.query({
  query: getUsers
}).then((result) => {
  let html='';
  result.data.users.forEach((user) => {
    html += `
      <div>
        <h3>${user.name}</h3>
      </div>
    `
  })
  document.getElementById('users').innerHTML = html;
  console.log(result.data)
})

const getPosts = gql`
  query {
    posts (orderBy: title_ASC) {
      id
      title
      body
      published
    }
  }
`

client.query({
  query: getPosts
}).then(result => {
  let html = '';
  result.data.posts.forEach(post => {
    html += `
      <div>
        <h3>${post.title}</h3>
      </div>
    `
  });
  document.getElementById('posts').innerHTML = html;
});
