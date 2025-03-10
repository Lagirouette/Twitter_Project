namespace TwitterAppWebApi.DTOs.Post
{
    public class PostDTO
    {
        public int Id { get; set; }
        public string Body { get; set; }
        public DateTime CreatOn { get; set; } = DateTime.Now;
        public string CreatedBy { get; set; } = string.Empty;
        public string CreatedByPseudo { get; set; } = string.Empty;

    }
}
