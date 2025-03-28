using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using System.Security.Claims;
using TwitterAppWebApi.Controllers;
using TwitterAppWebApi.DTOs.Post;
using TwitterAppWebApi.Models;
using TwitterAppWebApi.Repository.ImageRepositories;
using TwitterAppWebApi.Repository.PostRepositories;

namespace TwitterApiTests
{
    public class PostTests
    {
        private readonly Mock<IPostRepository> _mockRepo;
        private readonly Mock<UserManager<AppUser>> _mockUserRepo;
        private readonly Mock<IImageRepository> _mockImageRepo;
        private readonly PostController _controller;

        AppUser testUser = new AppUser { UserName = "TestUser", Pseudo = "TestPseudo" };
        AppUser testUser2 = new AppUser { UserName = "TestUser2", Pseudo = "TestPseudo2" };


        public PostTests()
        {
            _mockRepo = new Mock<IPostRepository>();

            _mockImageRepo = new Mock<IImageRepository>();

            _mockUserRepo = new Mock<UserManager<AppUser>>(
            Mock.Of<IUserStore<AppUser>>(), null, null, null, null, null, null, null, null);

            _controller = new PostController(_mockRepo.Object, _mockUserRepo.Object ,_mockImageRepo.Object);

            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.GivenName, "testuser"),
            }, "mock"));

            _controller.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
        }

        [Fact]
        public async Task GetAllPostsTest()
        {
            // Arrange
            var testPosts = new List<Post>
            {
                new Post { Id = 1, Body = "Test post 1", AppUser = testUser },
                new Post { Id = 2, Body = "Test post 2", AppUser = testUser }
            };

            _mockRepo.Setup(repo => repo.GetAllAsync())
            .ReturnsAsync(testPosts);

            // Act
            var result = await _controller.GetAll();

            // Assert
            Assert.NotNull(result);
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedPosts = Assert.IsAssignableFrom<IEnumerable<PostDTO>>(okResult.Value);
            Assert.Equal(2, returnedPosts.Count());
            Assert.Equal("Test post 1", returnedPosts.First().Body);
        }

        [Fact]
        public async Task GetAllPostByNameTest()
        {
            var testPosts = new List<Post>
            {
                new Post { Id = 1, Body = "Test post 1", AppUser = testUser },
                new Post { Id = 2, Body = "Test post 2", AppUser = testUser },
                new Post { Id = 3, Body = "Test post 3", AppUser = testUser2 }
            };

            _mockRepo.Setup(repo => repo.GetAllByUserNameAsync("TestUser"))
            .ReturnsAsync(testPosts.FindAll(x => x.AppUser == testUser));

            // Act
            var result = await _controller.GetAllByName("TestUser");

            // Assert
            Assert.NotNull(result);
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedPosts = Assert.IsAssignableFrom<IEnumerable<PostDTO>>(okResult.Value);
            Assert.Equal(2, returnedPosts.Count());
        }

        [Fact]
        public async Task GetAllPostByIdTest()
        {
            var testPosts = new List<Post>
            {
                new Post { Id = 1, Body = "Test post 1", AppUser = testUser },
                new Post { Id = 2, Body = "Test post 2", AppUser = testUser },
                new Post { Id = 3, Body = "Test post 3", AppUser = testUser2 }
            };

            _mockRepo.Setup(repo => repo.GetByIdAsync(1))
                .ReturnsAsync(testPosts.Find(x => x.Id == 1));

            // Act
            var result = await _controller.GetById(1);

            // Assert
            Assert.NotNull(result);
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedPosts = Assert.IsAssignableFrom<PostDTO>(okResult.Value);
            Assert.Equal(1, returnedPosts.Id);
        }

        [Fact]
        public async Task CreatePost_ReturnCreated_SuccesfullyTest()
        {
            var dtoPost = new CreatePostDTO { Body = "Test post 1"};
               var testUser = new AppUser { Id = "user123" };
            var testPost = new Post { Id = 1, Body = dtoPost.Body , AppUserId = testUser.Id };
            
            _mockUserRepo.Setup(x => x.FindByNameAsync(It.IsAny<string>()))
                .ReturnsAsync(testUser);
            _mockRepo.Setup(repo => repo.CreateAsync(It.IsAny<Post>()))
                .ReturnsAsync(testPost);
            
            // Act
            var result = await _controller.Create(dtoPost);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<CreatedResult>(result);
        }

        [Fact]
        public async Task CreatePost_ReturnUnProcessEntity_ModelInvalidTest()
        {
            // Arrange
            _controller.ModelState.AddModelError("Content", "Required");
            var dto = new CreatePostDTO();

            // Act
            var result = await _controller.Create(dto);

            // Assert
            Assert.IsType<UnprocessableEntityObjectResult>(result);
        }

        [Fact]
        public async Task CreatePost_ReturnUnProcessEntity_NullEntityTest()
        {
            // Arrange
            var dtoPost = new CreatePostDTO { Body = "Test post 1" };
            var testUser = new AppUser { Id = "user123" };

            _mockUserRepo.Setup(x => x.FindByNameAsync(It.IsAny<string>()))
                .ReturnsAsync(testUser);
            _mockRepo.Setup(repo => repo.CreateAsync(It.IsAny<Post>()))
                .ReturnsAsync((Post)null);

            // Act
            var result = await _controller.Create(dtoPost);

            // Assert
            Assert.IsType<UnprocessableEntityObjectResult>(result);
        }

        [Fact]
        public async Task CreatePost_ReturnUnProcessEntity_NullAppUserTest()
        {
            // Arrange
            var dtoPost = new CreatePostDTO { Body = "Test post 1" };

            _mockUserRepo.Setup(x => x.FindByNameAsync(It.IsAny<string>()))
                .ReturnsAsync((AppUser?)null);

            // Act
            var result = await _controller.Create(dtoPost);

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public async Task UpdatePost_ReturnOkPostModel_SuccesfullTest()
        {
            // Arrange
            var UpdatedPost = new Post { Id = 1, Body = "Updated Test post 1", AppUser = testUser };
            var dto = new UpdatePostDTO { Body = "Updated Test post 1" };

            _mockRepo.Setup(x => x.UpdateAsync(It.IsAny<int>(), It.IsAny<Post>()))
                .ReturnsAsync(UpdatedPost);

            // Act
            var result = await _controller.Update(1, dto);

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task UpdatePost_ReturUnprocessableEntity_BadModelTest()
        {
            // Arrange
            _controller.ModelState.AddModelError("Content", "Required");
            var dto = new UpdatePostDTO();

            // Act
            var result = await _controller.Update(1, dto);

            // Assert
            Assert.IsType<UnprocessableEntityObjectResult>(result);
        }

        [Fact]
        public async Task UpdatePost_ReturnNotFound_NullPostTest()
        {
            // Arrange
            var dto = new UpdatePostDTO { Body = "Updated Test post 1" };

            _mockRepo.Setup(x => x.UpdateAsync(It.IsAny<int>(), It.IsAny<Post>()))
                .ReturnsAsync((Post)null);

            // Act
            var result = await _controller.Update(1, dto);

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public async Task DeletePost_ReturnOkPostModel_SuccesfullTest()
        {
            // Arrange
            var DeletedPost = new Post { Id = 1, Body = "Test post 1", AppUser = testUser };

            _mockRepo.Setup(x => x.DeleteAsync(It.IsAny<int>()))
                .ReturnsAsync(DeletedPost);

            // Act
            var result = await _controller.Delete(1);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedPost = Assert.IsAssignableFrom<Post>(okResult.Value);
            Assert.Equal(1, returnedPost.Id);
            Assert.Equal("Test post 1", returnedPost.Body);
        }

        [Fact]
        public async Task DeletePost_ReturUnprocessableEntity_BadModelTest()
        {
            // Arrange
            _controller.ModelState.AddModelError("Content", "Required");

            // Act
            var result = await _controller.Delete(It.IsAny<int>());

            // Assert
            Assert.IsType<UnprocessableEntityObjectResult>(result);
        }

        [Fact]
        public async Task DeletePost_ReturnNotFound_NullPostTest()
        {
            // Arrange

            _mockRepo.Setup(x => x.DeleteAsync(It.IsAny<int>()))
                .ReturnsAsync((Post)null);

            // Act
            var result = await _controller.Delete(It.IsAny<int>());

            // Assert
            var okResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.NotNull(okResult.Value);
            Assert.Equal("Post not found !", okResult.Value);
        }
    }
}