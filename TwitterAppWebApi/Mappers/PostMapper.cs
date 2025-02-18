using TwitterAppWebApi.DTOs.Post;
using TwitterAppWebApi.Models;

namespace TwitterAppWebApi.Mappers
{
    public static class PostMapper
    {
        public static PostDTO toPostDto(this Post postModel)
        {
            return new PostDTO
            {
                Body = postModel.Body,
                CreatedBy = postModel.AppUser.UserName,
                CreatOn = postModel.CreatOn,
                Title = postModel.Title,
            };
        }

        public static Post toPostFromPostCreate(this CreatePostDTO createdPost)
        {
            return new Post
            {
                Title = createdPost.Title,
                Body = createdPost.Body
            };
        }

        public static Post toPostFromUpdatePost(this UpdatePostDTO updatedPost)
        {
            return new Post
            {
                Title = updatedPost.Title,
                Body = updatedPost.Body
            };
        }
    }
}
