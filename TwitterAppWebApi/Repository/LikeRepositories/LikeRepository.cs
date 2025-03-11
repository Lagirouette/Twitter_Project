using Microsoft.EntityFrameworkCore;
using TwitterAppWebApi.Data;
using TwitterAppWebApi.Models;

namespace TwitterAppWebApi.Repository.LikeRepositories
{
    public class LikeRepository : ILikeRepository
    {
        private readonly ApplicationDBContext _context;

        public LikeRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Like> CreateAsync(Like like)
        {
            await _context.Likes.AddAsync(like);
            await _context.SaveChangesAsync();
            return like;
        }

        public async Task<Like> DeleteAsync(string userId, int postId)
        {
            var existingLike = await _context.Likes.FirstOrDefaultAsync(c => c.PostId == postId && c.LikeBy == userId);

            if (existingLike == null)
            {
                return null;
            }

            _context.Remove(existingLike);
            await _context.SaveChangesAsync();

            return existingLike;
        }

        public async Task<List<Like>> GetAllAsync(int id)
        {
            return await _context.Likes.Where(a => a.PostId == id).ToListAsync();
        }

        public async Task<Like> GetLikeAsync(Like like)
        {
            return await _context.Likes.FirstOrDefaultAsync(a => a.LikeBy == like.LikeBy && a.PostId == like.PostId);
        }
    }
}
