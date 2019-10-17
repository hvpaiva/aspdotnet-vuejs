[![NuGet](https://img.shields.io/nuget/v/aspdotnet-vuejs.svg)](https://www.nuget.org/packages/aspdotnet-vuejs/)
[![Build status](https://ci.appveyor.com/api/projects/status/kutcm6fkukd1cx71/branch/master?svg=true)](https://ci.appveyor.com/project/hvpaiva/aspdotnet-vuejs/branch/master)

# <img src="https://github.com/hvpaiva/aspdotnet-vuejs/raw/master/content/ClientApp/favicon.ico" height="30" /> Dotnet Core 3.0 + VueJs

This project main idea is to provide an easy way to start a new project using .Net Core WebAPI in server side and VueJs in the client side. For this goal, we setup the main configuration to enable this integration using some utilities as hot reloading and some frontend libraries as Element-UI and FontAwesome.

Our goal is to provide a simple SPA with minimum dependencies and performance issues. The VueJs is configured with Vuex and Vue Router, but this can be removed if you don't feel it meets your requirement. The same goes for the component library. In this template, we also provide examples with the main functionalits.

This template is inspired and adapted from [Mark Pieszak's project](https://github.com/MarkPieszak/aspnetcore-Vue-starter) and [Nordes' project](https://github.com/Nordes/HoNoSoFt.DotNet.Web.Spa.ProjectTemplates).

# Table Of Contents
- [Table Of Contents](#table-of-contents)
  - [Technology inside](#technology-inside)
  - [Installation](#installation)
    - [Update your installation?](#update-your-installation)
    - [Uninstallation](#uninstallation)
  - [Develop](#develop)
  - [Publishing your application](#publishing-your-application)
    - [Before publishing](#before-publishing)
    - [Publishing](#publishing)
    - [Extra if you use NginX](#extra-if-you-use-nginx)
  - [Docker](#docker)
    - [Docker - Build yourself](#docker---build-yourself)
  - [Some Automation](#some-automation)
    - [Kestrel serving using Gzip compression](#kestrel-serving-using-gzip-compression)
    - [Base components](#base-components)
    - [Webpack build](#webpack-build)
    - [Vuex](#vuex)
  - [Look'n feel](#lookn-feel)
    - [Element UI](#element-ui)
<!-- TODO
    - [Responsive design](#responsive-design)
    - [Responsive menu](#responsive-menu)
  - [Stats](#stats)
  - [More information about what's inside or how it works?](#more-information-about-whats-inside-or-how-it-works)
-->
  - [License](#license)
  

## Technology inside

- .Net Core 3.0
- VueJs
- Webpack 4
- Element UI
- Babel
- Vuex
- Vue-router
- Eslint (airbnb + vuejs-recomended)
- Swagger *
- Vue-i18n *
- Vee-validate *
- LiveReload *

\* Work In Progress. Available in future releases.

## Installation
To download and install the template, just type:

```bash
> dotnet new -i aspdotnet-vuejs
```

> You can see a list of installed templates by using the `dotnet new -l` command.

Then to create your project you will simply use the command bellow in the directory:

```bash
> dotnet new vue
```

This will automatically run `dotnet restore`. But it can be changed in template configurations. 
See `dotnet new vue -h` before using the previous command.

> The solution and project name will be the name of the directory.

### Update your installation
To update your installation, you will just need to repeat the installation process. 
As long as the version number are not equals, you won't have any unexpected behaviour.

### Uninstallation

Type the following command from the shell:

```bash
> dotnet new -u aspdotnet-vuejs
```

## Develop

To start developing your application, just use the .Net CLI command:

```bash
 > dotnet run YourAplication.csproj
```

> You can just type `dotnet run` in the project directory or configure your IDE to run. 
> In this last case just don't forget to pass the `ASPNETCORE_ENVIRONMENT=Development` environment variable.

This will also run all node dependencies like `npm i`.

> The application will be started in _Development_ mode with hot reloading 
> enabled at `https://localhost:5001` and `http://localhost:5000`.

## Publishing your application
### Before publishing
You need to ensure that your wwwroot **is empty** before starting the process.

### Publishing
Simply use the normal way of publishing using .Net Core CLI

```bash
> dotnet publish YourProject.csproj -c release -o ./publish/
```

> You can also add all the other parameter from the dotnet cli. 
> Please [visit the MSDN site](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-publish?tabs=netcore21) to know more about it.

This will do a rebuild of your project and then after it will use the special target to rebuild your client (vuejs) in production mode.

### Extra if you use NginX
If you are publishing behind a NginX server, you might need more configuration.
 
Let's say you have your base site `http://www.example.com` and that in your NginX configuration you would like to have your dotnet app within `http://www.example.com/myApp`. You will need in such a scenario to set the base uri for the index.html. Instead of doing that manually between development and production, you have the file `./build/base.prod.config.js` which contains a possible override.

Simply set your override like the following:

```javascript
module.exports = {
  baseUriPath: '/myApp/'
}
```

When you will publish next time, the path will then be taken into account and it will sets automatically the base uri path.

## Docker
The project already add some [docker container](https://hub.docker.com/r/hvpaiva/aspdotnet-vuejs/) available through the Docker Hub. You can pull the image if you want. It will make the sample available locally. The image is using the Alpine version so it only uses a small footprint.

### Docker - Build yourself
Since containers in docker are quite popular, a `Dockerfile` is also included within the template root folder. Don't forget the `.dockerignore` where some files are being ignored in order to avoid some unwanted file to be copied before publishing.

> Ensure that you have Docker installed.

## Some Automation

### Kestrel serving using Gzip compression
The code is having built-in the Gzip compression on the HTTPs. It's good to use that code especially if you use Kestrel. Otherwise, if you use IIS, please remove that specific code found in the `Startup.cs`. Normally, IIS offer it's own compression module which is more performant.

### Base components
There's some automation regarding the `Components` available within _./ClientApp/components/**/*_. 
All the file starting with the keyword `base` are going to be declared as global and the name of the component to be used anywhere will be defined in _snake case_ without the `base` keyword.

**Example:** `baseHelloWorld` will be registered as `hello-world` and you are going to be able to use it in your Vue Template.

```html
<template>
  <div>
    <hello-world /> works!
  </div>
</template>
```

> There's a real example within the project for the card component for each page. The name of the component is `baseCard.vue`.

### Webpack build
The css is not generated while you are in development mode. They are going to be created only when you will use the `dotnet publish` command or as an alternative, you can also go and type `npm run build -- --prod` which will launch the production build with the minification and extraction of the files. 

> **Important:** Currently, webpack clean the entire wwwroot folder within the .Net project. So, if you have static files, move them within the _./ClientApp/static/_ folder.

## Look'n feel

### Element UI
To help make the development faster, we provide the installation of the component library [Element-UI](http://element.eleme.io/#/en-US). The documentation of this library can be founded in his site.

> It can be removed normally in `main.js` if you don't need.

<!-- ![Sample](https://github.com/hvpaiva/aspdotnet-vuejs/raw/master/screenshot/screenshot-home.png "Sample")-->
<!-- TODO
### Responsive design
![Sample responsive](https://github.com/hvpaiva/aspdotnet-vuejs/raw/master/screenshot/screenshot-home-responsive.png "Sample responsive")

### Responsive menu
![Sample responsive menu](https://github.com/hvpaiva/aspdotnet-vuejs/raw/master/screenshot/screenshot-home-responsive-menu.png "Sample responsive menu")

## Stats
The following stats are for the main content of the template.

**Tips:**
> To ensure a good performance, you can optimize the imports of the components using [lazy loading]() and importing minified libraries and, in case of components library and icons, on demand _(This means only import the component/icon you will use, beside the whole library)_.

| File | Development | Production (with gzip) |
|---|---------------|------------|
| main.css | N/A | * |
| main.js | 250 kb | * |
| vendors.js | 857 kb | * |

\* Not tested yet. 

## More information about what's inside or how it works?
The wiki is currently under construction.
-->

## License
![License MIT](https://img.shields.io/github/license/hvpaiva/aspdotnet-vuejs.svg)
