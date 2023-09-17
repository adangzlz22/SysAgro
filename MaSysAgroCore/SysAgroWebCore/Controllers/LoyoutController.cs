using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SysAgroWeb.Clase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SysAgroWebCore.Controllers
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
