const dummy = (blogs) => 1

const totalLikes = (bloglist) => {
    if(bloglist.length === 0) return 0
    if(bloglist.length === 1) return bloglist[0].likes
    
    const reducer = (sum, item) => sum + item.likes
    return bloglist.reduce(reducer, 0)
}
  
module.exports = {
    dummy,
    totalLikes
}