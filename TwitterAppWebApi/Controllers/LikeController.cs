using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TwitterAppWebApi.DTOs.Account;
using TwitterAppWebApi.Mappers;
using TwitterAppWebApi.Models;
using TwitterAppWebApi.Repository.LikeRepositories;
using TwitterAppWebApi.Repository.PostRepositories;

namespace TwitterAppWebApi.Controllers
{
    [Route("api/like")]
    [ApiController]
    public class LikeController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly ILikeRepository _likeRepository;
        private readonly UserManager<AppUser> _userManager;

        public LikeController(IPostRepository postRepository, ILikeRepository likeRepository, UserManager<AppUser> userManager)
        {
            _postRepository = postRepository;
            _likeRepository = likeRepository;
            _userManager = userManager;
        }

        [HttpGet("{postId:int}")]
        public async Task<IActionResult> GetAllLikes([FromRoute]int postId)
        {
            var likes = await _likeRepository.GetAllAsync(postId);
            var likesNumber = likes.Count();
            return Ok(likesNumber);
        }

        [HttpPost("{postId:int}")]
        [Authorize]
        public async Task<IActionResult> Create([FromRoute] int postId)
        {
            Like like = new();

            var username = User.FindFirst(ClaimTypes.GivenName)?.Value;
            var appUser = await _userManager.FindByNameAsync(username);

            like.LikeBy = appUser.Id;
            like.PostId = postId;

            var verification = await _likeRepository.GetLikeAsync(like);
            
            if (verification == null)
            {
                await _likeRepository.CreateAsync(like);

                return Ok(like.toLikeDto());
            }

            return BadRequest();
        }

        [HttpDelete("{postId:int}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int postId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var username = User.FindFirst(ClaimTypes.GivenName)?.Value;
            var appUser = await _userManager.FindByNameAsync(username);

            var model = await _likeRepository.DeleteAsync(appUser.Id, postId);
            return Ok();
        }
    }
}
