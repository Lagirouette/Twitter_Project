using TwitterAppWebApi.Models;

namespace TwitterAppWebApi.Repository.CommentRepositories
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetAllAsync();
        Task<List<Comment>> GetAllByPostAsync(int postId);
        Task<Comment> GetbyIdAsync(int id);
        Task<Comment> CreateAsync(Comment commentModel);
        Task<Comment> UpdateAsync(int id, Comment commentModel);
        Task<Comment> DeleteAsync(int id);
    }
}
