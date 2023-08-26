using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClsModSysAgro.Usuarios
{
    public class UsuarioDTO
    {
        public int Id { get; set; }
        public int IdSucursal { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Nombre { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }
        public string Telefono { get; set; }
        public string Email { get; set; }
        public bool Activo { get; set; }
        public string Token { get; set; }
        public DateTime FechaIngreso { get; set; }
        public DateTime FechaExpiracion { get; set; }
        public string ImagenPerfil { get; set; }
        public string IDUnico { get; set; }
        public string TelefonoContacto { get; set; }

    }
}
