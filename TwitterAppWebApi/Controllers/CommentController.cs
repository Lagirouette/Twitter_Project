using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TwitterAppWebApi.DTOs.Account;
using TwitterAppWebApi.Mappers;
using TwitterAppWebApi.Models;
using TwitterAppWebApi.Repository.CommentRepositories;
using TwitterAppWebApi.Repository.PostRepositories;

namespace TwitterAppWebApi.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IPostRepository _postRepository;
        private readonly UserManager<AppUser> _userManager;

        public CommentController(ICommentRepository commentRepository, IPostRepository postRepository, UserManager<AppUser> userManager)
        {
            _commentRepository = commentRepository;
            _postRepository = postRepository;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var comments = await _commentRepository.GetAllAsync();
            var commentsDto = comments.Select(s => s.toCommentDto());
            return Ok(commentsDto);
        }

        [HttpGet("all/{postId:int}")]
        public async Task<IActionResult> GetByPostAll([FromRoute] int postId)
        {
            var comments = await _commentRepository.GetAllByPostAsync(postId);
            if (comments == null)
            {
                return NotFound();
            }
            var commentsDto = comments.Select(s => s.toCommentDto());
            return Ok(commentsDto);
        }

        [HttpGet("nb/{postId:int}")]
        public async Task<IActionResult> GetByNbCommentPerPostAll([FromRoute] int postId)
        {
            var comments = await _commentRepository.GetAllByPostAsync(postId);
            if (comments == null)
            {
                return Ok(0);
            }
            var nbComments = comments.Count();
            return Ok(nbComments);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var comment = await _commentRepository.GetbyIdAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment.toCommentDto());
        }

        [HttpPost("{postId:int}")]
        [Authorize]
        public async Task<IActionResult> Create([FromRoute] int postId, CreateCommentDto commentDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var username = User.FindFirst(ClaimTypes.GivenName)?.Value;

            var appUser = await _userManager.FindByNameAsync(username);

            var commentmodel = commentDto.toCommentFromCreateDto(postId);
            commentmodel.AppUserId = appUser.Id;

            await _commentRepository.CreateAsync(commentmodel);

            return CreatedAtAction(nameof(GetById), new { id = commentmodel.Id }, commentmodel.toCommentDto()); ;
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCommentDto commentDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var commentmodel = await _commentRepository.UpdateAsync(id, commentDto.toCommentFromUpdateDto());

            if (commentmodel == null)
            {
                return NotFound("Post not found");
            }

            return Ok(commentmodel.toCommentDto());
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var model = await _commentRepository.DeleteAsync(id);
            return Ok();
        }
    }
}
