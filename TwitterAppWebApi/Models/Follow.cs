namespace TwitterAppWebApi.Models
{
    public class Follow
    {
        public int Id { get; set; }
        public string Followedby { get; set; }

        public string UserId { get; set; }
        public AppUser User { get; set; }
    }
}
