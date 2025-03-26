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
                Id = postModel.Id,
                Body = postModel.Body,
                CreatedBy = postModel.AppUser.UserName,
                CreatedByPseudo = postModel.AppUser.Pseudo,
                CreatOn = postModel.CreatOn,
                ImageId = postModel.ImageId
            };
        }

        public static Post toPostFromPostCreate(this CreatePostDTO createdPost)
        {
            return new Post
            {
                Body = createdPost.Body
            };
        }

        public static Post toPostFromUpdatePost(this UpdatePostDTO updatedPost)
        {
            return new Post
            {
                Body = updatedPost.Body
            };
        }
    }
}
