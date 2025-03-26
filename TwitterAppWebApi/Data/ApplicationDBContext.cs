using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;
using TwitterAppWebApi.Models;

namespace TwitterAppWebApi.Data
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> DbContextOptions)
            : base(DbContextOptions)
        {
        }

        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Like> Likes { get; set; }   
        public DbSet<Follow> Follows { get; set; }
        public DbSet<Image> Images { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Post>()
                .HasOne(p => p.Image)
                .WithOne(i => i.Post)
                .HasForeignKey<Image>(p => p.PostId);

            builder.Entity<Comment>()
                .HasOne(c => c.Image)
                .WithOne(i => i.Comment)
                .HasForeignKey<Image>(c => c.CommentId);
        }
    }
}
