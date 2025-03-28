using Microsoft.EntityFrameworkCore;
using System.ComponentModel.Design;
using System.Diagnostics.CodeAnalysis;
using TwitterAppWebApi.Data;
using TwitterAppWebApi.Models;

namespace TwitterAppWebApi.Repository.ImageRepositories
{
    [ExcludeFromCodeCoverage]
    public class ImageRepository : IImageRepository
    {
        private readonly ApplicationDBContext _context;

        public ImageRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Image> CreateAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return null;

            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                var image = new Image
                {
                    FileName = file.FileName,
                    Data = memoryStream.ToArray(),
                    ContentType = file.ContentType
                };

                _context.Images.Add(image);
                await _context.SaveChangesAsync();

                return image;
            }
        }

        public async Task<Image> CreateCommentAsync(IFormFile file, int commentId)
        {
            if (file == null || file.Length == 0)
                return null;

            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                var image = new Image
                {
                    FileName = file.FileName,
                    Data = memoryStream.ToArray(),
                    ContentType = file.ContentType,
                    CommentId = commentId
                };

                _context.Images.Add(image);
                await _context.SaveChangesAsync();

                return image;
            }
        }

        public async Task<Image> CreatePostAsync(IFormFile file, int postId)
        {
            if (file == null || file.Length == 0)
                return null;

            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                var image = new Image
                {
                    FileName = file.FileName,
                    Data = memoryStream.ToArray(),
                    ContentType = file.ContentType,
                    PostId = postId
                };

                _context.Images.Add(image);
                await _context.SaveChangesAsync();

                return image;
            }
        }

        public async Task<Image> GetImage(int id)
        {
            var image = await _context.Images.FindAsync(id);
            
            if (image == null)
                return null;
            else
                return image;
        }

        public async Task<Image> UpdatePostIdImage(int id, int postId)
        {
            var image = await _context.Images.FindAsync(id);

            if (image == null) { return null; }
                
            else
            {
                image.PostId = postId;

                await _context.SaveChangesAsync();

                return image;
            }
                
        }
    }
}
