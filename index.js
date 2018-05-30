const express = require('express')
const app = express()
var faker = require('faker')


function generatetour(param) {
  var tour = []

  for (var id = 1; id <= 1; id++) {
    var tourname = param
    var timestart = faker.date.recent()
    var timefinish = faker.date.recent()
    var comment = faker.random.words(num = 3, supplemental = false)

    var photos = []

    for (var i = 0; i < 3; i++){
      var photo = faker.image.imageUrl()
      var cityname = faker.address.city()
      photos.push({
        "cityname": cityname,
        "url": photo
      })
    }

    tour.push({
      "name": tourname,
      "timestart": timestart,
      "timefinish": timefinish,
      "cities": [{
        "comment": comment,
        "photos": photos
      }]
    })
  }

  return {
     tour
  }
}

function generatecities(param) {
  var cities = []
  x`x`
  for (var i = 0; i < 3; i++){
    var photo = faker.image.imageUrl()
    var cityname = faker.address.city()
    photos.push({
      "cityname": cityname,
      "url": photo
    })
  }
}

app.get('/tour/:id', function(req, res) {

  res.send(generatetour(req.params.id));
  //console.log(req.params.id);
});

app.get('/tour/cities/:id', function(req, res) {
  
})

app.listen(3000)