using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ClsModSysAgroCore.Usuarios;
using System.Web.SessionState;

namespace SysAgroWeb.Clase
{
    public class vSesiones
    {
        private static HttpSessionState session
        {
            get
            {
                if (HttpContext.Current != null)
                {
                    return HttpContext.Current.Session;
                }
                else
                {
                    return null;
                }
            }
        }
        public static UsuarioDTO sesionUsuarioDTO
        {
            get
            {
                if (session != null)
                {
                    return session["objUsuario"] as UsuarioDTO;
                }
                else
                {
                    return null;
                }
            }
            set
            {
                session["objUsuario"] = value;
            }
        }




    }
}