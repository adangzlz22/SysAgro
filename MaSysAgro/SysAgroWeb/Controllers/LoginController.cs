using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SysAgroWeb.Controllers
{
    public class LoginController : Controller
    {
      
        public ActionResult Login()
        {
            return View();
        }
        public JsonResult postCerrarSession()
        {
            var obj = new
            {
                hola = ""
            };
            return Json(obj, JsonRequestBehavior.AllowGet);
        }
        public ActionResult RecuperarPassword()
        {
            return View();
        }
        public JsonResult postRecuperarContraseña()
        {
            var obj = new
            {
                adan = ""
            };

            return Json(obj, JsonRequestBehavior.AllowGet);
        }
    }
}
