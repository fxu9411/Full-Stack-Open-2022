const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (prev, current) => {
    return prev.likes > current.likes ? prev : current;
  };

  return blogs.length === 0 ? undefined : blogs.reduce(reducer, 0);
};

const mostBlogs = (blogs) => {
  const count = _.countBy(blogs, "author");
  const result = { author: undefined, blogs: undefined };
  var maxBlogs = 0;
  _.forEach(count, function (value, key) {
    if (value > maxBlogs) {
      maxBlogs = value;
      result.author = key;
      result.blogs = value;
    }
  });
  return result;
};

const mostLikes = (blogs) => {
  var list = [];
  blogs.forEach((element) => {
    var obj = {};
    obj["author"] = element.author;
    obj["likes"] = element.likes;
    list.push(obj);
  });
  var output = _(list)
    .groupBy("author")
    .map((objs, key) => ({
      author: key,
      likes: _.sumBy(objs, "likes"),
    }))
    .value();

  return _.maxBy(output, "likes");
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
