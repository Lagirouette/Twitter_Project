using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TwitterAppWebApi.DTOs.Post;
using TwitterAppWebApi.Mappers;
using TwitterAppWebApi.Models;
using TwitterAppWebApi.Repository.PostRepositories;
using System.Security.Claims;

namespace TwitterAppWebApi.Controllers
{
    [Route("api/post")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly UserManager<AppUser> _userManager;

        public PostController(IPostRepository postRepository, UserManager<AppUser> userManager)
        {
            _postRepository = postRepository;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var posts = await _postRepository.GetAllAsync();
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
        public async Task<IActionResult> Create(CreatePostDTO createPostDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var username = User.FindFirst(ClaimTypes.GivenName)?.Value;

            var appUser = await _userManager.FindByNameAsync(username);

            var postModel = createPostDTO.toPostFromPostCreate();
            postModel.AppUserId = appUser.Id;

            await _postRepository.CreateAsync(postModel);

            return Created();
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdatePostDTO postDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

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
                return BadRequest(ModelState);

            var model = await _postRepository.DeleteAsync(id);
            return Ok();
        }
    }
}
