using ClsModSysAgro.Dispositivos;
using ClsModSysAgro.menu;
using ClsModSysAgro.Project;
using ClsModSysAgro.Usuarios;
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
        #region VARIABLES
        ClsModResponse objResponse = new ClsModResponse();
        string conexion = ConfigurationManager.ConnectionStrings["SysAgroEntities"].ToString();
        DynamicParameters paramss = new DynamicParameters();
        #endregion

        #region VISTAS
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
        public ActionResult Mapa(int projectId)
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
                ViewBag.projectId = projectId;


                return View();
            }
            else
            {
                return Redirect("/Login/Login");
            }
        }
        #endregion

        #region PROJECT

        public ActionResult postObtenerProjectos(paramsProject parametros)
        {
            objResponse = new ClsModResponse();
            paramss = new DynamicParameters();
            try
            {
                string consulta = "SELECT * FROM projects WHERE ClientID={0} AND Activo={1}";
                using (var ctx = new MySqlConnection(conexion))
                {
                    ctx.Open();
                    consulta = string.Format(consulta, vSesiones.sesionUsuarioDTO.Id, parametros.Activo);
                    var objProject = ctx.Query<resultProject>(consulta, paramss, null, true, 300).ToList();
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
        public ActionResult postAddProjectos(paramsProject parametros)
        {
            objResponse = new ClsModResponse();
            paramss = new DynamicParameters();
            try
            {
                string consulta = @"INSERT INTO projects (ProjectName, ClientID, Longitud_1,Latitud_1, Longitud_2, Latitud_2,Activo) 
                                    VALUES ('{0}',{1},0.0, 0.0, 0.0, 0.0,1);";

                string Existe = @"SELECT * FROM projects WHERE ProjectName = '{0}';";

                using (var ctx = new MySqlConnection(conexion))
                {
                    if (parametros.ProjectName != "" && parametros.ProjectName != null)
                    {
                        consulta = string.Format(consulta, parametros.ProjectName, parametros.ClientID);

                        Existe = string.Format(Existe, parametros.ProjectName);
                        ctx.Open();
                        var objExiste = ctx.Query<dynamic>(Existe, paramss, null, true, 300).FirstOrDefault();
                        if (objExiste == null)
                        {
                            var objProject = ctx.Query<dynamic>(consulta, paramss, null, true, 300).FirstOrDefault();

                            objResponse.ITEMS = objProject;
                            objResponse.MESSAGE = "project added successfully.";
                            objResponse.SUCCESS = true;

                        }
                        else
                        {
                            objResponse.ITEMS = null;
                            objResponse.MESSAGE = "this project already exists in the database.";
                            objResponse.SUCCESS = false;
                        }

                    }
                    else
                    {
                        objResponse.ITEMS = null;
                        objResponse.MESSAGE = "You cannot add a property with empty text.";
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
        public ActionResult postUpdateProjectos(paramsProject parametros)
        {
            objResponse = new ClsModResponse();
            paramss = new DynamicParameters();
            try
            {
                string consulta = @"UPDATE projects SET
                                    ProjectName = '{0}' 
                                    WHERE ProjectID = {1};";
                string Existe = @"SELECT * FROM projects WHERE ProjectName = '{0}';";

                using (var ctx = new MySqlConnection(conexion))
                {
                    consulta = string.Format(consulta, parametros.ProjectName, parametros.ProjectID);

                    Existe = string.Format(Existe, parametros.ProjectName);
                    ctx.Open();
                    var objExiste = ctx.Query<resultProject>(Existe, paramss, null, true, 300).FirstOrDefault();
                    if (objExiste == null)
                    {
                        var objProject = ctx.Query<dynamic>(consulta, paramss, null, true, 300).FirstOrDefault();
                        objResponse.ITEMS = objProject;
                        objResponse.MESSAGE = "project update successfully.";
                        objResponse.SUCCESS = true;
                    }
                    else
                    {
                        objResponse.ITEMS = null;
                        objResponse.MESSAGE = "this project already exists in the database.";
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
        public ActionResult postActivarDesProjectos(paramsProject parametros)
        {
            objResponse = new ClsModResponse();
            paramss = new DynamicParameters();
            try
            {
                string consulta = @"UPDATE projects SET
                                    Activo = {0} 
                                    WHERE ProjectID = {1};";
                string Existe = @"SELECT * FROM projects WHERE ProjectID = {0};";

                using (var ctx = new MySqlConnection(conexion))
                {
                    consulta = string.Format(consulta, parametros.Activo, parametros.ProjectID);

                    Existe = string.Format(Existe, parametros.ProjectID);
                    ctx.Open();
                    var objProject = ctx.Query<resultProject>(consulta, paramss, null, true, 300).FirstOrDefault();
                    var objExiste = ctx.Query<resultProject>(Existe, paramss, null, true, 300).FirstOrDefault();
                    if (objExiste != null)
                    {
                        string message = "{0} project with output";
                        if (objExiste.Activo == 1)
                        {
                            message = string.Format(message, "enabled");
                        }
                        else
                        {
                            message = string.Format(message, "disabled");
                        }
                        objResponse.ITEMS = objExiste;
                        objResponse.MESSAGE = message;
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
        #endregion

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
        public ActionResult postObtenerDispositivosPorCliente(paramsProject paramsProject)
        {
            objResponse = new ClsModResponse();
            paramss = new DynamicParameters();
            try
            {
                string consulta = "SELECT * FROM player_data WHERE ClientID = {0} ";
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

        public ActionResult postObtenerDispositivos(paramsProject paramsProject)
        {
            objResponse = new ClsModResponse();
            paramss = new DynamicParameters();
            try
            {
                string consulta = "SELECT * FROM player_data WHERE ClientID = {0} AND Activo = {1}";
                using (var ctx = new MySqlConnection(conexion))
                {
                    consulta = string.Format(consulta, vSesiones.sesionUsuarioDTO.Id, paramsProject.Activo);
                    ctx.Open();
                    var objProject = ctx.Query<devices>(consulta, paramss, null, true, 300).ToList();
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
        public ActionResult postObtenerDispositivosMenu(paramsProject paramsProject)
        {
            objResponse = new ClsModResponse();
            paramss = new DynamicParameters();
            try
            {
                string consulta = "SELECT * FROM player_data WHERE ClientID = {0}";
                using (var ctx = new MySqlConnection(conexion))
                {
                    consulta = string.Format(consulta, vSesiones.sesionUsuarioDTO.Id);
                    ctx.Open();
                    var objProject = ctx.Query<devices>(consulta, paramss, null, true, 300).ToList();
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
        public ActionResult postUpdateDispositivos(paramsProject paramsProject)
        {
            objResponse = new ClsModResponse();
            paramss = new DynamicParameters();
            try
            {
                string consulta = "UPDATE player_data SET Activo = {0} WHERE player_id = {1}";
                using (var ctx = new MySqlConnection(conexion))
                {
                    consulta = string.Format(consulta, paramsProject.Activo, paramsProject.player_id);
                    ctx.Open();
                    var objProject = ctx.Query<devices>(consulta, paramss, null, true, 300).FirstOrDefault();
                    consulta = "SELECT * FROM player_data WHERE player_id = {0}";
                    consulta = string.Format(consulta, paramsProject.player_id);
                    var Device = ctx.Query<devices>(consulta, paramss, null, true, 300).FirstOrDefault();
                    if (Device != null)
                    {
                        string message = "{0} device with output";
                        if (paramsProject.Activo == 1)
                        {
                            message = string.Format(message, "enabled");
                        }
                        else
                        {
                            message = string.Format(message, "disabled");
                        }
                        objResponse.ITEMS = Device;
                        objResponse.MESSAGE = message;
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
                string consulta = "UPDATE player_data SET ClientID={0} WHERE player_id={1}";
                string consulta2 = "SELECT * FROM player_data WHERE player_id={0}";
                consulta = string.Format(consulta, paramsProject.ClientID, paramsProject.player_id);
                consulta2 = string.Format(consulta2, paramsProject.player_id);
                using (var ctx = new MySqlConnection(conexion))
                {
                    ctx.Open();
                    var objProject2 = ctx.Query<devices>(consulta2, paramss, null, true, 300).FirstOrDefault();
                    if (objProject2 != null)
                    {
                        if (objProject2.ClientID == 0)
                        {
                            var objProject = ctx.Query<dynamic>(consulta, paramss, null, true, 300).FirstOrDefault();

                            objResponse.ITEMS = objProject;
                            objResponse.MESSAGE = "Device added successfully.";
                            objResponse.SUCCESS = true;
                        }
                        else
                        {
                            objResponse.ITEMS = null;
                            objResponse.MESSAGE = "This device is already associated with another client.";
                            objResponse.SUCCESS = false;

                        }
                    }
                    else
                    {
                        objResponse.ITEMS = null;
                        objResponse.MESSAGE = "Device not found.";
                        objResponse.SUCCESS = false;
                    }
                }
            }
            catch (Exception ex)
            {

                objResponse.ITEMS = null;
                objResponse.MESSAGE = "this a problem whit db. " + ex.ToString();
                objResponse.SUCCESS = false;
            }
            return Json(objResponse, JsonRequestBehavior.AllowGet);
        }

        public ActionResult postBuscarDispositivoPorProyecto(paramsProject paramsProject)
        {
            objResponse = new ClsModResponse();
            paramss = new DynamicParameters();

            try
            {
                string consulta = "UPDATE player_data SET ClientID={0}, ProjectID={2} WHERE player_id={1}";
                string consulta2 = "SELECT * FROM player_data WHERE player_id={0}";
                consulta = string.Format(consulta, paramsProject.ClientID, paramsProject.player_id, paramsProject.ProjectID);
                consulta2 = string.Format(consulta2, paramsProject.player_id);
                using (var ctx = new MySqlConnection(conexion))
                {
                    ctx.Open();
                    var objProject2 = ctx.Query<devices>(consulta2, paramss, null, true, 300).FirstOrDefault();
                    if (objProject2 != null)
                    {
                        if (objProject2.ClientID == 0)
                        {
                            var objProject = ctx.Query<dynamic>(consulta, paramss, null, true, 300).FirstOrDefault();

                            objResponse.ITEMS = objProject;
                            objResponse.MESSAGE = "Device added successfully.";
                            objResponse.SUCCESS = true;
                        }
                        else
                        {
                            objResponse.ITEMS = null;
                            objResponse.MESSAGE = "This device is already associated with another client.";
                            objResponse.SUCCESS = false;

                        }
                    }
                    else
                    {
                        objResponse.ITEMS = null;
                        objResponse.MESSAGE = "Device not found.";
                        objResponse.SUCCESS = false;
                    }
                }
            }
            catch (Exception ex)
            {

                objResponse.ITEMS = null;
                objResponse.MESSAGE = "this a problem whit db. " + ex.ToString();
                objResponse.SUCCESS = false;
            }
            return Json(objResponse, JsonRequestBehavior.AllowGet);
        }

        public ActionResult postAsignarDispositivoLocalizacion(paramsProject paramsProject)
        {
            objResponse = new ClsModResponse();
            paramss = new DynamicParameters();

            try {
                string consulta = "UPDATE player_data SET ClientID={0}, ProjectID={1}, Longitud='{2}', Latitud='{3}' WHERE player_id={4}";
                string consulta2 = "SELECT * FROM player_data WHERE ClientID={0} and player_id={1}";
                
                consulta = string.Format(consulta, paramsProject.ClientID, paramsProject.ProjectID, paramsProject.Longitud_1, paramsProject.Latitud_1, paramsProject.player_id);
                consulta2 = string.Format(consulta2, paramsProject.ClientID, paramsProject.player_id);
                
                using (var ctx = new MySqlConnection(conexion)) {
                    ctx.Open();
                    var objProject2 = ctx.Query<devices>(consulta2, paramss, null, true, 300).FirstOrDefault();
                    if (objProject2 != null) {
                        var objProject = ctx.Query<dynamic>(consulta, paramss, null, true, 300).FirstOrDefault();
                        if (objProject == null) {
                            objResponse.ITEMS = objProject;
                            objResponse.MESSAGE = "Device added successfully.";
                            objResponse.SUCCESS = true;
                        } else {
                            //objResponse.MESSAGE = "An error occurred while trying to perform this process.";
                            objResponse.MESSAGE = consulta;
                            objResponse.SUCCESS = false;
                        }    
                    } else {
                        objResponse.ITEMS = null;
                        objResponse.MESSAGE = "Device not found.";
                        objResponse.SUCCESS = false;
                    }
                }
            } catch (Exception ex) {
                objResponse.ITEMS = null;
                objResponse.MESSAGE = "this a problem whit db. " + ex.ToString();
                objResponse.SUCCESS = false;
            }
            return Json(objResponse, JsonRequestBehavior.AllowGet);
        }
        public ActionResult postObtenerUsuarios()
        {
            objResponse = new ClsModResponse();
            paramss = new DynamicParameters();
            try
            {
                string consulta = "SELECT * FROM genusuarios WHERE IdRol!=1";
                using (var ctx = new MySqlConnection(conexion))
                {
                    ctx.Open();
                    var objProject = ctx.Query<genUsuarios>(consulta, paramss, null, true, 300).ToList();
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
    }
}