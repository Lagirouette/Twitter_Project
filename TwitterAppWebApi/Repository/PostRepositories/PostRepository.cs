using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Diagnostics.CodeAnalysis;
using TwitterAppWebApi.Data;
using TwitterAppWebApi.Models;

namespace TwitterAppWebApi.Repository.PostRepositories
{
    [ExcludeFromCodeCoverage]
    public class PostRepository : IPostRepository
    {
        private readonly ApplicationDBContext _context;

        public PostRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Post> CreateAsync(Post post)
        {
            await _context.AddAsync(post);
            await _context.SaveChangesAsync();
            return post;
        }

        public async Task<Post> DeleteAsync(int id)
        {
            var existingPost = await _context.Posts.FirstOrDefaultAsync(c => c.Id == id);

            if (existingPost == null)
            {
                return null;
            }

            _context.Remove(existingPost);
            await _context.SaveChangesAsync();

            return existingPost;
        }

        public async Task<List<Post>> GetAllAsync()
        {
            return await _context.Posts.Include(a => a.AppUser).ToListAsync();
        }

        public async Task<List<Post>> GetAllByUserNameAsync(string userName)
        {
            return await _context.Posts.Include(a => a.AppUser).Where(a => a.AppUser.UserName == userName).ToListAsync();
        }

        public async Task<List<Post>> GetAllFromUserAsync(string userId)
        {
            return await _context.Posts.Where(a => a.AppUserId == userId).ToListAsync();
        }

        public async Task<Post> GetByIdAsync(int id)
        {
            return await _context.Posts.Include(a => a.AppUser).Include(x => x.Image).FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Post> GetByUserNameAsync(string userName)
        {
            return await _context.Posts.Include(a => a.AppUser).FirstOrDefaultAsync(c => c.AppUser.UserName == userName);
        }

        public async Task<Post> UpdateAsync(int id, Post post)
        {
            var existingPost = await _context.Posts.Include(a => a.AppUser).FirstOrDefaultAsync(c => c.Id == id);

            if (existingPost == null)
            {
                return null;
            }

            existingPost.Body = post.Body;

            await _context.SaveChangesAsync();
            return existingPost;
        }

        public async Task<Post> UpdateImageAsync(int id, int imageId)
        {
            var existingPost = await _context.Posts.FirstOrDefaultAsync(c => c.Id == id);

            if (existingPost == null)
            {
                return null;
            }

            existingPost.ImageId = imageId;

            await _context.SaveChangesAsync();
            return existingPost;
        }
    }
}
