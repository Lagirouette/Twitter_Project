using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TwitterAppWebApi.Data;
using TwitterAppWebApi.Models;
using TwitterAppWebApi.Repository.CommentRepositories;
using TwitterAppWebApi.Repository.ImageRepositories;
using TwitterAppWebApi.Repository.PostRepositories;

namespace TwitterAppWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImagesController : ControllerBase
    {
        private readonly IImageRepository _imageRepository;
        private readonly UserManager<AppUser> _userManager;
        private readonly IPostRepository _postRepository;
        private readonly ICommentRepository _commentRepository;

        public ImagesController(IImageRepository imageRepository, UserManager<AppUser> userManager, IPostRepository postRepository, ICommentRepository commentRepository)
        {
            _imageRepository = imageRepository;
            _userManager = userManager;
            _postRepository = postRepository;
            _commentRepository = commentRepository;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            var image = await _imageRepository.CreateAsync(file);

            if(image == null)
                return BadRequest("No file uploaded");
            else
                return Ok(new { image.Id });
            
        }

        [HttpPost("postimg/{postId:int}")]
        public async Task<IActionResult> UploadPostImage(IFormFile file, [FromRoute]int postId)
        {
            var image = await _imageRepository.CreatePostAsync(file, postId);

            if (image == null)
                return BadRequest("No file uploaded");
            else{
                await _postRepository.UpdateImageAsync(postId, image.Id);
                return Ok(new { image.Id }); 
            }

        }

        [HttpPost("commentimg/{commentId:int}")]
        public async Task<IActionResult> UploadCommentImage(IFormFile file, [FromRoute] int commentId)
        {
            var image = await _imageRepository.CreateCommentAsync(file, commentId);

            if (image == null)
                return BadRequest("No file uploaded");
            else
            {
                await _commentRepository.UpdateImageAsync(commentId, image.Id);
                return Ok(new { image.Id });
            }

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetImage(int id)
        {
            var image = await _imageRepository.GetImage(id);

            return File(image.Data, image.ContentType);
        }
    }
}
