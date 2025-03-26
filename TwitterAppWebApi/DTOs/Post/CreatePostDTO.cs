using System.ComponentModel.DataAnnotations;

namespace TwitterAppWebApi.DTOs.Post
{
    public class CreatePostDTO
    {
        [Required]
        [MinLength(5, ErrorMessage = "This is too short")]
        [MaxLength(280, ErrorMessage = "Tweet cannot be over 280 characters")]
        public string Body { get; set; } = string.Empty;

    }
}
