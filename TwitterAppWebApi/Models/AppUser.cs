using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace TwitterAppWebApi.Models
{
    public class AppUser : IdentityUser
    {
        public List<Post> Posts { get; set; }

        [MaxLength(100)]
        public string? Profil {  get; set; }
    }
}
