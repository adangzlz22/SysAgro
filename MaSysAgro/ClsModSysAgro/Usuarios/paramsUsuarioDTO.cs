using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClsModSysAgro.Usuarios
{
    public class paramsUsuarioDTO
    {
        public int Id { get; set; }
        public Nullable<int> IdSucursal { get; set; }
        public string Usuario { get; set; }
        public string ContrasenaActual { get; set; }
        public string Contrasena { get; set; }
        public string Nombre { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }
        public string Telefono { get; set; }
        public string Email { get; set; }
        public Nullable<bool> Activo { get; set; }
        public string Token { get; set; }
        public Nullable<System.DateTime> FechaIngreso { get; set; }
        public Nullable<System.DateTime> FechaExpiracion { get; set; }
        public string ImagenPerfil { get; set; }
        public string IDUnico { get; set; }
        public string TelefonoContacto { get; set; }
        public int IdRol { get; set; }
    }
}
