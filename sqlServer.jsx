//appsettings.json

{
    "Logging": {
      "LogLevel": {
        "Default": "Information",
        "Microsoft.AspNetCore": "Warning"
      }
    },
    "AllowedHosts": "*",
    "ConnectionStrings": {
      "DefaultConnection": "Server=DESKTOP-67CCRDB\\SQLEXPRESS01;Database=ProjectDb;Trusted_connection=true;TrustServerCertificate=true;"
    }
  }
  
  //User.cs
  public class User
{
    public int Id { get; set; }
    public string UserName { get; set; }
    public string CountryName { get; set; }
    public string CountryCode { get; set; }
}

// UserContext.cs
using Microsoft.EntityFrameworkCore;

public class UserContext : DbContext
{
    public UserContext(DbContextOptions<UserContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
}

