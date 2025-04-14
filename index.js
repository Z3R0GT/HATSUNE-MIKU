//genericos
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { setupPrimary, fork } from 'cluster'
//menu
import cfonts from 'cfonts'
//usado para hacer bonito el log
import chalk from "chalk";

console.log(chalk.magentaBright("Iniciando una nueva y más optimizado versión de consola..."))

const ROOT_INDEX = dirname(fileURLToPath(import.meta.url))

cfonts.say(
    "Hatsune Miku\nConsole Manager",
    {
        font: "block",
        align: "center",
        colors: ["blue", "cyan"],
        gradient: ["magenta", "cyan"]
    }
)
cfonts.say(
    "Made by DEPOOL (Fixed by Z3R0_GT)",
    {
        font: "console",
        align: "center",
        colors: ["cyan", "cyan", "cyan"]
    }
)

//usado para que la instancia solo ocurra una vez
let is_running = false

function init(module) // file se supone que es String y existe en dentro de "miku"
{
    if (is_running) return
    is_running = true //bruh

    let args = [join(ROOT_INDEX, "core", module), ...process.argv.slice(2)]
    cfonts.say(
        ["Init:",process.argv[0],"Arguments:", ...args].join(' -- '), 
        {
            font: 'console',
            align: 'center',
            colors: ['white', 'blue']
        }
    )

    setupPrimary(
        {
            exec: args[0],
            args: args.slice(1)
        }
    )
    
    let child = fork()

    //Estados de los hilos🧵
    child.on(
        "message",
        data => {
            switch (data)
            {
                //Reinicia el hilo donde corre el programa
                case "reset":
                    child.process.kill()
                    is_running = false
                    start(module)
                    break
                //Obtiene cuanto tiempo a esta activo el actual hilo
                case "uptime":
                    child.send(process.uptime())
                    break
                case "kill":
                    process.exit()
                    break
            }
        }
    )

    //En caso el hilo muera misteriosamente
    child.on("exit", 
        (_, code) => {
            is_running = false
            console.error(chalk.redBright('💙 Error:\n'), code)
            process.exit()
        }
    )
}

process.on('warning', warning => {
        if (warning.name === 'MaxListenersExceededWarning') 
        {
            console.warn(chalk.yellow('💙 Se excedió el límite de Listeners en:'))
            console.warn(warning.stack)
        }   
    }
)


init("start-tmp.js")