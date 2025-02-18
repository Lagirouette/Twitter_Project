namespace TwitterAppWebApi.DTOs.Post
{
    public class PostDTO
    {
        public string Title { get; set; }

        public string Body { get; set; }
        public DateTime CreatOn { get; set; } = DateTime.Now;
        public string CreatedBy { get; set; } = string.Empty;

    }
}
