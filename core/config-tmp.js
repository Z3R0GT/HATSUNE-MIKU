import {watchFile, unwatchFile, readFileSync} from 'fs'
import {fileURLToPath} from 'url'
import chalk from 'chalk'

global.bot_tlf_num = ""
global.bot_ver_cod = ""

global.general_tagg = []
global.general_perm = []

//Seteado desde consola para seguridad
global.admins = []

var time_object_date = new Date()
var time_number_hour = time_object_date.getHours()
var time_message_date

function between(x, min, max) {
    return x >= min && x <= max;
}

if (between(time_number_hour, 0, 9)) {
    time_message_date = "Linda Mañana"
}else if(between(time_number_hour, 10, 13)){
    time_message_date = "Lindo Dia"
}else if (between(time_number_hour, 14, 17)){
    time_message_date = "Linda tarde"
}else{
    time_message_date = "Linda Noche"
}
global.saludo = '💙' + time_message_date

/////////////////////////////////////////////////////////////////////////////////////////////
// Basicamente, setea las horas y tiempo base "global.locale"
/////////////////////////////////////////////////////////////////////////////////////////////
global.time_current_date = new Date(new Date + 3600000);
global.locale     = 'es';
global.time_clock = global.time_current_date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true});
global.time_date  = global.time_current_date.toLocaleDateString(global.locale, {day: 'numeric', month: 'numeric', year: 'numeric'});
global.time_day   = global.time_current_date.toLocaleDateString(global.locale, {weekday: 'long'});
global.time_month = global.time_current_date.toLocaleDateString(global.locale, {month: 'long'});
global.time_year  = global.time_current_date.toLocaleDateString(global.locale, {year: 'numeric'});



/////////////////////////////////////////////////////////////////////////////////////////////
// Manejadores para actualizar JSON de configuración en caso actualizaciones
// Nota:
// Manejadores para mantener los json en tiempo
// se evaluan los json y no js por que evaluar el js implica
// recargar todo el script y probablmente romper algo
/////////////////////////////////////////////////////////////////////////////////////////////

const media_config = "media/config.json"
global.configs = JSON.parse(readFileSync(media_config))
global.APIs = global.configs.APIs
watchFile(
    media_config, 
    () => {
        console.log(chalk.redBright(`Actualizando mi configuración... (\'${media_config}\')`));
        global.configs = JSON.parse(readFileSync(media_config))
        global.APIs = global.configs.APIs
    }
)
const media_dashboard = "media/dashboard.json"
global.dashboards = JSON.parse(readFileSync(media_dashboard))
watchFile(
    media_dashboard, 
    () => {
        console.log(chalk.redBright(`Actualizando mi configuración... (\'${media_dashboard}\')`));
        global.dashboards = JSON.parse(readFileSync(media_dashboard))
    }
)

/////////////////////////////////////////////////////////////////////////////////////////////
// Procesamiento de APIs que tengan clave...
// Nota:
// Logicamente, si quieres agregar una API, tendras que ir al archivo 'config.json'
// y de tener la "key" deberas ponerla aqui, lo que implica recargar todo a diferencia
// del automatizado para recargar config.json, pero no pienso un metodo para actualizar esto
// de mejor manera sin tener otro put0 JSON 
/////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 0 -> zenzapis 
 * 
 * 1 -> xteam
 * 
 * 2 -> neoxr
 * 
 * 3 -> rose (A.K.A "itsrose")
 * 
 */
var keys_gen = [
    ['LuOlangNgentot', 'c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial', 'fiktod', 'BF39D349845E', '675e34de8a', '0b917b905e6f'],
    ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63'],
    ['5VC9rvNx', 'cfALv5'],
    ['4b146102c4d500809da9d1ff']
]

//Nombre desde "global.APIs : CLAVE"
global.APIKeys = {
    [global.APIs.zenzapis] : keys_gen[0][Math.floor(keys_gen[0].length * Math.random())],
    [global.APIs.xteam]    : keys_gen[1][Math.floor(keys_gen[1].length * Math.random())],
    [global.APIs.neoxr]    : keys_gen[2][Math.floor(keys_gen[2].length * Math.random())],
    [global.APIs.fgmods]   : "fg-dylux",    
    [global.APIs.lol]      : "GataDios",
    [global.APIs.botcahx]  : "Admin",
    [global.APIs.ibeng]    : "tamvan",
    [global.APIs.rose]     : "Rs-Zeltoria",
    [global.APIs.xcoders]  : "Frieren",
    [global.APIs.xyroinee] : "uwgflzFEh6",
    [global.APIs.cafirexos]: "BrunoSobrino"
}

//Manejador de actual archivo (actualiza y vuelve a ejecutar)
const file = fileURLToPath(import.meta.url);
watchFile(
    file, 
    () => {
        unwatchFile(file)
        console.log(chalk.redBright(`Actualizando mi configuración... (\'${file}\')`));
        import(`${import.meta.url}?update=${Date.now()}`);
    }
)
