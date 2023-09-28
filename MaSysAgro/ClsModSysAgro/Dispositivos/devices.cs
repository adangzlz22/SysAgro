using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace ClsModSysAgro.Dispositivos
{
    public class devices
    {
        public int player_id { get; set; }
        public string Chip_ID { get; set; }
        public int Radio_Ch { get; set; }
        public string Firmware { get; set; }
        public string Date_Creation { get; set; }
        public int Bat_Level { get; set; }
        public DateTime Time_LastConnex { get; set; }
        public string Model { get; set; }
        public string UserName { get; set; }
        public int ProjectID { get; set; }
        public int ClientID { get; set; }
        public decimal Longitud { get; set; }
        public decimal Latitud { get; set; }
        public int Activo { get; set; }

    }
}
