namespace TwitterAppWebApi.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Body { get; set; }
        public DateTime CreatOn { get; set; } = DateTime.Now;
        public List<Comment> Comments { get; set; } = new List<Comment>();
        public string? AppUserId { get; set; }
        public AppUser? AppUser { get; set; }

        public int? ImageId { get; set; }
        public Image? Image { get; set; }
    }
}
