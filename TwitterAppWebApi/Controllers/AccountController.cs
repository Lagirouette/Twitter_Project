using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Security.Authentication;
using System.Security.Claims;
using TwitterAppWebApi.DTOs.Account;
using TwitterAppWebApi.Models;
using TwitterAppWebApi.Repository.PostRepositories;
using TwitterAppWebApi.TokenService;

namespace TwitterAppWebApi.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IPasswordHasher<AppUser> _passwordHasher;
        private readonly ITokenService _tokenService;
        private readonly IPostRepository _postRepository;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
            IPasswordHasher<AppUser> passwordHasher, ITokenService tokenService, IPostRepository postRepository)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _passwordHasher = passwordHasher;
            _tokenService = tokenService;
            _postRepository = postRepository;
        }

        [HttpGet("{userName}")]
        public async Task<IActionResult> GetProfil([FromRoute] string userName)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == userName);
            
            return Ok(
                new AccountDTO
                {
                    Id = user.Id,
                    Pseudo = user.Pseudo,
                    UserName = user.UserName,
                    Email = user.Email,
                    Profil = user.Profil
                }
            ); 
        }

        [HttpGet("id/{userName}")]
        public async Task<IActionResult> GetIDProfil([FromRoute] string userName)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == userName);

            return Ok(
                new AccountDTO
                {
                    Id = user.Id,
                    UserName = user.UserName
                }
            );
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                Random random = new Random();
                int nbpseudo = random.Next(1000, 10000);

                var pseudo = "@" + registerDTO.UserName+nbpseudo.ToString();

                var appUser = new AppUser
                {
                    UserName = registerDTO.UserName,
                    Email = registerDTO.Email,
                    Pseudo = pseudo,
                };

                var userVerification = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == registerDTO.Email);
                if (userVerification != null)
                                    return BadRequest("This email is already used ! Please enter a new one !");
                
                var createdUser = await _userManager.CreateAsync(appUser, registerDTO.Password);

                if (createdUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser, "User");

                    var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == registerDTO.Email);

                    if (roleResult.Succeeded)
                    {
                        return Ok(
                            new AccountDTO
                            {
                                UserName = appUser.UserName,
                                Email = appUser.Email,
                                Token = _tokenService.CreateToken(user),
                            }
                        );
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createdUser.Errors);
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDTO.UserName);

            if (user == null || !user.UserName.Equals(loginDTO.UserName))
                return Unauthorized("Invalid username !");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);

            if (!result.Succeeded) 
                return Unauthorized("UserName not found and/or password incorrect");

            return Ok(
                new AccountDTO
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Token= _tokenService.CreateToken(user)
                }
            );
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user != null)
            {
                if (!string.IsNullOrEmpty(email))
                    user.Email = email;
                else
                    return BadRequest("Email cannot be empty");

                if (!string.IsNullOrEmpty(password))
                    user.PasswordHash = _passwordHasher.HashPassword(user, password);
                else
                    return BadRequest("Password cannot be empty");

                if (!string.IsNullOrEmpty(email) && !string.IsNullOrEmpty(password))
                {
                    IdentityResult result = await _userManager.UpdateAsync(user);
                    if (result.Succeeded)
                        return Ok();
                    else
                        return BadRequest("Error in the update");
                }
                else
                {
                    return BadRequest("Error in the update");
                }
            }
            else
            {
                return BadRequest("User Not Found");
            }
        }

        [HttpPut("profil")]
        [Authorize]
        public async Task<IActionResult> ProfilUpdate(string profil)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var username = User.FindFirst(ClaimTypes.GivenName)?.Value;

            var appUser = await _userManager.FindByNameAsync(username);

            if (appUser != null)
            {
                appUser.Profil = profil;

                IdentityResult result = await _userManager.UpdateAsync(appUser);
                if (result.Succeeded)
                    return Ok();
                else
                    return BadRequest("Error in the update");
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> Login(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user != null)
            {

                try
                {
                    var ListPosttoDelete = await _postRepository.GetAllFromUserAsync(id);

                    if (ListPosttoDelete != null)
                    {
                        foreach (var post in ListPosttoDelete)
                        {
                            await _postRepository.DeleteAsync(post.Id);
                        }
                    }

                    var result = await _userManager.DeleteAsync(user);

                    if (result.Succeeded)
                        return Ok();
                    else
                        return BadRequest();
                }
                catch
                {
                    return BadRequest();
                }

            }
            else
            {
                ModelState.AddModelError("", "User Not Found");
                return BadRequest();
            }
        }
    }
}
