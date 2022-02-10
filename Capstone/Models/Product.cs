using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Capstone.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public int price { get; set; }
    }
    public class CartItem { 
    public int Id { get; set; }
    public string CustomerId { get; set; }
    [ForeignKey("product")]
    public int ProductId { get; set; }
    public Product product { get; set; }
    }
    public class ProductContext : DbContext
    {
        public ProductContext(DbContextOptions<ProductContext> options) : base(options)
        {

        }
        public DbSet<Product> product { get; set; }
        public DbSet<CartItem> cartitem { get; set; }
    }
}
