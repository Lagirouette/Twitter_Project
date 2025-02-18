namespace TwitterAppWebApi.DTOs.Account
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime CreatOn { get; set; } = DateTime.Now;
        public string CreatedBy { get; set; } = string.Empty;
        public int? PostId { get; set; }

    }
}
