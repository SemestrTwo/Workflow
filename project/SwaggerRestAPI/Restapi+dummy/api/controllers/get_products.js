'use strict';

var util = require('util');
var dummyjson = require('dummy-json')
var jstoxml = require('jstoxml')
var o2x = require('object-to-xml')



var tourSchema = '{\
  "tourname" : "{{tourname}}",\
  "time" : "start: {{date "2015-06-01" "2015-06-30"}} done: {{date "2015-07-01" "2015-08-30"}}",\
  "citis" : [\
    {\
    "cityname" : "{{city}}",\
    "comments" : "{{lorem 5}}",\
    "photos" : [\
      {\
      "photo1" : "{{ipv6}}",\
      "photo2" : "{{ipv6}}",\
      "photo3" : "{{ipv6}}"\
    }\
  ]}\
]}';


module.exports.getTourByName = function getUser(req, res, next) {
  var id = req.swagger.params.tourname.value;
  var tourname = id;

  var tour = {};
  tour['application/json'] =
    JSON.parse(dummyjson.parse(tourSchema, {
      mockdata: {
        "tourname": tourname
      }
    }));

  if (Object.keys(tour).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.json(tour[Object.keys(tour)[0]]);
  } else {
    res.end();
  }
}



var cityname = '{\
  "" : [\
    {\
    "cityname" : "{{cityname}}",\
    "comments" : "{{lorem 5}}",\
    "photos" : [\
      {\
      "photo1" : "{{ipv6}}",\
      "photo2" : "{{ipv6}}",\
      "photo3" : "{{ipv6}}",\
      "photo4" : "{{ipv6}}",\
      "photo5" : "{{ipv6}}",\
      "photo6" : "{{ipv6}}",\
      "photo7" : "{{ipv6}}",\
      "photo8" : "{{ipv6}}",\
      "photo9" : "{{ipv6}}"\
    }\
]}\
]}';
var citynames = '[\
  {{#repeat 1}} \
  ' + cityname + '\
  {{/repeat}}\
]';

module.exports.GetPoint = function getreccourse(req, res, next) {
  var id = req.swagger.params.citiesname.value;
  var cityname = id;

  var courses = {};
  courses['application/json'] =
  JSON.parse(dummyjson.parse(citynames, {
    mockdata: {
      "cityname": cityname
    }
  }));

  if (Object.keys(courses).length > 0) {

    res.setHeader('Content-Type', 'application/json');
    res.json(courses[Object.keys(courses)[0]]);
  } else {
    res.end();
  }
}