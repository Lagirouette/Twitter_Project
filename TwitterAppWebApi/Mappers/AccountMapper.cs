using TwitterAppWebApi.DTOs.Account;
using TwitterAppWebApi.Models;

namespace TwitterAppWebApi.Mappers
{
    static public class AccountMapper
    {
        public static AccountDTO toAccountDto(this AppUser UserModel)
        {
            return new AccountDTO
            {
                Id = UserModel.Id,
                UserName = UserModel.UserName,
                Email = UserModel.Email,
                Profil = UserModel.Profil,
            };
        }
    }
}
