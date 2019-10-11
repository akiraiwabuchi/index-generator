# makeindex

Generate a table of contents that summarizes links to HTML files in the html directory.  
The table of contents that is created uses bootstrap 4.3.1 and Google Material Icons.

## Install

```bash
npm install
```

## Usage

```JavaScript
const makeindex = require('makeindex');

makeindex();
```

### Config

All configs sample  

```JavaScript
makeindex({
    htmlPath: './html/',
    distPath: './dist/',
    fileName: 'index.html',
    darkMode: true,
    construction: 'adaptive',
    prefixGroup: [
        {
            prefixName: 'd',
            title: 'Develop',
            titleIcon: 'keyboard',
            fileIcon: ["style","","","view_compact","","mood","code"]
        },
        {
            prefixName: 'p',
            title: 'Pages',
            titleIcon: 'description'
        },
        {
            prefixName: 'w',
            title: 'WorkSpace',
            titleIcon: 'create'
        }
    ],
    suffixDesktop: '-desktop.html',
    suffixMobile: '-mobile.html',
    suffixTablet: '-tablet.html',
    removeTitle: ' | TEST FILE',
    faviconPath: './image/favicon.ico',
    headTitle: 'headTitle',
    pageTitle: 'pageTitle',
    overview: 'overview',
    disclaimerTitle: 'disclaimerTitle',
    disclaimerDesc: 'disclaimerDesc',
    copyright: '&copy; CopyrightSample.Inc'
});
```

configs parameters  

| Parameter        | Type    | Default                          | Description                                                    |
| ---------------- | ------- | -------------------------------- | -------------------------------------------------------------- |
| `htmlPath`         | string  | './html/'                        |                                                                |
| `distPath`         | string  | htmlPath                         |                                                                |
| `fileName`         | string  | 'index.html'                     |                                                                |
| `darkMode`         | boolean | false                            |                                                                |
| `construction`     | string  | 'responsive'                     |                                                                |
| `prefix`           | object  |                                  |                                                                |
| `suffixDesktop`    | string  | '-desktop.html'                  |                                                                |
| `suffixMobile`     | string  | '-mobile.html'                   |                                                                |
| `suffixTablet`     | string  | '-tablet.html'                   |                                                                |
| `removeTitle`      | string  | ''                               |                                                                |
| `faviconPath`      | string  | ''                               |                                                                |
| `headTitle`        | string  | 'index'                          |                                                                |
| `pageTitle`        | string  | 'pageTitle'                      |                                                                |
| `overview`         | string  | 'Overview text sample.'          |                                                                |
| `disclaimerTitle`  | string  | 'Disclaimer title sample'        |                                                                |
| `disclaimerDesc`   | string  | 'Disclaimer description sample.' |                                                                |
| `copyright`        | string  | '&copy; CopyrightSample.Inc'     |                                                                |

#### prefix

setsumei  

## License

MIT
