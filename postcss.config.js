const autoprefixer = require('autoprefixer')

module.exports = {
  plugins:[
    autoprefixer("> 1%","last 2 versions","not ie <= 8")
  ]
}
