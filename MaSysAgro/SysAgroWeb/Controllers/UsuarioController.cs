using ClsModSysAgro.Usuarios;
using Dapper;
using MaSysAgro;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace SysAgroWeb.Controllers
{
    public class UsuarioController : Controller
    {


        ClsModResponse objResponse = new ClsModResponse();
        string conexion = ConfigurationManager.ConnectionStrings["SysAgroEntities"].ToString();

        public ActionResult postLogearseUsuario(paramsUsuarioDTO parametros)
        {
            objResponse = new ClsModResponse();
            try
            {
                DynamicParameters paramss = new DynamicParameters();

                string contrasena = Funciones.EncriptarMD5(parametros.Contrasena);
                string consultaGenUsuarios = "SELECT * FROM GenUsuarios WHERE Usuario = '{0}' AND Contrasena = '{1}'";
                using (var ctx = new MySqlConnection(conexion))
                {
                    ctx.Open();
                    var objUsuario = ctx.Query<paramsUsuarioDTO>(string.Format(consultaGenUsuarios, parametros.Usuario, contrasena), paramss, null, true, 300).FirstOrDefault();
                    if (objUsuario != null)
                    {
                        if (objUsuario.Activo == true)
                        {
                            objResponse.ITEMS = objUsuario;
                            objResponse.MESSAGE = "";
                            objResponse.SUCCESS = true;
                        }
                        else
                        {
                            objResponse.ITEMS = null;
                            objResponse.MESSAGE = "This user is deactivated.";
                            objResponse.SUCCESS = false;
                        }
                    }
                    else
                    {
                        objResponse.ITEMS = null;
                        objResponse.MESSAGE = "Incorrect data";
                        objResponse.SUCCESS = false;
                    }
                    ctx.Close();
                }

            }
            catch (Exception ex)
            {
                objResponse.ITEMS = null;
                objResponse.MESSAGE = "some error occurred." + ex.Message;
                objResponse.SUCCESS = false;
            }
            return Json(objResponse, JsonRequestBehavior.AllowGet);
        }
        public ActionResult postEditarPerfil(paramsUsuarioDTO parametros)
        {
            objResponse = new ClsModResponse();
            try
            {
                DynamicParameters paramss = new DynamicParameters();
                string contraseñaActual = Funciones.EncriptarMD5(parametros.ContrasenaActual);
                string updateConsulta = "";
                using (var ctx = new MySqlConnection(conexion))
                {
                    ctx.Open();
                    string consultaGenUsuarios = "SELECT * FROM GenUsuarios WHERE Usuario = '{0}' AND Contrasena = '{1}'";
                    var objUsuarioLogeado = ctx.Query<paramsUsuarioDTO>(string.Format(consultaGenUsuarios, parametros.Usuario, contraseñaActual), paramss, null, true, 300).FirstOrDefault();
                    //var objUsuarioLogeado = db.GenUsuarios.Where(r => r.Usuario == parametros.Usuario && r.Contrasena == contraseñaActual).FirstOrDefault();
                    if (objUsuarioLogeado != null)
                    {
                        string consultaGenXId = "SELECT * FROM GenUsuarios WHERE Id = '{0}'";
                        var objUsuario = ctx.Query<paramsUsuarioDTO>(string.Format(consultaGenXId, parametros.Id), paramss, null, true, 300).FirstOrDefault();
                        //var objUsuario = db.GenUsuarios.Where(r => r.Id == parametros.Id).FirstOrDefault();
                        if (objUsuario != null)
                        {
                            updateConsulta = @"UPDATE GenUsuarios SET 
                                                                        Nombre='{0}',
                                                                        ApellidoPaterno='{1}',
                                                                        ApellidoMaterno='{2}',
                                                                        Telefono='{3}',
                                                                        Email='{4}' WHERE Id = {5}
                            ";
                            updateConsulta = string.Format(updateConsulta, parametros.Nombre, parametros.ApellidoPaterno, parametros.ApellidoMaterno, parametros.Telefono, parametros.Email, parametros.Id);
                            objUsuario = ctx.Query<paramsUsuarioDTO>(updateConsulta, paramss, null, true, 300).FirstOrDefault();
                            if (parametros.ImagenPerfil != "" && parametros.ImagenPerfil != null)
                            {
                                updateConsulta = @"UPDATE GenUsuarios SET 
                                                                        ImagenPerfil='{0}' WHERE Id = {1}
                            ";
                                updateConsulta = string.Format(updateConsulta, parametros.ImagenPerfil, parametros.Id);
                                objUsuario = ctx.Query<paramsUsuarioDTO>(updateConsulta, paramss, null, true, 300).FirstOrDefault();

                            }
                            if (parametros.Contrasena != "" && parametros.Contrasena != null)
                            {
                                string contrasena = Funciones.EncriptarMD5(parametros.Contrasena);
                                if (contrasena != objUsuario.Contrasena)
                                {
                                    updateConsulta = @"UPDATE GenUsuarios SET 
                                                                        Contrasena='{0}' WHERE Id = {1}
                            ";
                                    updateConsulta = string.Format(updateConsulta, contrasena, parametros.Id);
                                    objUsuario = ctx.Query<paramsUsuarioDTO>(updateConsulta, paramss, null, true, 300).FirstOrDefault();

                                }
                            }

                            //db.SaveChanges();
                            objUsuario = ctx.Query<paramsUsuarioDTO>(string.Format(consultaGenXId, parametros.Id), paramss, null, true, 300).FirstOrDefault();
                            ctx.Close();
                            objResponse.ITEMS = objUsuario;
                            objResponse.MESSAGE = "Modified successfully";
                            objResponse.SUCCESS = true;
                        }
                        else
                        {
                            objResponse.ITEMS = null;
                            objResponse.MESSAGE = "Incorrect data";
                            objResponse.SUCCESS = false;
                        }
                    }
                    else
                    {
                        objResponse.ITEMS = null;
                        objResponse.MESSAGE = "The password could not be changed because it does not match the data";
                        objResponse.SUCCESS = false;
                    }
                }
            }
            catch (Exception ex)
            {
                objResponse.ITEMS = null;
                objResponse.MESSAGE = "some error occurred" + ex.Message;
                objResponse.SUCCESS = false;
            }
            return Json(objResponse, JsonRequestBehavior.AllowGet);
        }
        public ActionResult postSolicitarContrasena(paramsUsuarioDTO parametros)
        {
            objResponse = new ClsModResponse();
            DynamicParameters paramss = new DynamicParameters();

            try
            {
                using (var ctx = new MySqlConnection(conexion))
                {
                    ctx.Open();
                    string consultaGenUsuarios = "SELECT * FROM GenUsuarios WHERE Usuario = '{0}' AND Email = '{1}'";
                    var objUsuario = ctx.Query<paramsUsuarioDTO>(string.Format(consultaGenUsuarios, parametros.Usuario, parametros.Email), paramss, null, true, 300).FirstOrDefault();
                    //GenUsuarios objUsuario = db.GenUsuarios.Where(r => r.Usuario == parametros.Usuario && r.Email == parametros.Email).FirstOrDefault();
                    if (objUsuario == null)
                    {
                        objResponse.SUCCESS = false;
                        objResponse.ITEMS = null;
                        objResponse.MESSAGE = "Invalid username or email.";
                        return Json(objResponse, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        string contrasena = Funciones.DesencriptarMD5(objUsuario.Contrasena);
                        string HTML = ObtenerEscritoHTML(objUsuario.Usuario, contrasena);
                        // Parte 1
                        string Correo = "adangzlz22@gmail.com";
                        string Contrasena = "okbxuwyjtmnnfxrs";

                        SmtpClient smtp = new SmtpClient();
                        smtp.Host = "smtp.gmail.com";
                        smtp.Port = 587;
                        smtp.EnableSsl = true;
                        smtp.UseDefaultCredentials = false;
                        smtp.Credentials = new NetworkCredential(Correo, Contrasena);
                        // Parte 2
                        MailMessage mm = new MailMessage();
                        mm.IsBodyHtml = true;
                        mm.Priority = MailPriority.Normal;
                        mm.From = new MailAddress(Correo);
                        mm.Subject = "Recuperar Contraseña";
                        mm.Body = HTML;
                        mm.To.Add(new MailAddress(objUsuario.Email));
                        smtp.Send(mm); // Enviar el mensaje
                        objResponse.ITEMS = null;
                        objResponse.MESSAGE = "Mail sent successfully";
                        objResponse.SUCCESS = true;
                    }
                }
            }
            catch (Exception ex)
            {
                objResponse.ITEMS = null;
                objResponse.MESSAGE = "some error occurred" + ex.Message;
                objResponse.SUCCESS = false;
                throw;
            }
            return Json(objResponse, JsonRequestBehavior.AllowGet);
        }
        public string ObtenerEscritoHTML(string Usuario, string Contrasena)
        {
            #region CONTENIDO HTML
            string html = @"
                                                                            <!doctype html>
                                                                            <html xmlns='http://www.w3.org/1999/xhtml' xmlns:v='urn:schemas-microsoft-com:vml'
                                                                                xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:o='urn:schemas-microsoft-com:office:office'
                                                                                style='width:100%;font-family:Arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0'>

                                                                            <head>
                                                                                <title> </title>
                                                                                <meta http-equiv='X-UA-Compatible' content='IE=edge'>
                                                                                <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>
                                                                                <meta name='viewport' content='width=device-width, initial-scale=1'>
                                                                                <style type='text/css'>
                                                                                    #outlook a {
                                                                                        padding: 0;
                                                                                    }
                                                                                    table{
                                                                                        border-color: rgb(230, 230, 230);
                                                                                    }

                                                                                    body {
                                                                                        margin: 0;
                                                                                        padding: 0;
                                                                                        -webkit-text-size-adjust: 100%;
                                                                                        -ms-text-size-adjust: 100%;
                                                                                    }

                                                                                    table,
                                                                                    td {
                                                                                        border-collapse: collapse;
                                                                                        mso-table-lspace: 0pt;
                                                                                        mso-table-rspace: 0pt;
                                                                                    }

                                                                                    img {
                                                                                        border: 0;
                                                                                        height: auto;
                                                                                        line-height: 100%;
                                                                                        outline: none;
                                                                                        text-decoration: none;
                                                                                        -ms-interpolation-mode: bicubic;
                                                                                    }

                                                                                    p {
                                                                                        display: block;
                                                                                        margin: 13px 0;
                                                                                    }
                                                                                </style>
                                                                                <style type='text/css'>
                                                                                    @media only screen and (min-width:480px) {
                                                                                        .mj-column-per-100 {
                                                                                            width: 100% !important;
                                                                                            max-width: 100%;
                                                                                        }

                                                                                        .mj-column-per-50 {
                                                                                            width: 50% !important;
                                                                                            max-width: 50%;
                                                                                        }
                                                                                    }
                                                                                </style>
                                                                                <style type='text/css'>
                                                                                    @media only screen and (max-width:480px) {
                                                                                        table.mj-full-width-mobile {
                                                                                            width: 100% !important;
                                                                                        }

                                                                                        td.mj-full-width-mobile {
                                                                                            width: auto !important;
                                                                                        }
                                                                                    }
                                                                                </style>
                                                                            </head>

                                                                            <body style='background-color:#f4f4f4;'>
                                                                                <div style='background-color:#f4f4f4;'>
                                                                                    <div style='background:#fff;background-color:#fff;margin:0px auto;max-width:600px;'>
                                                                                        <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' 
                                                                                            style='background:#004b87;background-color:#004b87;width:600px;'>
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        style='direction:ltr;font-size:0px;padding:10px 0;padding-bottom:0px;padding-top:5px;text-align:center;'>
                                                                                                        <div class='mj-column-per-100 mj-outlook-group-fix'
                                                                                                            style='font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;'>
                                                                                                            <table border='0' cellpadding='0' cellspacing='0' role='presentation'
                                                                                                                style='vertical-align:top;' width='100%'>
                                                                                                                <tr>
                                                                                                                    <td align='center'
                                                                                                                        style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                                                                                                                        <table border='0' cellpadding='0' cellspacing='0' role='presentation'
                                                                                                                            style='border-collapse:collapse;border-spacing:0px;'>
                                                                                                                            <tbody>
                                                                                                                                <tr>
                                                                                                                                    <td style='width:200px;'> img</td>
                                                                                                                                </tr>
                                                                                                                            </tbody>
                                                                                                                        </table>
                                                                                                                    </td>
                                                                                                                </tr>

                                                                                                            </table>
                                                                                                        </div>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </div>

                                                                                    <div style='background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;'>
                                                                                        <table align='center' border='1' cellpadding='0' cellspacing='0' role='presentation'
                                                                                            style='background:#ffffff;background-color:#ffffff;width:600px; border-color:  #ffffff;'>
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td style='direction:ltr;font-size:0px;padding:0px 0;padding-bottom:0px;;text-align:center;'>
                                                                                                        <div class='mj-column-per-100 mj-outlook-group-fix'
                                                                                                            style='font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;'>
                               
                                                                                                            <table border='0' cellpadding='0' cellspacing='0' role='presentation'
                                                                                                                style='vertical-align:top;background-color: #ffffff; background: #ffffff; width: 100%;'>
                                   
                                                                                                                <tr>
                                                                                                                    <td align='center'
                                                                                                                        style='font-size:0px;padding:10px 10px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;'>
                                                                                                                        <table border='0' cellpadding='0' cellspacing='0' role='presentation'
                                                                                                                            style='border-collapse:collapse;border-spacing:0px;'>
                                                                                                                            <tbody>
                                                                                                                                <tr>
                                                                                                                                    <td align='center' style='width:350px; text-align: center;'> img</td>
                                                                                                                                </tr>
                                                                                                                            </tbody>
                                                                                                                        </table>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td align='left' style='font-size:0px;padding:10px 25px;padding-top:10px;padding-bottom:10px;word-break:break-word;'>
                                                                                                                        <div style='font-family:Arial, sans-serif;font-size:35px;line-height:22px;text-align:left;color:#2e3192;'>
                                                                                                                          <p style='line-height: 35px; margin: 10px 0; text-align: center; color:#000; font-size:35px; font-family:Montserrat, sans-serif; font-weight: 700;'> ¡Bienvenido a <br> <span style='color:#004b87'>SysAgro!</span></p>
                                                                                                                          <p style='line-height: 25px; margin: 10px 0; text-align: center; color:#000; font-size:15px; font-family:Montserrat, sans-serif; font-weight: 500;'> Se ha solicitado la contraseña.</p>
                                                                                                                        </div>
                                                                                                                      </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td align='left'
                                                                                                                        style='font-size:0px;padding:5px 25px;padding-bottom:10px;word-break:break-word;'>
                                                                                                                        <div
                                                                                                                            style='font-family:Arial, sans-serif;font-size:30px;line-height:22px;text-align:center;color:#2e3192;'>
                                                
                                               
                                                                                                                            <p
                                                                                                                                style='line-height: 30px; margin: 10px 0; text-align: center; color:#424242; font-size:20px; font-family:Poppins, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif; font-weight: 600;'>
                                                                                                                                <span style='color: #004b87;'>Usuario:</span> " + Usuario + @"<br>

                                                                                                                                <span style='color: #004b87;'>Contraseña:</span> " + Contrasena + @"</p>



                                                                                                                        </div>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td align='left'
                                                                                                                        style='font-size:0px;padding:0px 25px 0px 25px;word-break:break-word;'>
                                                                                                                        <div
                                                                                                                            style='font-family:Arial, sans-serif;font-size:14px;line-height:25px;text-align:center;color:#000; border-radius: 50px;'>
                                               
                                              
                                                
                                               
                                                                                                                            <a href='#'
                                                                                                                            class='btn-btn-primary'
                                                                                                                            style='font-family:Arial, sans-serif; border-radius: 5px; text-decoration: none;font-size:16px;color:#FFFFFF;border-style:solid;border-color:#004b87;border-width:10px 30px 10px 30px;display:inline-block;background:#004b87;border-radius:0px;font-weight:normal;font-style:normal;line-height:19px;width:auto;text-align:center; margin: botton 10px;'>Haz clic aquí</a>
                                            
                                               

                                                                                                                            <br>
                                                                                                                        </div>
                                                                                                                    </td>

                                                                                                                </tr>
                                  
                                                                                                                <tr>
                                                                                                                    <td style='direction:ltr;font-size:0px;padding:0px 0;padding-bottom:0px;;text-align:center;'>
                                                                                                                        <div class='mj-column-per-100 mj-outlook-group-fix'
                                                                                                                            style='font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;'>
                                                                                                                            <table border='0' cellpadding='0' cellspacing='0' role='presentation'
                                                                                                                                style='vertical-align:top;background-color:  #ffffff; background:  #ffffff; width: 100%;'>
                
                                                                                                                                <tr>
                                                                                                                                    <td align='center'
                                                                                                                                        style='font-size:0px;padding:10px 25px;padding-bottom:10px;word-break:break-word;'>
                                                                                                                                        <div style='font-family:Arial, sans-serif;text-align:center;color:#424242;'>
                                                              
                
                
                                                                                                                                        </div>
                                                                                                                                    </td>
                
                                                                                                                                </tr>
                                             
                
                
                                                                                                                            </table>
                                                                                                                        </div>
                
                                                                                                                    </td>
                                                                                                                </tr>
                

                                                                                                            </table>
                                                                                                        </div>

                                                                                                    </td>
                                                                                                </tr>

                                                                                            </tbody>
                                                                                        </table>
                                                                                    </div>
       


                                                                                </div>

                                                                                <div
                                                                                    style='background:#000000;background-color:#000000;margin:0px auto;max-width:600px;'>
                                                                                    <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation'
                                                                                        style='background:#000000;background-color:#000000;width:600px;'>
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td style='direction:ltr;font-size:0px;padding:20px 0;text-align:center;'>
                                                                                                    <div class='mj-column-per-100 mj-outlook-group-fix'
                                                                                                        style='font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;'>
                                                                                                        <table border='0' cellpadding='0' cellspacing='0' role='presentation'
                                                                                                            style='vertical-align:top; width: 100%;'>
                                                                                                            <tr>
                                                                                                                <td align='center' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                                                                                                                    <div
                                                                                                                        style='font-family:Arial, sans-serif;font-size:13px;line-height:22px;text-align:center;color:#ffffff;'>
                                                                                                                        Enviado automaticamente
                                                                                                                        &nbsp;por&nbsp;<a style='color:#ffffff'
                                                                                                                            href='#'><b>url</b></a></div>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        </table>
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>



                                                                            </body>

                                                                            </html>

        ";

            #endregion
            return html;
        }
        public ActionResult postRegistrarse(paramsUsuarioDTO parametros)
        {
            objResponse = new ClsModResponse();
            try
            {
                DynamicParameters paramss = new DynamicParameters();

                string contrasena = Funciones.EncriptarMD5(parametros.Contrasena);
                string consultaGenUsuarios = "SELECT * FROM GenUsuarios WHERE Usuario = '{0}'";
                using (var ctx = new MySqlConnection(conexion))
                {
                    ctx.Open();
                    var objUsuario = ctx.Query<dynamic>(string.Format(consultaGenUsuarios, parametros.Usuario), paramss, null, true, 300).FirstOrDefault();
                    if (objUsuario == null)
                    {
                        consultaGenUsuarios = "SELECT * FROM GenUsuarios WHERE Email = '{0}'";
                        var objEmail = ctx.Query<dynamic>(string.Format(consultaGenUsuarios, parametros.Email), paramss, null, true, 300).FirstOrDefault();
                        if (objEmail == null)
                        {
                            string fechaActual = @"" + DateTime.Now.Year + "-" + DateTime.Now.Month + "-" + DateTime.Now.Day + " " + DateTime.Now.Hour + ":" + DateTime.Now.Minute + ":" + DateTime.Now.Second + "";
                            consultaGenUsuarios = @"INSERT INTO GenUsuarios
           (IdSucursal
           ,Usuario
           ,Contrasena
           ,Nombre
           ,ApellidoPaterno
           ,ApellidoMaterno
           ,Telefono
           ,Email
           ,Activo
           ,Token
           ,FechaIngreso
           ,FechaExpiracion
           ,ImagenPerfil
           ,IDUnico
           ,TelefonoContacto)
     VALUES
           (1
           ,'" + parametros.Usuario + @"'
           ,'" + contrasena + @"'
           ,'" + parametros.Nombre + @"'
           ,'" + parametros.ApellidoPaterno + @"'
           ,''
           ,''
           ,'" + parametros.Email + @"'
           ,true
           ,''
           ,'" + fechaActual + @"'
           ,NULL
           ,''
           ,''
           ,'')";

                            var objRegistro = ctx.Query<dynamic>(string.Format(consultaGenUsuarios, parametros.Email), paramss, null, true, 300).FirstOrDefault();

                            objResponse.ITEMS = null;
                            objResponse.MESSAGE = "Registered user successfully";
                            objResponse.SUCCESS = true;
                        }
                        else
                        {
                            objResponse.ITEMS = null;
                            objResponse.MESSAGE = "This Email is already registered";
                            objResponse.SUCCESS = false;
                        }
                    }
                    else
                    {
                        objResponse.ITEMS = null;
                        objResponse.MESSAGE = "This user is already registered";
                        objResponse.SUCCESS = false;
                    }
                    ctx.Close();
                }

            }
            catch (Exception ex)
            {
                objResponse.ITEMS = null;
                objResponse.MESSAGE = "some error occurred." + ex.Message;
                objResponse.SUCCESS = false;
            }
            return Json(objResponse, JsonRequestBehavior.AllowGet);
        }


    }
}
