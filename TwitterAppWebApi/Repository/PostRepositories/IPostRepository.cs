using TwitterAppWebApi.Models;

namespace TwitterAppWebApi.Repository.PostRepositories
{
    public interface IPostRepository
    {
        Task<List<Post>> GetAllAsync();
        Task<Post> CreateAsync(Post post);
        Task<Post> DeleteAsync(int id);
        Task<Post> UpdateAsync(int id, Post post);
        Task<Post> GetByIdAsync(int id);
        Task<List<Post>> GetAllFromUserAsync(string userId);
    }
}