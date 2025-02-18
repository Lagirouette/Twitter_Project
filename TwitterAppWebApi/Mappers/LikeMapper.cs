using TwitterAppWebApi.DTOs.Account;
using TwitterAppWebApi.DTOs.Like;
using TwitterAppWebApi.Models;

namespace TwitterAppWebApi.Mappers
{
    public static class LikeMapper
    {
        public static LikeDto toLikeDto(this Like likeModel)
        {
            return new LikeDto
            {
                Id = likeModel.Id,
                LikeBy = likeModel.LikeBy,
                PostId = likeModel.PostId
            };
        }
        public static Like toLikeFromCreateDto(this CreateLikeDto likeModel, int postId)
        {
            return new Like
            {
                PostId = postId
            };
        }

    }
}
