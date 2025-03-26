namespace TwitterAppWebApi.Models
{
    public class Image
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public byte[] Data { get; set; } 
        public string ContentType { get; set; }

        public int? PostId { get; set; }
        public Post? Post { get; set; }
        public int? CommentId { get; set; }
        public Comment? Comment{ get; set; }
    }
}
