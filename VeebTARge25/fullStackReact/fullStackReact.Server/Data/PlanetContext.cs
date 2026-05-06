using fullStackReact.Server.Domain;
using Microsoft.EntityFrameworkCore;

namespace fullStackReact.Server.Data
{
    public class PlanetContext : DbContext
    {
        public PlanetContext(DbContextOptions<PlanetContext> options) : base(options)
        { }

        public DbSet<Planets> Planets { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Planets>().ToTable("Planets");
        }

    }
}

