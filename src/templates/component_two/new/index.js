const inflection = require('inflection')

module.exports = {
  params: ({ args }) => {
    return {
      cap: inflection.capitalize(args.name),
      upp: args.name.toUpperCase(),
      cam: inflection.camelize(args.name),
      lcam: inflection.camelize(args.name, true),
      upp_und: inflection.underscore(args.name).toUpperCase(),
      und: inflection.underscore(args.name)
     }
  }
};
