using TwitterAppWebApi.Models;
using TwitterAppWebApi.DTOs.Account;

namespace TwitterAppWebApi.Mappers
{
    public static class CommentMapper
    {
        public static CommentDto toCommentDto(this Comment commentModel)
        {
            return new CommentDto
            {
                Id = commentModel.Id,
                Content = commentModel.Content,
                CreatOn = commentModel.CreatOn,
                CreatedBy = commentModel.AppUser.UserName,
                PostId = commentModel.PostId
            };
        }

        public static Comment toCommentFromCreateDto(this CreateCommentDto commentModel, int postId)
        {
            return new Comment
            {
                Content = commentModel.Content,
                PostId = postId
            };
        }

        public static Comment toCommentFromUpdateDto(this UpdateCommentDto commentModel)
        {
            return new Comment
            {
                Content = commentModel.Content
            };
        }
    }
}
