using ClsModSysAgro.Dispositivos;
using ClsModSysAgro.menu;
using ClsModSysAgro.Project;
using Dapper;
using MaSysAgro;
using MySql.Data.MySqlClient;
using SysAgroWeb.Clase;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SysAgroWeb.Controllers
{
    public class HomeController : Controller
    {
        ClsModResponse objResponse = new ClsModResponse();
        string conexion = ConfigurationManager.ConnectionStrings["SysAgroEntities"].ToString();
        DynamicParameters paramss = new DynamicParameters();

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
                ViewBag.IdRol = vSesiones.sesionUsuarioDTO.IdRol;

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
                ViewBag.IdRol = vSesiones.sesionUsuarioDTO.IdRol;

                return View();
            }
            else
            {
                return Redirect("/Login/Login");
            }
        }
        public ActionResult ProjectDetails()
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
                ViewBag.IdRol = vSesiones.sesionUsuarioDTO.IdRol;

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
                ViewBag.IdRol = vSesiones.sesionUsuarioDTO.IdRol;

                return View();
            }
            else
            {
                return Redirect("/Login/Login");
            }
        }
        public ActionResult Usuarios()
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
                ViewBag.IdRol = vSesiones.sesionUsuarioDTO.IdRol;

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
                ViewBag.IdRol = vSesiones.sesionUsuarioDTO.IdRol;

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
                ViewBag.IdRol = vSesiones.sesionUsuarioDTO.IdRol;

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
                ViewBag.IdRol = vSesiones.sesionUsuarioDTO.IdRol;


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

        public ActionResult Mapa()
        {
            return View();
        }

        //SELECT* FROM player_data WHERE ClientID IN(SELECT ClientID FROM player_data WHERE Chip_ID = 18923812);
        public ActionResult postObtenerProjectos()
        {
            objResponse = new ClsModResponse();
            paramss = new DynamicParameters();
            try
            {
                string consulta = "SELECT * FROM projects WHERE ClientID={0}";
                using (var ctx = new MySqlConnection(conexion))
                {
                    ctx.Open();
                    var objProject = ctx.Query<dynamic>(string.Format(consulta, vSesiones.sesionUsuarioDTO.Id), paramss, null, true, 300).ToList();
                    if (objProject == null)
                    {
                        objResponse.ITEMS = objProject;
                        objResponse.MESSAGE = "";
                        objResponse.SUCCESS = true;
                    }
                    else
                    {
                        objResponse.ITEMS = null;
                        objResponse.MESSAGE = "this a problem whit db";
                        objResponse.SUCCESS = false;
                    }

                }
            }
            catch (Exception ex)
            {
                objResponse.ITEMS = null;
                objResponse.MESSAGE = ex.Message;
                objResponse.SUCCESS = false;
            }

            return Json(objResponse, JsonRequestBehavior.AllowGet);
        }
        public ActionResult postObtenerDispositivosPorProjecto(paramsProject paramsProject)
        {
            objResponse = new ClsModResponse();
            paramss = new DynamicParameters();
            try
            {
                string consulta = "SELECT * FROM player_data WHERE ClientID = {0} AND ProjectID = {1}";
                using (var ctx = new MySqlConnection(conexion))
                {
                    ctx.Open();
                    var objProject = ctx.Query<dynamic>(string.Format(consulta, vSesiones.sesionUsuarioDTO.Id, paramsProject.ProjectID), paramss, null, true, 300).ToList();
                    if (objProject == null)
                    {
                        objResponse.ITEMS = objProject;
                        objResponse.MESSAGE = "";
                        objResponse.SUCCESS = true;
                    }
                    else
                    {
                        objResponse.ITEMS = null;
                        objResponse.MESSAGE = "this a problem whit db";
                        objResponse.SUCCESS = false;
                    }

                }
            }
            catch (Exception ex)
            {
                objResponse.ITEMS = null;
                objResponse.MESSAGE = ex.Message;
                objResponse.SUCCESS = false;
            }

            return Json(objResponse, JsonRequestBehavior.AllowGet);
        }
        public ActionResult postObtenerDispositivos(paramsProject paramsProject)
        {
            objResponse = new ClsModResponse();
            paramss = new DynamicParameters();
            try
            {
                string consulta = "SELECT * FROM player_data WHERE ClientID = {0}";
                using (var ctx = new MySqlConnection(conexion))
                {
                    ctx.Open();
                    var objProject = ctx.Query<devices>(string.Format(consulta, vSesiones.sesionUsuarioDTO.Id, paramsProject.ProjectID), paramss, null, true, 300).ToList();
                    if (objProject.Count() != 0)
                    {
                        objResponse.ITEMS = objProject;
                        objResponse.MESSAGE = "";
                        objResponse.SUCCESS = true;
                    }
                    else
                    {
                        objResponse.ITEMS = null;
                        objResponse.MESSAGE = "this a problem whit db";
                        objResponse.SUCCESS = false;
                    }

                }
            }
            catch (Exception ex)
            {
                objResponse.ITEMS = null;
                objResponse.MESSAGE = ex.Message;
                objResponse.SUCCESS = false;
            }

            return Json(objResponse, JsonRequestBehavior.AllowGet);
        }
        public ActionResult postObtenerMenu()
        {
            objResponse = new ClsModResponse();
            paramss = new DynamicParameters();
            try
            {
                string consulta = "SELECT * FROM genmenu WHERE Activo=1";
                using (var ctx = new MySqlConnection(conexion))
                {
                    ctx.Open();
                    var objProject = ctx.Query<genmenu>(consulta, paramss, null, true, 300).ToList();
                    if (objProject.Count() > 0)
                    {
                        objResponse.ITEMS = objProject;
                        objResponse.MESSAGE = "";
                        objResponse.SUCCESS = true;
                    }
                    else
                    {
                        objResponse.ITEMS = null;
                        objResponse.MESSAGE = "this a problem whit db";
                        objResponse.SUCCESS = false;
                    }

                }
            }
            catch (Exception ex)
            {
                objResponse.ITEMS = null;
                objResponse.MESSAGE = ex.Message;
                objResponse.SUCCESS = false;
            }

            return Json(objResponse, JsonRequestBehavior.AllowGet);
        }
        public ActionResult postBuscarDispositivo(paramsProject paramsProject)
        {
            objResponse = new ClsModResponse();
            paramss = new DynamicParameters();

            try
            {
                string consulta = "UPDATE player_data SET ClientID={0} WHERE Chip_ID='{1}'";
                consulta = string.Format(consulta, paramsProject.ClientID, paramsProject.Chip_ID);
                using (var ctx = new MySqlConnection(conexion))
                {
                    ctx.Open();
                    var objProject = ctx.Query<dynamic>(consulta, paramss, null, true, 300).FirstOrDefault();

                    objResponse.ITEMS = objProject;
                    objResponse.MESSAGE = "Device added successfully.";
                    objResponse.SUCCESS = true;


                }
            }
            catch (Exception ex)
            {
           
                objResponse.ITEMS = null;
                objResponse.MESSAGE = "this a problem whit db. "+ ex.ToString();
                objResponse.SUCCESS = false;
            }
            return Json(objResponse, JsonRequestBehavior.AllowGet);
        }




    }
}