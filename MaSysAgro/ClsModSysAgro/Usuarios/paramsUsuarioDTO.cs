using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClsModSysAgro.Usuarios
{
    public class paramsUsuarioDTO
    {
        public string Usuario { get; set; }
        public string Contrasena { get; set; }
        public string Email { get; set; }
        public string FechaActual { get; set; }
        public string Token { get; set; }
    }
}
