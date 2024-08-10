// $(document).ready(function(){
//     $('#searchUser').on('keyup',function(e){
// let username=e.target.value;  
// $.ajax({
//             url: 'https://api.github.com/users/' + username,
//             data: {
//               client_id: 'Ov23liV3r0IsPaanshOV',
//               client_secret: '033737bca9fc67c5fd434f3f3c1fdca3177f0293'
//             }
//   }).done(function(user){
//     console.log(user);


//   });
// });
// });


$(document).ready(function() {
    $('#searchUser').on('keyup', function(e) {
      let username = e.target.value;
  
      // Make request to Github
      $.ajax({
        url: 'https://api.github.com/users/' + username,
        data: {
          client_id: 'Ov23liV3r0IsPaanshOV',
          client_secret: '033737bca9fc67c5fd434f3f3c1fdca3177f0293'
        }
      }).done(function(user) {
        $.ajax({
          url: 'https://api.github.com/users/' + username + '/repos',
          data: {
            client_id: 'Ov23liV3r0IsPaanshOV',
            client_secret: '033737bca9fc67c5fd434f3f3c1fdca3177f0293',
            sort: 'created: asc',
            per_page: 5
          }
        }).done(function(repos) {
          // Clear previous repos
          $('#repos').empty();
  
          $.each(repos, function(index, repo) {
            $('#repos').append(`
              <div class="card mb-3">
                <div class="row no-gutters">
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${repo.name}</h5>
                      <p class="card-text">${repo.description || 'No description provided'}</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="card-body text-right">
                      <span class="badge bg-dark">Forks: ${repo.forks_count}</span>
                      <span class="badge bg-success">Watchers: ${repo.watchers_count}</span>
                      <span class="badge bg-info">Stars: ${repo.stargazers_count}</span>
                      <br><br>
                      <a href="${repo.html_url}" target="_blank" class="btn btn-dark btn-sm">Repo Page</a>
                    </div>
                  </div>
                </div>
              </div>
            `);
          });
        });
  
        $('#profile').html(`
          <div class="card border-dark mb-3" style="max-width: 100rem;">
            <div class="card-header"><h3>${user.name || 'No name provided'}</h3></div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-3">
                  <img class="img-thumbnail avatar" src="${user.avatar_url}" alt="${user.name}">
                  <a target="_blank" class="btn btn-dark btn-block mt-2" href="${user.html_url}">View Profile</a>
                </div>
                <div class="col-md-9">
                  <span class="badge bg-dark">Public Repos: ${user.public_repos}</span>
                  <span class="badge bg-dark">Public Gists: ${user.public_gists}</span>
                  <span class="badge bg-dark">Followers: ${user.followers}</span>
                  <span class="badge bg-dark">Following: ${user.following}</span>
                  <br><br>
                  <ul class="list-group">
                    <li class="list-group-item border border-thick border-dark mb-2 bg-dark-subtle">Company: ${user.company || 'Not available'}</li>
                    <li class="list-group-item border border-thick border-dark mb-2 bg-dark-subtle">Website/blog: <a href="${user.blog}" target="_blank">${user.blog || 'Not available'}</a></li>
                    <li class="list-group-item border border-thick border-dark mb-2 bg-dark-subtle">Location: ${user.location || 'Not available'}</li>
                    <li class="list-group-item border border-thick border-dark mb-2 bg-dark-subtle">Member Since: ${new Date(user.created_at).toLocaleDateString()}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <h3 class="page-header">Latest Repos</h3>
          <div id="repos"></div>
        `);
      });
    });
  });
  