const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listWithManyBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  },
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    test('when list is empty, return 0', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })

    test('many blogs', () => {
        const result = listHelper.totalLikes(listWithManyBlogs)
        expect(result).toBe(36)
    })
})

describe('favorite blog', () => {
  test('when list is empty, return empty', () => {
      const result = listHelper.favoriteBlog([])
      expect(result).toEqual({})
  })

  test('one blog list', () => {
    const expectedResult = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(expectedResult)
  })

  test('many blogs list', () => {
      const expectedResult = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
      }
      const result = listHelper.favoriteBlog(listWithManyBlogs)
      expect(result).toEqual(expectedResult)
  })
})

describe('most blogs', () => {
  test('when list is empty, return empty', () => {
      const result = listHelper.mostBlogs([])
      expect(result).toEqual({})
  })

  test('one blog list', () => {
    const expectedResult = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    }
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual(expectedResult)
  })

  test('many blogs list', () => {
      const expectedResult = {
        author: "Robert C. Martin",
        blogs: 3,
      }
      const result = listHelper.mostBlogs(listWithManyBlogs)
      expect(result).toEqual(expectedResult)
  })
})

describe('most blogs using lodash', () => {
  test('when list is empty, return empty', () => {
        const result = listHelper.mostBlogsLodash([])
        expect(result).toEqual({})
  })

  test('one blog list', () => {
    const expectedResult = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    }
    const result = listHelper.mostBlogsLodash(listWithOneBlog)
    expect(result).toEqual(expectedResult)
  })

  test('many blogs list', () => {
      const expectedResult = {
        author: "Robert C. Martin",
        blogs: 3,
      }
      const result = listHelper.mostBlogsLodash(listWithManyBlogs)
      expect(result).toEqual(expectedResult)
  })
})

describe('most likes', () => {
  test('when list is empty, return empty', () => {
        const result = listHelper.mostLikes([])
        expect(result).toEqual({})
  })

  test('one blog list', () => {
    const expectedResult = {
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual(expectedResult)
  })

  test('many blogs list', () => {
      const expectedResult = {
        author: "Edsger W. Dijkstra",
        likes: 17
      }
      const result = listHelper.mostLikes(listWithManyBlogs)
      expect(result).toEqual(expectedResult)
  })
})