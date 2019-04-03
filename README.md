[![NuGet](https://img.shields.io/nuget/v/aspdotnet-vuejs.svg)](https://www.nuget.org/packages/aspdotnet-vuejs/)
[![Build status](https://ci.appveyor.com/api/projects/status/okfn33vwyff1xb3h/branch/master?svg=true)](https://ci.appveyor.com/project/hvpaiva/aspdotnet-vuejs/branch/master)

# <img src="https://github.com/hvpaiva/aspdotnet-vuejs/raw/master/content/ClientApp/favicon.ico" height="30" /> Dotnet Core 2.2 + VueJs

This project main idea is to provide an easy way to start a new project using .Net Core WebAPI in server side and VueJs in the client side. For this goal, we setup the main configuration to enable this integration using some utilities as hot reloading and some frontend libraries as Element-UI and FontAwesome.

Our goal is to provide an simple SPA with minimum dependencies and performance issues. The VueJs is configured with Vuex and Vue Router, but this can be removed if you don't feel it meets your requirement. The same goes for the component library. In this template, we also provide examples with the main functionalits.

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
    - [Webpack hot-reload](#webpack-hot-reload)
    - [Vuex](#vuex)
  - [Look'n feel](#lookn-feel)
    - [Element UI](#element-ui)
    - [Responsive design](#responsive-design)
    - [Responsive menu](#responsive-menu)
  - [Stats](#stats)
  - [More information about what's inside or how it works?](#more-information-about-whats-inside-or-how-it-works)
  - [License](#license)
  

## Technology inside

- .Net Core 2.2
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

\* Work In Progress

## Installation
Add the templates within your `dotnet new -l` list.

```bash
> dotnet new -i aspdotnet-vuejs
```

Then to create your project afterwards you will simply type:

```bash
> dotnet new vue
```

> You can check for optional configurations by typing `dotnet new vue -h`.

### Update your installation?
Simply do like the previous step. As long as the version number are not equals, you won't have any unexpected behaviour.

### Uninstallation

Type the following command from the shell:

```bash
> dotnet new -u aspdotnet-vuejs
```

## Develop

To start developing your application, just use the .Net CLI command `dotnet run` and the application will be started in _Development_ mode with hot reloading enabled at `https://localhost:5001`.

## Publishing your application
### Before publishing
You need to ensure that your wwwroot **is empty** before starting the process.

### Publishing
Simply use the normal way of publishing using DotNet Core CLI

```bash
> dotnet publish YourProject.csproj -c release -o ./publish/
```

You can also add all the other parameter from the dotnet cli. Please [visit the MSDN site](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-publish?tabs=netcore21) to know more about it.
This will do a rebuild of your project and then after it will use the special target to rebuild your client (vuejs) in production mode.

### Extra if you use NginX
You might need to have more configuration in case of publishing behing a NginX server. Let's say you have your base site `http://www.example.com` and that in your NginX configuration you would like to have your dotnet app within `http://www.example.com/myApp`. You will need in such a scenario to set the base uri for the index.html. Instead of doing that manually between development and production, you have the file `./build/base.prod.config.js` which contains a possible override.

Simply set your override like the following:

```javascript
module.exports = {
  baseUriPath: '/myApp/'
}
```

When you will publish next time, the path will then be taken into account and it will sets automatically the base uri path.

## Docker
The project already add some [docker container](https://hub.docker.com/r/hvpaiva/aspdotnet-vuejs/) available through the Docker Hub. You can pull the image if you want. It will make the sample available locally. The image is using the Alpine version so it only use a small footprint.

### Docker - Build yourself
Since containers in docker are quite popular, a `Dockerfile` is also included within the template root folder. The help in order to build the template is also within that file. Don't forget the `.dockerignore` where some files are being ignored in order to avoid some unwanted file to be copied before publishing.

> Ensure that you have Docker installed.

## Some Automation

### Kestrel serving using Gzip compression
The code is having built-in the Gzip compression on the HTTPs. It's good to use that code especially if you use Kestrel. Otherwise, if you use IIS, please remove that specific code found in the `Startup.cs`. Normally, IIS offer it's own compression module which is more performant.

That being said, having it in Kestrel is still better than having nothing.

### Base components
As described within the Wiki, there's some automation regarding the `Components` available within _./ClientApp/components/**/*_. All the file starting with the keyword `base` are going to be declared as global and the name of the component to be used anywhere will be defined in snake case without the `base` keyword.

Example: `baseHelloWorld` will be registered as `hello-world` and you are going to be able to use it in your Vue Template.

```html
<template>
  <div>
    <hello-world /> works!
  </div>
</template>
```

> **Tips:** There's a real example within the project for the card component for each page. The name of the component is `baseCard.vue`.

### Webpack build
The css is not generated while you are in development mode. They are going to be created only when you will use the `dotnet publish` command or as an alternative, you can also go and type `npm run build -- --prod` which will launch the production build with the minification and extraction of the files. 

> **Important:** Currently, webpack clean the entire wwwroot folder within the .Net project. So, if you have static files, move them within the _./ClientApp/static/_ folder.

### Webpack hot-reload
When the .Net process is started, `dotnet run yourApp`, you will have to wait a little that the file are published in your `wwwroot` folder. After it is completed, you will be able to access your application at `https://localhost:5001`. Any modification made within the _ClientApp_ folder will trigger a live update within the browser. This is particularly useful.

### Vuex
Vuex, for the people who come from React, is the redux from VueJs. You have mutation, state management and much more. It is quite useful when you want to propagate your change or for example login auser and update the entire UX at once. The same goes for refreshing a token.

I don't think I should go more in depth on that topic. There is a sample in the counter page. Please go and look for yourself and then go on the [official site](https://vuex.vuejs.org) for more details and how to apply the best practices.

## Look'n feel

### Element UI
To help make the development faster, we provide the installation of the component library [Element-UI](http://element.eleme.io/#/en-US). The documentation of this library can be founded in his site.

![Sample](https://github.com/hvpaiva/aspdotnet-vuejs/raw/master/screenshot/screenshot-home.png "Sample")

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

## License
![License MIT](https://img.shields.io/github/license/hvpaiva/aspdotnet-vuejs.svg)
