using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClsModSysAgro.menu
{
    public class genmenu
    {
        public int Id { get; set; }
        public int IdPadre { get; set; }
        public string Titulo { get; set; }
        public string Description { get; set; }
        public string Redirect { get; set; }
        public string Image { get; set; }
        public bool Activo { get; set; }
    }
}
