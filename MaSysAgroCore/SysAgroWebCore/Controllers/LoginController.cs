using ClsModSysAgroCore.Usuarios;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SysAgroWeb.Clase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SysAgroWebCore.Controllers
{
    public class LoginController : Controller
    {
        public ActionResult Login()
        {
            if (vSesiones.sesionUsuarioDTO != null)
            {
                return Redirect("/Home/Index");
            }
            else
            {
                return View();
            }
        }
        [HttpPost]
        [ActionName("postCerrarSession")]
        public object postCerrarSession()
        {
            vSesiones.sesionUsuarioDTO = null;
            return vSesiones.sesionUsuarioDTO;
        }
        public ActionResult RecuperarPassword()
        {
            return View();
        }
        [HttpPost]
        [ActionName("AsignarVariable")]
        public object AsignarVariable(UsuarioDTO parametros)
        {
            vSesiones.sesionUsuarioDTO = new UsuarioDTO();
            vSesiones.sesionUsuarioDTO = parametros;
            return vSesiones.sesionUsuarioDTO;
        }

    }
}
