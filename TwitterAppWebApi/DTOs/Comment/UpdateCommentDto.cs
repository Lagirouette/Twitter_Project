using System.ComponentModel.DataAnnotations;

namespace TwitterAppWebApi.DTOs.Account
{
    public class UpdateCommentDto
    {
        [Required]
        [MinLength(5, ErrorMessage = "This is too short")]
        [MaxLength(280, ErrorMessage = "Comment cannot be over 280 characters")]
        public string Content { get; set; } = string.Empty;
    }
}
