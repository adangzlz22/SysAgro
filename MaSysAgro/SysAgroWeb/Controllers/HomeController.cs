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
            if (vSesiones.sesionUsuarioDTO != null)
            {
                ViewBag.Nombre = vSesiones.sesionUsuarioDTO.Nombre + " " + vSesiones.sesionUsuarioDTO.ApellidoPaterno + " " + vSesiones.sesionUsuarioDTO.ApellidoMaterno;
                ViewBag.Id = vSesiones.sesionUsuarioDTO.Id;
                ViewBag.Nombre1 = vSesiones.sesionUsuarioDTO.Nombre;
                ViewBag.ApellidoPaterno = vSesiones.sesionUsuarioDTO.ApellidoPaterno;
                ViewBag.ApellidoMaterno = vSesiones.sesionUsuarioDTO.ApellidoMaterno;
                ViewBag.Telefono = vSesiones.sesionUsuarioDTO.Telefono;
                ViewBag.Email = vSesiones.sesionUsuarioDTO.Email;
                ViewBag.Usuario = vSesiones.sesionUsuarioDTO.Usuario;
                ViewBag.ImagenPerfil = vSesiones.sesionUsuarioDTO.ImagenPerfil;

                return View();
            }
            else
            {
                return Redirect("/Login/Login");
            }
        }
        public ActionResult Project()
        {
            if (vSesiones.sesionUsuarioDTO != null)
            {
                ViewBag.Nombre = vSesiones.sesionUsuarioDTO.Nombre + " " + vSesiones.sesionUsuarioDTO.ApellidoPaterno + " " + vSesiones.sesionUsuarioDTO.ApellidoMaterno;
                ViewBag.Id = vSesiones.sesionUsuarioDTO.Id;
                ViewBag.Nombre1 = vSesiones.sesionUsuarioDTO.Nombre;
                ViewBag.ApellidoPaterno = vSesiones.sesionUsuarioDTO.ApellidoPaterno;
                ViewBag.ApellidoMaterno = vSesiones.sesionUsuarioDTO.ApellidoMaterno;
                ViewBag.Telefono = vSesiones.sesionUsuarioDTO.Telefono;
                ViewBag.Email = vSesiones.sesionUsuarioDTO.Email;
                ViewBag.Usuario = vSesiones.sesionUsuarioDTO.Usuario;
                ViewBag.ImagenPerfil = vSesiones.sesionUsuarioDTO.ImagenPerfil;

                return View();
            }
            else
            {
                return Redirect("/Login/Login");
            }
        }
        public ActionResult Devices()
        {
            if (vSesiones.sesionUsuarioDTO != null)
            {
                ViewBag.Nombre = vSesiones.sesionUsuarioDTO.Nombre + " " + vSesiones.sesionUsuarioDTO.ApellidoPaterno + " " + vSesiones.sesionUsuarioDTO.ApellidoMaterno;
                ViewBag.Id = vSesiones.sesionUsuarioDTO.Id;
                ViewBag.Nombre1 = vSesiones.sesionUsuarioDTO.Nombre;
                ViewBag.ApellidoPaterno = vSesiones.sesionUsuarioDTO.ApellidoPaterno;
                ViewBag.ApellidoMaterno = vSesiones.sesionUsuarioDTO.ApellidoMaterno;
                ViewBag.Telefono = vSesiones.sesionUsuarioDTO.Telefono;
                ViewBag.Email = vSesiones.sesionUsuarioDTO.Email;
                ViewBag.Usuario = vSesiones.sesionUsuarioDTO.Usuario;
                ViewBag.ImagenPerfil = vSesiones.sesionUsuarioDTO.ImagenPerfil;

                return View();
            }
            else
            {
                return Redirect("/Login/Login");
            }
        }

        public ActionResult About()
        {
            if (vSesiones.sesionUsuarioDTO != null)
            {
                ViewBag.Nombre = vSesiones.sesionUsuarioDTO.Nombre + " " + vSesiones.sesionUsuarioDTO.ApellidoPaterno + " " + vSesiones.sesionUsuarioDTO.ApellidoMaterno;
                ViewBag.Id = vSesiones.sesionUsuarioDTO.Id;
                ViewBag.Nombre1 = vSesiones.sesionUsuarioDTO.Nombre;
                ViewBag.ApellidoPaterno = vSesiones.sesionUsuarioDTO.ApellidoPaterno;
                ViewBag.ApellidoMaterno = vSesiones.sesionUsuarioDTO.ApellidoMaterno;
                ViewBag.Telefono = vSesiones.sesionUsuarioDTO.Telefono;
                ViewBag.Email = vSesiones.sesionUsuarioDTO.Email;
                ViewBag.Usuario = vSesiones.sesionUsuarioDTO.Usuario;
                ViewBag.ImagenPerfil = vSesiones.sesionUsuarioDTO.ImagenPerfil;

                return View();
            }
            else
            {
                return Redirect("/Login/Login");
            }
        }

        public ActionResult Contact()
        {
            if (vSesiones.sesionUsuarioDTO != null)
            {
                ViewBag.Nombre = vSesiones.sesionUsuarioDTO.Nombre + " " + vSesiones.sesionUsuarioDTO.ApellidoPaterno + " " + vSesiones.sesionUsuarioDTO.ApellidoMaterno;
                ViewBag.Id = vSesiones.sesionUsuarioDTO.Id;
                ViewBag.Nombre1 = vSesiones.sesionUsuarioDTO.Nombre;
                ViewBag.ApellidoPaterno = vSesiones.sesionUsuarioDTO.ApellidoPaterno;
                ViewBag.ApellidoMaterno = vSesiones.sesionUsuarioDTO.ApellidoMaterno;
                ViewBag.Telefono = vSesiones.sesionUsuarioDTO.Telefono;
                ViewBag.Email = vSesiones.sesionUsuarioDTO.Email;
                ViewBag.Usuario = vSesiones.sesionUsuarioDTO.Usuario;
                ViewBag.ImagenPerfil = vSesiones.sesionUsuarioDTO.ImagenPerfil;

                return View();
            }
            else
            {
                return Redirect("/Login/Login");
            }
        }
        public ActionResult Perfil()
        {
            if (vSesiones.sesionUsuarioDTO != null)
            {
                ViewBag.Nombre = vSesiones.sesionUsuarioDTO.Nombre + " " + vSesiones.sesionUsuarioDTO.ApellidoPaterno + " " + vSesiones.sesionUsuarioDTO.ApellidoMaterno;
                ViewBag.Id = vSesiones.sesionUsuarioDTO.Id;
                ViewBag.Nombre1 = vSesiones.sesionUsuarioDTO.Nombre;
                ViewBag.ApellidoPaterno = vSesiones.sesionUsuarioDTO.ApellidoPaterno;
                ViewBag.ApellidoMaterno = vSesiones.sesionUsuarioDTO.ApellidoMaterno;
                ViewBag.Telefono = vSesiones.sesionUsuarioDTO.Telefono;
                ViewBag.Email = vSesiones.sesionUsuarioDTO.Email;
                ViewBag.Usuario = vSesiones.sesionUsuarioDTO.Usuario;
                ViewBag.ImagenPerfil = vSesiones.sesionUsuarioDTO.ImagenPerfil;
                

                return View();
            }
            else
            {
                return Redirect("/Login/Login");
            }
        }
        public ActionResult Registrate()
        {
            return View();
        }
    }
}