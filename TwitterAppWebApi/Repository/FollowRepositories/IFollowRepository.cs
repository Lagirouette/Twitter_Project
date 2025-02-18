using TwitterAppWebApi.Models;

namespace TwitterAppWebApi.Repository.FollowRepositories
{
    public interface IFollowRepository
    {
        Task<List<Follow>> GetAllFollowerAsync(string userId);
        Task<List<Follow>> GetAllFollowingAsync(string userId);
        Task<int> GetNumberFollowerAsync(string userId);
        Task<int> GetNumberFollowingAsync(string userId);
        Task<Follow> GetFollowAsync(string Followedby, string UserId);

        Task<Follow> CreateAsync(Follow follow);

        Task<Follow> DeleteAsync(string userId, string followedby);
    }
}
