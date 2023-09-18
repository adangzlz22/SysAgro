using SysAgroWeb.Clase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SysAgroWeb.Controllers
{
    public class LoyoutController : Controller
    {

        public ActionResult postCerrarSession()
        {
            vSesiones.sesionUsuarioDTO = null;
            return Redirect("/Login/Login");
        }

      
    }
}
