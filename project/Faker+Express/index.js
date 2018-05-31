const express = require('express')
const app = express()
var faker = require('faker')


function generatetour(param) {
  var tour = []

  for (var id = 1; id <= 1; id++) {
    var tourname = param
    var time = "START: " + faker.date.recent() + "   done: " + faker.date.recent()
    var comment = faker.random.words(num = 3, supplemental = false)
    var cityname = faker.address.country()

    var photos = []

    for (var i = 0; i < 3; i++) {
      var photo = faker.internet.url()
      photos.push({
        "url": photo
      })
    }

    tour.push({
      "name": tourname,
      "time": time,
      "cities": [{
          "cityname": cityname,
          "comment": comment,
          "photos": photos
        },
        {
          "cityname": faker.address.country(),
          "comment": faker.random.words(num = 3, supplemental = false),
          "photos": photos
        }
      ]
    })
  }

  return {
    tour
  }
}

function generatecities(param) {

  var city = []
  for (var id = 1; id <= 1; id++) {
    var cityname = param
    var comment = faker.random.words(num = 23, supplemental = false)
    var photos = []

    for (var i = 0; i < 9; i++) {
      var photo = faker.internet.url()
      photos.push({
        "url": photo
      })
    }

    city.push({
      "cityname": cityname,
      "comment": comment,
      "photos": photos
    })
  }

  return {
    city
  }
}


app.get('/tour/:tourname', function(req, res) {

  res.send(generatetour(req.params.tourname));

});


app.get('/tour/:tourname/:cityname', function(req, res) {
  res.send(generatecities(req.params.cityname));
  //console.log(req.params.tourname);
})

app.listen(4000)
