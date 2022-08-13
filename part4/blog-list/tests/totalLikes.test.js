const listHelper = require("../utils/list_helper");

describe("Total likes", () => {
  test("of empty list is zero", () => {
    const blogs = [];
    expect(listHelper.totalLikes(blogs)).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const blogs = [
      {
        title: "Test",
        likes: 200,
      },
    ];
    expect(listHelper.totalLikes(blogs)).toBe(200);
  });

  test("of a bigger list is calculated right", () => {
    const blogs = [
      {
        title: "Test",
        likes: 200,
      },
      {
        title: "Test2",
        likes: 300,
      },
    ];
    expect(listHelper.totalLikes(blogs)).toBe(500);
  });
});
