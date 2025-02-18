using TwitterAppWebApi.Models;

namespace TwitterAppWebApi.Repository.LikeRepositories
{
    public interface ILikeRepository
    {
        Task<List<Like>> GetAllAsync(int id);
        Task<Like> GetLikeAsync(Like like);

        Task<Like> CreateAsync(Like like);

        Task<Like> DeleteAsync(string userId, int postId);
    }
}
