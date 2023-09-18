using MaSysAgro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace SysAgroApi.Controllers
{
    public class LoginController : ApiController
    {
        ClsModResponse objResultado = new ClsModResponse();

        [HttpPost]
        [AllowAnonymous]
        [ActionName("postLogearse")]
        public ClsModResponse postLogearse()
        {
            objResultado = new ClsModResponse();

            return objResultado;
        }

        [HttpPost]
        [AllowAnonymous]
        [ActionName("postSalir")]
        public ClsModResponse postSalir()
        {
            objResultado = new ClsModResponse();

            return objResultado;
        }


    }
}
