using TwitterAppWebApi.DTOs.Follow;
using TwitterAppWebApi.DTOs.Like;
using TwitterAppWebApi.Models;

namespace TwitterAppWebApi.Mappers
{
    public static class FollowMapper
    {
        public static FollowDto toFollowDto(this Follow follow)
        {
            return new FollowDto
            {
                Id = follow.Id,
                Followedby = follow.Followedby,
                UserId = follow.UserId
            };
        }
    }
}
