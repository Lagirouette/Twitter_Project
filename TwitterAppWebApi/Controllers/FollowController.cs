using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TwitterAppWebApi.Mappers;
using TwitterAppWebApi.Models;
using TwitterAppWebApi.Repository.FollowRepositories;

namespace TwitterAppWebApi.Controllers
{
    [Route("api/follow")]
    [ApiController]
    public class FollowController : ControllerBase
    {
        private readonly IFollowRepository _followRepository;
        private readonly UserManager<AppUser> _userManager;

        public FollowController(IFollowRepository followRepository, UserManager<AppUser> userManager)
        {
            _followRepository = followRepository;
            _userManager = userManager;
        }

        [HttpGet("followers")]
        [Authorize]
        public async Task<IActionResult> GetAllFollowerLikes()
        {
            var username = User.FindFirst(ClaimTypes.GivenName)?.Value;
            var appUser = await _userManager.FindByNameAsync(username);

            var follower = await _followRepository.GetAllFollowerAsync(appUser.Id);

            return Ok(follower);
        }

        [HttpGet("nbfollowers")]
        [Authorize]
        public async Task<IActionResult> GetNbsFollowerLikes()
        {
            var username = User.FindFirst(ClaimTypes.GivenName)?.Value;
            var appUser = await _userManager.FindByNameAsync(username);

            var follower = await _followRepository.GetNumberFollowerAsync(appUser.Id);

            return Ok(follower);
        }

        [HttpGet("followings")]
        [Authorize]
        public async Task<IActionResult> GetAllFollowingsLikes()
        {
            var username = User.FindFirst(ClaimTypes.GivenName)?.Value;
            var appUser = await _userManager.FindByNameAsync(username);

            var follower = await _followRepository.GetAllFollowingAsync(appUser.Id);

            return Ok(follower);
        }

        [HttpGet("nbsfollowings")]
        [Authorize]
        public async Task<IActionResult> GetNbsFollowings()
        {
            var username = User.FindFirst(ClaimTypes.GivenName)?.Value;
            var appUser = await _userManager.FindByNameAsync(username);

            var follower = await _followRepository.GetNumberFollowingAsync(appUser.Id);

            return Ok(follower);
        }

        [HttpGet("followers/{userId}")]
        public async Task<IActionResult> GetAllUserFollower(string userId)
        {
            var follower = await _followRepository.GetAllFollowerAsync(userId);

            return Ok(follower);
        }

        [HttpGet("nbfollowers/{userId}")]
        public async Task<IActionResult> GetNbsUserFollower(string userId)
        {
            var follower = await _followRepository.GetNumberFollowerAsync(userId);

            return Ok(follower);
        }

        [HttpGet("followings/{userId}")]
        public async Task<IActionResult> GetAllUserFollowings(string userId)
        {
            var follower = await _followRepository.GetAllFollowingAsync(userId);

            return Ok(follower);
        }

        [HttpGet("nbsfollowings/{userId}")]
        public async Task<IActionResult> GetNbsUserFollowings(string userId)
        {
            var follower = await _followRepository.GetNumberFollowingAsync(userId);

            return Ok(follower);
        }

        [HttpGet("IfUserIsFollowing/{userId}")]
        [Authorize]
        public async Task<IActionResult> GetIfUserFollowings(string userId)
        {
            var username = User.FindFirst(ClaimTypes.GivenName)?.Value;
            var appUser = await _userManager.FindByNameAsync(username);

            var follow = await _followRepository.GetFollowAsync(appUser.Id, userId);

            if (follow == null)
            {
                return Ok(false);
            }
            else
            {
                return Ok(true);
            }

        }

        [HttpPost("{userId}")]
        [Authorize]
        public async Task<IActionResult> Create(string userId)
        {
            Follow follow = new();

            var username = User.FindFirst(ClaimTypes.GivenName)?.Value;
            var appUser = await _userManager.FindByNameAsync(username);

            follow.Followedby = appUser.Id;
            follow.UserId = userId;

            var verification = await _followRepository.GetFollowAsync(follow.Followedby, follow.UserId);

            if (verification == null)
            {
                var create = await _followRepository.CreateAsync(follow);
                if (create == null)
                {   
                    return BadRequest("You cant follow yourself !");
                }
                return Ok(follow.toFollowDto());
            }

            return BadRequest();
        }

        [HttpDelete("{userId}")]
        [Authorize]
        public async Task<IActionResult> Delete(string userId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var username = User.FindFirst(ClaimTypes.GivenName)?.Value;
            var appUser = await _userManager.FindByNameAsync(username);

            await _followRepository.DeleteAsync(userId, appUser.Id);
            return Ok();
        }

    }
}
