using System.ComponentModel.DataAnnotations;

namespace TwitterAppWebApi.DTOs.Account
{
    public class LoginDTO
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
