using TwitterAppWebApi.Models;

namespace TwitterAppWebApi.Repository.ImageRepositories
{
    public interface IImageRepository
    {
        Task<Image> CreateAsync(IFormFile file);
        Task<Image> CreatePostAsync(IFormFile file, int postId);
        Task<Image> CreateCommentAsync(IFormFile file, int commentId);
        Task<Image> GetImage(int id);
        Task<Image> UpdatePostIdImage(int id, int postId);
    }
}
