# emis-web

[![Build Status](https://travis-ci.org/CodeTanzania/emis-web.svg?branch=develop)](https://travis-ci.org/CodeTanzania/emis-web)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)

<img src="docs/images/logo.svg" 
alt="EMIS Logo" width="100" height="auto" />

## About EMIS

A collaboration platform that facilitates communication, planning and actions for disaster management.

It incorporates data that can be shared and analyzed in order generate insights for local authorities and communities to better manage disasters and increase resilience to disaster risk. The data is organized in core components.

![EMIS Homepage](docs/images/home.png 'EMIS Homepage')

## EMIS Components

#### Stakeholders

EMIS Stakeholders contains an up to date database of all stakeholders responsible for emergency/disaster management within a specific region.

See source code [repository](https://github.com/CodeTanzania/emis-stakeholder).

#### Resources

EMIS Resources depends heavily on EMIS Stakeholders as it acts as a resource management tool for resources owned by stakeholders.

See source code [repository](https://github.com/CodeTanzania/emis-resource).

#### Alerts

This component consists of an up to date database of ingested emergency / disaster alerts from multiple sources in near real time and disseminating them to disaster management stakeholders.

See source code [repository](https://github.com/CodeTanzania/emis-alert).

#### Emergency Plans

EMIS Plans provides a way to create, store and disseminate emergency/disaster management plans with detailed activities and Standard Operating Procedures (SOPs) to be performed by each stakeholder in all phases of disaster management.

See source code [repository](https://github.com/CodeTanzania/emis-plan).

#### Incident Management

Provides means to record and report the occurrence of a disaster incident and activating planned activities to respond and recover. It allows for storing of results of continuous assessments performed on affected areas, people and critical infrastructure.

See source code [repository](https://github.com/CodeTanzania/emis-incident).

#### Assessment Toolkit

Provides a set of integrated tools that provides a way to determine what happened, where it happened, who was affected, what was the impact and what type of assistance is required for an immediate response for both affected population and infrastructures.

See source code [repository](https://github.com/CodeTanzania/emis-assessment).

#### Dashboards

EMIS dashboards consists of visualization and analysis tools for all the data that is available on all EMIS components.

See source code [repository]().

#### Geographical Features

Provides an up to date geographical database of all features of interest that can be used to study and control the expected and the actual extent of impact that may be caused in case of an emergency/disaster.

See source code [repository](https://github.com/CodeTanzania/emis-feature).

## Contribute

If you are interested in fixing issues and contributing directly to the code base, please read our [contributing guide](https://github.com/CodeTanzania/emis-web/blob/develop/CONTRIBUTING.md).

Please also see [code of conduct](https://github.com/CodeTanzania/emis-web/blob/develop/CONTRIBUTING.md) to know what we expect of all project participants.

When you are done, go ahead and install the project.

### Installation

Clone the project

```sh
git clone https://github.com/CodeTanzania/emis-web.git
```

Install all required dependencies

```sh
yarn install
```

### Run it in development mode

```sh
yarn start
```

and view it on http://localhost:3000

## Documentation

- [Project website]()
- [A collection of references for EMIS]()
- [Http client for EMIS API](https://github.com/CodeTanzania/emis-api-client)
- [Redux state manager for EMIS](https://github.com/CodeTanzania/emis-api-states)

## License

MIT License

Copyright (c) 2018 - present Code Tanzania & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
