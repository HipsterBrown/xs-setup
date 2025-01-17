---
title: Doctor
description: Display the current environment setup information, including valid target devices
---

## Display the current environment setup information

The `doctor` command can help determine what the current developer environment has available to support the various Moddable device targets and tooling.

```
xs-dev doctor
```

This should output something like this:

```
xs-dev environment info:
  CLI Version                0.36.5
  OS                         Darwin
  Arch                       arm64
  NodeJS Version             v22.10.0 (/path/to/node)
  Python Version             3.12.8 (/path/to/python)
  Moddable SDK Version       5.3.3 (/path/to/moddable)
  Supported target devices   mac, esp32, esp8266, pico
  ESP32 IDF Directory        /path/to/esp32/esp-idf
  ESP8266 Base Directory     /path/to/esp
  Pico SDK Directory         /path/to/pico/pico-sdk

If this is related to an error when using the CLI, please create an issue at "https://github.com/hipsterbrown/xs-dev/issues/new" with the above info.
```

**Aliases**

```
xs-dev dr
```
OR

```
xs-dev info
```
