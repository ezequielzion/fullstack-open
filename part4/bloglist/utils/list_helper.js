const _ = require('lodash');

const dummy = (blogs) => 1

const totalLikes = (bloglist) => {
    if(bloglist.length === 0) return 0
    if(bloglist.length === 1) return bloglist[0].likes
    
    const reducer = (sum, item) => sum + item.likes
    return bloglist.reduce(reducer, 0)
}

const favoriteBlog = bloglist => {
    if(bloglist.length === 0) return {}

    let maxLikes = Number.MIN_SAFE_INTEGER
    let blogWithMostLikes = {
        title: '',
        author: '',
        likes: 0
    }

    bloglist.map(blog => {
        if(blog.likes > maxLikes) {
            maxLikes = blog.likes

            blogWithMostLikes.title = blog.title 
            blogWithMostLikes.author = blog.author 
            blogWithMostLikes.likes = blog.likes 
        }
    })

    return blogWithMostLikes
}

const mostBlogs = bloglist => {
    if(bloglist.length === 0) return {} 
    
    let arrayOfAuthors = []
    const authorAlreadyInArray = name => arrayOfAuthors.some(obj => {
        return obj.author === name
    })

    bloglist.map(blog => {
        const exists = authorAlreadyInArray(blog.author)
        if(!exists){
            arrayOfAuthors.push({
                author: blog.author,
                blogs: 1
            })
        } else {
            arrayOfAuthors = arrayOfAuthors.map(obj => {
                if(obj.author === blog.author){
                    obj = {
                        ...obj,
                        blogs: obj.blogs + 1
                    }
                }
                return obj
            })
        }
    })

    let authorWithMostBlogs
    let maxAmountOfBlogs = Number.MIN_SAFE_INTEGER
    arrayOfAuthors.map(author => {
        if(author.blogs > maxAmountOfBlogs) {
            maxAmountOfBlogs = author.blogs
            authorWithMostBlogs = author
        }
    })

    return authorWithMostBlogs
}

const mostBlogsLodash = bloglist => {
    //My previous implementation was hideous so I wanted to try to do it with lodash
    if(bloglist.length === 0) return {}
    
    const groupedBlogs = _.groupBy(bloglist, 'author');

    const objEntries = Object.entries(groupedBlogs)

    const mostBlogsGroup = _.maxBy(objEntries, (group) => group[1].length);

    const authorWithMostBlogs = mostBlogsGroup[0]
    const amountOfBlogs = mostBlogsGroup[1].length

    return {
        author: authorWithMostBlogs,
        blogs: amountOfBlogs
    }
}

const mostLikes = bloglist => {
    if(bloglist.length === 0) return {}

    const groupedBlogs = _.groupBy(bloglist, 'author');

    const objEntries = Object.entries(groupedBlogs)
    const mostLikesGroup = _.maxBy(objEntries, (group) => _.sumBy(group[1], blog => blog.likes));

    const autorWithMostLikes = mostLikesGroup[0]
    const mostLikes = _.sumBy(mostLikesGroup[1], blog => blog.likes)

    return {
        author: autorWithMostLikes,
        likes: mostLikes
    }
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostBlogsLodash,
    mostLikes
}