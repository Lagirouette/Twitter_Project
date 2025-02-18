using TwitterAppWebApi.Models;

namespace TwitterAppWebApi.TokenService
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
