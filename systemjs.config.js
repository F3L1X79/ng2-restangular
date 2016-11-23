(function (global) {
    System.config({
        //use typescript for compilation
        transpiler: 'typescript',
        //typescript compiler options
        typescriptOptions: {
            emitDecoratorMetadata: true
        },
        paths: {
            'npm:': 'node_modules/',
            'ng2-restangular': 'node_modules/ng2-restangular/dist/esm/src'
        },
        map: {
            app: 'app',
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/router/upgrade': 'npm:@angular/router/bundles/router-upgrade.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
            '@angular/upgrade/static': 'npm:@angular/upgrade/bundles/upgrade-static.umd.js',
            // other libraries
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
            'typescript': 'npm:typescript/lib/typescript.js',
            'ng2-restangular': 'ng2-restangular',
            'rxjs': 'npm:rxjs',
            'lodash': 'npm:lodash'
        },
        packages: {
            app: {
                main: './main.ts',
                defaultExtension: 'ts'
            },
            rxjs: {
                main: "./Rx.js",
                defaultExtension: 'js'
            },
            lodash: {
                main: './lodash.js',
                defaultExtension: 'js'
            },
            'ng2-restangular': {
                main: './index',
                defaultExtension: 'js'
            }
        }
    });
})(this);