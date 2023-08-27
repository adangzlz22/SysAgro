using SysAgroWeb.Clase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SysAgroWeb.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            //if (vSesiones.sesionUsuarioDTO != null)
            //{
            //    ViewBag.Nombre = vSesiones.sesionUsuarioDTO.Nombre + " " + vSesiones.sesionUsuarioDTO.ApellidoPaterno + " " + vSesiones.sesionUsuarioDTO.ApellidoMaterno;
               
                return View();
            //}
            //else
            //{
            //    return Redirect("/Login/Login");
            //}
        }

        public ActionResult About()
        {
            //if (vSesiones.sesionUsuarioDTO != null)
            //{
            //    ViewBag.Nombre = vSesiones.sesionUsuarioDTO.Nombre + " " + vSesiones.sesionUsuarioDTO.ApellidoPaterno + " " + vSesiones.sesionUsuarioDTO.ApellidoMaterno;

            return View();
            //}
            //else
            //{
            //    return Redirect("/Login/Login");
            //}
        }

        public ActionResult Contact()
        {
            //if (vSesiones.sesionUsuarioDTO != null)
            //{
            //    ViewBag.Nombre = vSesiones.sesionUsuarioDTO.Nombre + " " + vSesiones.sesionUsuarioDTO.ApellidoPaterno + " " + vSesiones.sesionUsuarioDTO.ApellidoMaterno;

            return View();
            //}
            //else
            //{
            //    return Redirect("/Login/Login");
            //}
        }
        public ActionResult Perfil()
        {
            //if (vSesiones.sesionUsuarioDTO != null)
            //{
            //    ViewBag.Nombre = vSesiones.sesionUsuarioDTO.Nombre + " " + vSesiones.sesionUsuarioDTO.ApellidoPaterno + " " + vSesiones.sesionUsuarioDTO.ApellidoMaterno;

            return View();
            //}
            //else
            //{
            //    return Redirect("/Login/Login");
            //}
        }
    }
}