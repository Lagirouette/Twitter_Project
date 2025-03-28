using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;
using TwitterAppWebApi.Data;
using TwitterAppWebApi.Models;

namespace TwitterAppWebApi.Repository.FollowRepositories
{
    [ExcludeFromCodeCoverage]
    public class FollowRepository : IFollowRepository
    {
        private readonly ApplicationDBContext _context;

        public FollowRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Follow> CreateAsync(Follow follow)
        {
            if (follow.Followedby == follow.UserId)
            {
                return null;
            }

            await _context.Follows.AddAsync(follow);
                await _context.SaveChangesAsync();
                return follow;
        }

        public async Task<Follow> DeleteAsync(string userId, string followedby)
        {
            var existingFollow = await _context.Follows.FirstOrDefaultAsync(c => c.UserId == userId && c.Followedby == followedby);

            if (existingFollow == null)
            {
                return null;
            }

            _context.Remove(existingFollow);
            await _context.SaveChangesAsync();

            return existingFollow;
        }

        public async Task<List<Follow>> GetAllFollowerAsync(string userId)
        {
            return await _context.Follows.Where(a => a.UserId == userId).ToListAsync();
        }

        public async Task<List<Follow>> GetAllFollowingAsync(string userId)
        {
            return await _context.Follows.Where(a => a.Followedby == userId).ToListAsync();
        }

        public async Task<Follow> GetFollowAsync(string Followedby, string UserId)
        {
            return await _context.Follows.FirstOrDefaultAsync(a => a.Followedby == Followedby && a.UserId == UserId);
        }

        public async Task<int> GetNumberFollowerAsync(string userId)
        {
            var followers = await _context.Follows.Where(a => a.UserId == userId).ToListAsync();
            return followers.Count();
        }
        public async Task<int> GetNumberFollowingAsync(string userId)
        {
            var followings = await _context.Follows.Where(a => a.Followedby == userId).ToListAsync();
            return followings.Count();
        }
    }
}
