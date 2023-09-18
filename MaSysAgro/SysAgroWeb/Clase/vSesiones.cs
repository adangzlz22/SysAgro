using ClsModSysAgro.Usuarios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace SysAgroWeb.Clase
{
    public class vSesiones
    {
        private static HttpSessionState session { get { return HttpContext.Current.Session; } }
        public static UsuarioDTO sesionUsuarioDTO
        {
            get { return session["objUsuario"] as UsuarioDTO; }
            set { session["objUsuario"] = value; }
        }
    }
}