using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TwitterAppWebApi.DTOs.Post;
using TwitterAppWebApi.Mappers;
using TwitterAppWebApi.Models;
using TwitterAppWebApi.Repository.PostRepositories;
using System.Security.Claims;
using TwitterAppWebApi.Repository.ImageRepositories;
using static System.Net.Mime.MediaTypeNames;
using Microsoft.AspNetCore.Authorization;

namespace TwitterAppWebApi.Controllers
{
    [Route("api/post")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly UserManager<AppUser> _userManager;
        private readonly IImageRepository _imageRepository;

        public PostController(IPostRepository postRepository, UserManager<AppUser> userManager, IImageRepository imageRepository)
        {
            _postRepository = postRepository;
            _userManager = userManager;
            _imageRepository = imageRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var posts = await _postRepository.GetAllAsync();
            var postsDto = posts.Select(s => s.toPostDto());
            return Ok(postsDto);
        }

        [HttpGet("{userName}")]
        public async Task<IActionResult> GetAllByName([FromRoute] string userName)
        {
            var posts = await _postRepository.GetAllByUserNameAsync(userName);
            var postsDto = posts.Select(s => s.toPostDto());
            return Ok(postsDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute]int id)
        {
            var post = await _postRepository.GetByIdAsync(id);
            var postDto = post.toPostDto();
            return Ok(postDto);

        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(CreatePostDTO createPostDTO)
        {
            if (!ModelState.IsValid)
                return UnprocessableEntity(ModelState);

            var username = User.FindFirst(ClaimTypes.GivenName)?.Value;

            var appUser = await _userManager.FindByNameAsync(username);

            var postModel = createPostDTO.toPostFromPostCreate();
            postModel.AppUserId = appUser.Id;

            var post = await _postRepository.CreateAsync(postModel);

            if (post == null)
                return UnprocessableEntity(post);

            return Created();
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdatePostDTO postDto)
        {
            if (!ModelState.IsValid)
                return UnprocessableEntity(ModelState);

            var postModel = await _postRepository.UpdateAsync(id, postDto.toPostFromUpdatePost());

            if (postModel == null)
            {
                return NotFound("Post not found");
            }

            return Ok(postModel.toPostDto());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute]int id)
        {
            if (!ModelState.IsValid)
                return UnprocessableEntity(ModelState);

            var model = await _postRepository.DeleteAsync(id);
            return Ok();
        }
    }
}
