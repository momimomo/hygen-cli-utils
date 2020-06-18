module.exports = {
  templates: `${__dirname}/_templates`,
  helpers: {
    cap: s => h.inflection.capitalize(s),
    upp: s => s.toUpperCase(),
    cam: s => h.inflection.camelize(s),
    und: s => h.inflection.underscore(s),
    relative: (from, to) => path.relative(from, to),
    src: ()=> __dirname
  }
}
