using Microsoft.EntityFrameworkCore;
using TwitterAppWebApi.Data;
using TwitterAppWebApi.Models;

namespace TwitterAppWebApi.Repository.CommentRepositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDBContext _context;

        public CommentRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Comment> CreateAsync(Comment commentModel)
        {
            await _context.Comments.AddAsync(commentModel);
            await _context.SaveChangesAsync();
            return commentModel;
        }

        public async Task<Comment> DeleteAsync(int id)
        {
            var existComment = await _context.Comments.FirstOrDefaultAsync(c => c.Id == id);

            if (existComment == null)
            {
                return null;
            }

            _context.Remove(existComment);
            await _context.SaveChangesAsync();

            return existComment;
        }

        public async Task<List<Comment>> GetAllAsync()
        {
            return await _context.Comments.Include(a => a.AppUser).ToListAsync();
        }

        public async Task<Comment> GetbyIdAsync(int id)
        {
            return await _context.Comments.Include(a => a.AppUser).FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Comment> UpdateAsync(int id, Comment commentModel)
        {
            var existComment = await _context.Comments.FirstOrDefaultAsync(x => x.Id == id);

            if (existComment == null)
            {
                return null;
            }

            existComment.Content = commentModel.Content;

            await _context.SaveChangesAsync();
            return existComment;
        }
    }
}
