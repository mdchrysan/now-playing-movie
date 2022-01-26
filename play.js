$(document).ready(function(){
    let req = new XMLHttpRequest()
    let url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=70e6eed62df915f83bd07a7eb0ac0d4e&language=en-US'

    req.open('GET',url,true)
    req.onreadystatechange = function(){
        if(req.readyState != 4 || req.status != 200)
            return;
        let data = JSON.parse(req.responseText)
        showPlaying(data)
    }
    req.onerror = function(){
        alert(req.responseText)
    }
    req.send()

    function showPlaying(data){
        //append data ke listmv (liat nama di json)
        //1. gambar  > src=url+backdrop_path
        //2. judul   > = +title
        //3. tanggal > = +release_date
        //4. ambil id nya utk details
        let i;
        for(i = 0; i < data.results.length; i++){
            $('#listmv').append(`
                <div class="col-md-4 moviecard" style="padding:10px 10px 10px 10px;">
                    <div style="background-color: yellow; border-radius: 10px;" class="card" style="margin:30px -10px;">
                        <img style="border-radius: 10px;" class="card-img-top" src="http://image.tmdb.org/t/p/w500`
                            +data.results[i].backdrop_path+`">
                        <div class="card-body" style="padding:0px">
                            <div style="height:70;">
                                <h4 class="card-title text-center" style="padding:10px 30px 0px 10px">`
                                    +data.results[i].title+`</h4>
                            </div>
                            <h5 class="card-subtitle mb-2 text-center text-muted" style="padding:0px 10px 10px 10px">`
                                +"Release Date: "+data.results[i].release_date+`</h5>
                            <ul class="list-group list-group-flush btnDetail" data-movieid="`
                                +data.results[i].id+`">
                                <li class="list-group-item text-center" 
                                    style="background-color: black; color: yellow; font-size: 12px; border-radius: 10px;">
                                        <a>Details</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `)
        }

        $('.btnDetail').on('click',function(event){
            let req = new XMLHttpRequest()
            let id = $(this).data('movieid');
            let url = 'https://api.themoviedb.org/3/movie/'+id+'?api_key=70e6eed62df915f83bd07a7eb0ac0d4e'

            req.open('GET',url,true)
            req.onreadystatechange = function(){
                if(req.readyState != 4 || req.status != 200)
                    return;

                let data = JSON.parse(req.responseText)
                let producer = ''
                let i;

                for(i = 0; i < data.production_companies.length; i++){
                    producer += data.production_companies[i].name;
                    if(i < data.production_companies.length-1) producer += ', '
                }

                //ambil data ke detailmv dari json
                //1. id       > movieid
                //2. produser > name & production_companies
                //3. gambar   > poster_path
                //4. judul    > title
                //5. tanggal  > release_date
                //6. desc     > overview
                //7. budget   > budget
                //8. produser > producer
                $('#detailmv').html(`
                    <div style="background-color: yellow; padding:10px 10px 10px 10px; border-radius: 10px" class="card">
                        <div class="container" style="padding:10px 10px 10px 10px;">
                            <div class="row">
                                <div class="col-md-4">
                                    <img src="http://image.tmdb.org/t/p/w300`
                                        +data.poster_path+`" style="border-radius: 10px">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body" style="padding:0px">
                                        <strong><h1 class="card-title" style="padding:20px 0px 0px 0px">`
                                            +data.title+`</h1></strong>
                                        <h3 class="card-subtitle mb-2 text-muted" style="padding:0px 0px 10px 0px">`
                                            +"Release Date: "+data.release_date+`</h3>
                                        <h3 class="card-text" style="padding: 0px 20px 0px 0px; text-align: justify;">`
                                            +data.overview+`</h3>
                                        <h3 class="card-text" style="padding: 0px 20px 0px 0px;">Budget : `
                                            +data.budget+` USD</h3>
                                        <h3 class="card-text" style="padding: 0px 20px 0px 0px;">Producers : `
                                            +producer+`</h3>
                                    </div>
                                    <ul class="list-group list-group-flush btnBack col-md-2" style="padding:10px 20px 20px 0px">
                                        <li class="list-group-item text-center" 
                                            style="background-color: black; color: white; border-radius: 10px;">
                                            <a>Back</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
            
                    </div>
                `)
                $('.btnBack').on('click',function(event){
                    $('#detailmv').html('')
                    $('.moviecard').removeClass('d-none')
                })
            }
            req.onerror = function(){
                alert(req.responseText)
            }
            req.send()
            
            $('.moviecard').addClass('d-none')
        })
    }
})