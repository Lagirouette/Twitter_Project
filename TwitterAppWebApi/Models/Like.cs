namespace TwitterAppWebApi.Models
{
    public class Like
    {
        public int Id { get; set; }

        public string LikeBy { get; set; }

        public int PostId { get; set; }

        public Post Post { get; set; }
    }
}
