//Archivo principal
import "./config-tmp.js"

//Configuración para solo aceptar conexiones SSL/TLS
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = "1"

//////////////////////////////////////////
//Exportaciones
//
//////////////////////////////////////////
// Manejo de archivo/direcciones
import { fileURLToPath, pathToFileURL } from "url"
import path, { join } from 'path'
import {
    watchFile,
    unwatchFile,
    
    readSync,
    readFileSync,
    
    statSync,
    unlinkSync,
    watch,

    mkdirSync,
    existsSync,
} from 'fs'

//////////////////////////////////////////
/////// Sistema
// Funciones
import { createRequire } from "module"
import { spawn } from 'child_process'
import { platform } from 'process'
import { Boom } from '@hapi/boom'
import { format } from 'util'
// Alias
import syntaxerror from 'syntax-error'
import NodeCache from 'node-cache'
import readline from 'readline'
import lodash from 'lodash'
const { chain } = lodash
import Pino from 'pino'
// Variables de usp
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000

//////////////////////////////////////////
// Base de datos
import {Low, JSONFile} from 'lowdb'

//////////////////////////////////////////
// Configuración
//TODO: algún dia simple.js y muchas otras cosas deberias ser verificadas
import { makeWASocket, protoType, serialize } from '../lib/simple.js'
import pkg from 'google-libphonenumber'
const phone_util = pkg.PhoneNumberUtil.getInstance()
import store from '../lib/store.js'

import yargs from 'yargs'
const {
    DisconnectReason , 
    useMultiFileAuthState, 
    fetchLatestBaileysVersion, 
    makeCacheableSignalKeyStore
} = await import("@whiskeysockets/baileys")

//////////////////////////////////////////
// Son bonitas
import chalk from 'chalk'

protoType()
serialize()

global



let input_obj = readline.createInterface(
    {
        input: process.stdin,
        output: process.stdout,
        terminal: true,
    }
)


const question = (texto) => {
    input_obj.clearLine(input_obj.input, 0)
    return new Promise(
            (resolver) => {
                input_obj.question(texto, (respuesta) => {
                    input_obj.clearLine(input_obj.input, 0)
                    resolver(respuesta.trim())
                }
            )
        }
    )
}

process.send("kill")