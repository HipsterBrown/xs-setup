import type { XSDevToolbox } from '../types'
import setupMac from '../toolbox/setup/mac'
import setupLinux from '../toolbox/setup/lin'
import setupWindows from '../toolbox/setup/windows'
import setupESP8266 from '../toolbox/setup/esp8266'
import setupESP32 from '../toolbox/setup/esp32'
import setupWasm from '../toolbox/setup/wasm'
import setupPico from '../toolbox/setup/pico'
import setupNRF52 from '../toolbox/setup/nrf52'

export default async (toolbox: XSDevToolbox): Promise<void> => {
  toolbox.setup = {
    darwin: setupMac,
    mac: setupMac,
    linux: setupLinux,
    lin: setupLinux,
    windows_nt: setupWindows,
    win: setupWindows,
    esp: setupESP8266,
    esp8266: setupESP8266,
    esp32: setupESP32,
    wasm: setupWasm,
    pico: setupPico,
    nrf52: setupNRF52,
  }
}
