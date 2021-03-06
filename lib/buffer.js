//http://stackoverflow.com/questions/839899/how-do-i-calculate-a-point-on-a-circles-circumference
//radians = degrees * (pi/180)

// https://github.com/bjornharrtell/jsts/blob/master/examples/buffer.html

var _ = require('lodash'),
    jsts = require('jsts')
var t = {}
t.featurecollection = require('./featurecollection')
t.polygon = require('./polygon')

module.exports = function(feature, radius, units, union, done){
  switch(units){
    case 'miles':
      radius = radius / 69.047
      break
    case 'kilometers':
      radius = radius / 111.12
      break
    case 'degrees':
      break
  }
  
  var reader = new jsts.io.GeoJSONReader()
  var geom = reader.read(JSON.stringify(feature.geometry))
  var buffered = geom.buffer(radius);
  var parser = new jsts.io.GeoJSONParser()
  buffered = parser.write(buffered)

  buffered = t.featurecollection([t.polygon(buffered.coordinates)])
  done(null, buffered)
}