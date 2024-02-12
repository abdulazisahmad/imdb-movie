$('#inputSearch').on('click', function () {
  $(this).focus();
});
function searchMovie(res) {
  $('#MovieList').html('');
  $.ajax({
    url: 'https://omdbapi.com',
    type: 'get',
    dataType: 'json',
    data: {
      apikey: 'f927dde2',
      s: res,
    },
    success: function (result) {
      if (result.Response == 'True') {
        let movie = result.Search;
        $.each(movie, function (i, data) {
          $('#MovieList').append(
            `<div class="col-6 col-md-4 col-lg-3 column">
                <div class="card border-0 overflow-hidden h-100">
                    <img class="w-100 h-100" src="${data.Poster}" />
                    <div class="card-body" style="background-color: #ccd6f6; color: #020c1b">
                        <h5 class="card-title">${data.Title}</h5>
                        <h6 class="card-subtitle mb-2">
                            <strong>Year : </strong>${data.Year}
                        </h6>
                        <a href="#"  style="color: #020c1b" class="card-link detaill" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${data.imdbID}">Detail</a>
                    </div>
                </div>
              </div>`);
        });
        $('#inputSearch').blur();
      } else {
        let html = `<div class="col py-5"><h5 class="text-center text-white">${result.Error}</h5></div>`;
        $('#MovieList').html(html);
      }
    },
  });
}

// onClick Button
$('#btnMovie').on('click', function () {
  let res = $('#inputSearch').val();
  if (res == '') { searchMovie('naruto'); }
  else { searchMovie(res); }
});

// onEnter
$('#inputSearch').on('keyup', function (e) {
  if (e.keyCode === 13) {
    let res = $('#inputSearch').val();
    if (res == '') { searchMovie('naruto'); }
    else { searchMovie(res); }
  }
});
// window first load
window.addEventListener('load', function () {
  $('#inputSearch').val('');
  searchMovie('naruto');
});

// Modall
$('#MovieList').on('click', '.detaill', function (e) {
  e.preventDefault();
  let dataId = $(this).data('id');
  $.ajax({
    url: 'https://omdbapi.com/',
    type: 'get',
    dataType: 'json',
    data: {
      apikey: 'f927dde2',
      i: dataId,
    },
    success: function (movie) {
      if (movie.Response == 'True') {
        $('.modal .modal-title').html(movie.Title);
        $('.modal-body').html(
          `
        <div class="container-fluid">
            <div class="row g-3">
                <div class="col-12 col-md-4 ps-0">
                    <img src="${movie.Poster}" class="img-fluid w-100" />
                </div>
                <div class=" col-12 col-md-8 ps-0">
                    <ul class="list-group">
                        <li class="list-group-item bg-transparent border-0 ps-0 ps-lg-3" style="color: #fff"><strong>Release : </strong>${movie.Released}</li>
                        <li class="list-group-item bg-transparent border-0 ps-0 ps-lg-3" style="color: #fff"><strong>Genre : </strong>${movie.Genre}</li>
                        <li class="list-group-item bg-transparent border-0 ps-0 ps-lg-3" style="color: #fff"><strong>Directors : </strong>${movie.Director}</li>
                        <li class="list-group-item bg-transparent border-0 ps-0 ps-lg-3" style="color: #fff"><strong>Actors : </strong>${movie.Actors}</li>
                    </ul>
                </div>
            </div>
        </div>`
        );
      }
    },
  });
});

// ketika modal di close
$('.modal').on('hidden.bs.modal', function () {
  $('.modal .modal-title').html('');
  $('.modal-body').html('');
});

const resizeFunc = () => {
  if (window.innerWidth < 768) {
    let icon = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                    <g fill-opacity="0" fill="#020c1b" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,256v-256h256v256z" id="bgRectangle"></path></g><g fill="#ffc200" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(2,2)"><path d="M56.59961,21.59961c-22.5,0 -40.79883,18.50117 -40.79883,41.20117c0,22.8 18.29883,41.19922 40.79883,41.19922c10.3,0 19.70039,-3.90078 26.90039,-10.30078l2.30078,2.30078l-2.10156,2.19922c-1.2,1.2 -1.2,3.10078 0,4.30078l18,18.19922c0.6,0.6 1.30156,0.90039 2.10156,0.90039c0.8,0 1.59961,-0.30039 2.09961,-0.90039l8,-8.09961c1.1,-1.2 1.10039,-3.09922 -0.09961,-4.19922l-18,-18.20117c-0.6,-0.6 -1.30156,-0.89844 -2.10156,-0.89844c-0.8,0 -1.59961,0.29844 -2.09961,0.89844l-2.09961,2.20117l-2.30078,-2.40039c6.3,-7.3 10.20117,-16.79922 10.20117,-27.19922c0,-22.7 -18.30078,-41.20117 -40.80078,-41.20117zM56.59961,27.69922c19.2,0 34.80078,15.80117 34.80078,35.20117c0,19.4 -15.60078,35.09961 -34.80078,35.09961c-19.2,0 -34.79883,-15.69961 -34.79883,-35.09961c0,-19.4 15.59883,-35.20117 34.79883,-35.20117zM56.69922,40.19922c-9.5,0 -17.99922,6.10156 -21.19922,15.10156c-0.5,1.3 0.19961,2.89883 1.59961,3.29883c0.3,0.1 0.60039,0.20117 0.90039,0.20117c1.1,0 2.1,-0.70078 2.5,-1.80078c2.4,-6.9 8.99922,-11.59961 16.19922,-11.59961c1.4,0 2.60156,-1.19961 2.60156,-2.59961c0,-1.4 -1.20156,-2.60156 -2.60156,-2.60156zM37.69922,64.90039c-1.4,0 -2.59961,1.09961 -2.59961,2.59961v0.40039c0.1,1.4 1.20117,2.59961 2.70117,2.59961c1.4,0 2.59961,-1.19961 2.59961,-2.59961v-0.30078c0,-1.5 -1.09961,-2.69922 -2.59961,-2.69922zM93.80078,96.59961l13.79883,14l-3.79883,3.80078l-13.80078,-14z"></path></g></g>
                </svg>`;
    $('nav .navbar-brand').addClass('w-25');
    $('nav .d-flex').addClass('w-60');
    $('#btnMovie').html(icon);
  } else {
    $('nav .navbar-brand').removeClass('w-25');
    $('nav .d-flex').removeClass('w-60');
    $('#btnMovie').html('Search');
  }
};
resizeFunc();
window.addEventListener('resize', resizeFunc);
