/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/shopping-list/route";
exports.ids = ["app/api/shopping-list/route"];
exports.modules = {

/***/ "(rsc)/./app/api/shopping-list/route.ts":
/*!****************************************!*\
  !*** ./app/api/shopping-list/route.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_mysql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/mysql */ \"(rsc)/./lib/mysql.ts\");\n\n\n// GET: Obtener la lista de compra\nasync function GET() {\n    try {\n        const items = await (0,_lib_mysql__WEBPACK_IMPORTED_MODULE_1__.query)(\"SELECT * FROM shopping_items ORDER BY created_at DESC\");\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(items);\n    } catch (error) {\n        console.error(\"Error al obtener lista de compra:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Error al obtener lista de compra\"\n        }, {\n            status: 500\n        });\n    }\n}\n// POST: Añadir un item a la lista de compra\nasync function POST(request) {\n    try {\n        const body = await request.json();\n        if (!body.name) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"El nombre del producto es requerido\"\n            }, {\n                status: 400\n            });\n        }\n        const result = await (0,_lib_mysql__WEBPACK_IMPORTED_MODULE_1__.query)(\"INSERT INTO shopping_items (name, quantity, completed) VALUES (?, ?, ?)\", [\n            body.name,\n            body.quantity || \"1\",\n            false\n        ]);\n        const [newItem] = await (0,_lib_mysql__WEBPACK_IMPORTED_MODULE_1__.query)(\"SELECT * FROM shopping_items WHERE id = ?\", [\n            result.insertId\n        ]);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(newItem, {\n            status: 201\n        });\n    } catch (error) {\n        console.error(\"Error al añadir item:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Error al añadir item\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3Nob3BwaW5nLWxpc3Qvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUEwQztBQUNQO0FBR25DLGtDQUFrQztBQUMzQixlQUFlRTtJQUNwQixJQUFJO1FBQ0YsTUFBTUMsUUFBUyxNQUFNRixpREFBS0EsQ0FBQztRQUUzQixPQUFPRCxxREFBWUEsQ0FBQ0ksSUFBSSxDQUFDRDtJQUMzQixFQUFFLE9BQU9FLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLHFDQUFxQ0E7UUFDbkQsT0FBT0wscURBQVlBLENBQUNJLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQW1DLEdBQUc7WUFBRUUsUUFBUTtRQUFJO0lBQ3hGO0FBQ0Y7QUFFQSw0Q0FBNEM7QUFDckMsZUFBZUMsS0FBS0MsT0FBZ0I7SUFDekMsSUFBSTtRQUNGLE1BQU1DLE9BQU8sTUFBTUQsUUFBUUwsSUFBSTtRQUUvQixJQUFJLENBQUNNLEtBQUtDLElBQUksRUFBRTtZQUNkLE9BQU9YLHFEQUFZQSxDQUFDSSxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBc0MsR0FBRztnQkFBRUUsUUFBUTtZQUFJO1FBQzNGO1FBRUEsTUFBTUssU0FBVSxNQUFNWCxpREFBS0EsQ0FBQywyRUFBMkU7WUFDckdTLEtBQUtDLElBQUk7WUFDVEQsS0FBS0csUUFBUSxJQUFJO1lBQ2pCO1NBQ0Q7UUFFRCxNQUFNLENBQUNDLFFBQVEsR0FBSSxNQUFNYixpREFBS0EsQ0FBQyw2Q0FBNkM7WUFBQ1csT0FBT0csUUFBUTtTQUFDO1FBRTdGLE9BQU9mLHFEQUFZQSxDQUFDSSxJQUFJLENBQUNVLFNBQVM7WUFBRVAsUUFBUTtRQUFJO0lBQ2xELEVBQUUsT0FBT0YsT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMseUJBQXlCQTtRQUN2QyxPQUFPTCxxREFBWUEsQ0FBQ0ksSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBdUIsR0FBRztZQUFFRSxRQUFRO1FBQUk7SUFDNUU7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL2RpYW5hL0Rlc2t0b3AvTWlzLVJlY2V0YXMtU0cvYXBwL2FwaS9zaG9wcGluZy1saXN0L3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiXG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJAL2xpYi9teXNxbFwiXG5pbXBvcnQgdHlwZSB7IFNob3BwaW5nSXRlbSB9IGZyb20gXCJAL2xpYi9teXNxbFwiXG5cbi8vIEdFVDogT2J0ZW5lciBsYSBsaXN0YSBkZSBjb21wcmFcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgaXRlbXMgPSAoYXdhaXQgcXVlcnkoXCJTRUxFQ1QgKiBGUk9NIHNob3BwaW5nX2l0ZW1zIE9SREVSIEJZIGNyZWF0ZWRfYXQgREVTQ1wiKSkgYXMgU2hvcHBpbmdJdGVtW11cblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihpdGVtcylcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYWwgb2J0ZW5lciBsaXN0YSBkZSBjb21wcmE6XCIsIGVycm9yKVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkVycm9yIGFsIG9idGVuZXIgbGlzdGEgZGUgY29tcHJhXCIgfSwgeyBzdGF0dXM6IDUwMCB9KVxuICB9XG59XG5cbi8vIFBPU1Q6IEHDsWFkaXIgdW4gaXRlbSBhIGxhIGxpc3RhIGRlIGNvbXByYVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKVxuXG4gICAgaWYgKCFib2R5Lm5hbWUpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkVsIG5vbWJyZSBkZWwgcHJvZHVjdG8gZXMgcmVxdWVyaWRvXCIgfSwgeyBzdGF0dXM6IDQwMCB9KVxuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IChhd2FpdCBxdWVyeShcIklOU0VSVCBJTlRPIHNob3BwaW5nX2l0ZW1zIChuYW1lLCBxdWFudGl0eSwgY29tcGxldGVkKSBWQUxVRVMgKD8sID8sID8pXCIsIFtcbiAgICAgIGJvZHkubmFtZSxcbiAgICAgIGJvZHkucXVhbnRpdHkgfHwgXCIxXCIsXG4gICAgICBmYWxzZSxcbiAgICBdKSkgYXMgYW55XG5cbiAgICBjb25zdCBbbmV3SXRlbV0gPSAoYXdhaXQgcXVlcnkoXCJTRUxFQ1QgKiBGUk9NIHNob3BwaW5nX2l0ZW1zIFdIRVJFIGlkID0gP1wiLCBbcmVzdWx0Lmluc2VydElkXSkpIGFzIFNob3BwaW5nSXRlbVtdXG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24obmV3SXRlbSwgeyBzdGF0dXM6IDIwMSB9KVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBhbCBhw7FhZGlyIGl0ZW06XCIsIGVycm9yKVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkVycm9yIGFsIGHDsWFkaXIgaXRlbVwiIH0sIHsgc3RhdHVzOiA1MDAgfSlcbiAgfVxufVxuXG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwicXVlcnkiLCJHRVQiLCJpdGVtcyIsImpzb24iLCJlcnJvciIsImNvbnNvbGUiLCJzdGF0dXMiLCJQT1NUIiwicmVxdWVzdCIsImJvZHkiLCJuYW1lIiwicmVzdWx0IiwicXVhbnRpdHkiLCJuZXdJdGVtIiwiaW5zZXJ0SWQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/shopping-list/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/mysql.ts":
/*!**********************!*\
  !*** ./lib/mysql.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   query: () => (/* binding */ query)\n/* harmony export */ });\n/* harmony import */ var mysql2_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mysql2/promise */ \"(rsc)/./node_modules/mysql2/promise.js\");\n\n// Crear conexión a MySQL\nconst pool = mysql2_promise__WEBPACK_IMPORTED_MODULE_0__.createPool({\n    host: process.env.MYSQL_HOST,\n    user: process.env.MYSQL_USER,\n    password: process.env.MYSQL_PASSWORD,\n    database: process.env.MYSQL_DATABASE,\n    connectionLimit: 10\n});\nasync function query(sql, params = []) {\n    const [results] = await pool.execute(sql, params);\n    return results;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbXlzcWwudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBa0M7QUFxQ2xDLHlCQUF5QjtBQUN6QixNQUFNQyxPQUFPRCxzREFBZ0IsQ0FBQztJQUM1QkcsTUFBTUMsUUFBUUMsR0FBRyxDQUFDQyxVQUFVO0lBQzVCQyxNQUFNSCxRQUFRQyxHQUFHLENBQUNHLFVBQVU7SUFDNUJDLFVBQVVMLFFBQVFDLEdBQUcsQ0FBQ0ssY0FBYztJQUNwQ0MsVUFBVVAsUUFBUUMsR0FBRyxDQUFDTyxjQUFjO0lBQ3BDQyxpQkFBaUI7QUFDbkI7QUFFTyxlQUFlQyxNQUFNQyxHQUFXLEVBQUVDLFNBQWdCLEVBQUU7SUFDekQsTUFBTSxDQUFDQyxRQUFRLEdBQUcsTUFBTWhCLEtBQUtpQixPQUFPLENBQUNILEtBQUtDO0lBQzFDLE9BQU9DO0FBQ1QiLCJzb3VyY2VzIjpbIi9Vc2Vycy9kaWFuYS9EZXNrdG9wL01pcy1SZWNldGFzLVNHL2xpYi9teXNxbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbXlzcWwgZnJvbSBcIm15c3FsMi9wcm9taXNlXCJcblxuLy8gVGlwb3MgcGFyYSBudWVzdHJhIGJhc2UgZGUgZGF0b3NcbmV4cG9ydCB0eXBlIFJlY2lwZSA9IHtcbiAgaWQ6IG51bWJlclxuICB0aXRsZTogc3RyaW5nXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmdcbiAgdGltZTogc3RyaW5nXG4gIGRpZmZpY3VsdHk6IHN0cmluZ1xuICBzZXJ2aW5nczogbnVtYmVyXG4gIGltYWdlX3VybDogc3RyaW5nIHwgbnVsbFxuICBjcmVhdGVkX2F0OiBzdHJpbmdcbiAgZ2x1dGVuX2ZyZWU6IGJvb2xlYW5cbn1cblxuZXhwb3J0IHR5cGUgSW5ncmVkaWVudCA9IHtcbiAgaWQ6IG51bWJlclxuICByZWNpcGVfaWQ6IG51bWJlclxuICBuYW1lOiBzdHJpbmdcbiAgcXVhbnRpdHk6IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBTdGVwID0ge1xuICBpZDogbnVtYmVyXG4gIHJlY2lwZV9pZDogbnVtYmVyXG4gIG9yZGVyOiBudW1iZXJcbiAgZGVzY3JpcHRpb246IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBTaG9wcGluZ0l0ZW0gPSB7XG4gIGlkOiBudW1iZXJcbiAgbmFtZTogc3RyaW5nXG4gIHF1YW50aXR5OiBzdHJpbmdcbiAgY29tcGxldGVkOiBib29sZWFuXG4gIGNyZWF0ZWRfYXQ6IHN0cmluZ1xufVxuXG4vLyBDcmVhciBjb25leGnDs24gYSBNeVNRTFxuY29uc3QgcG9vbCA9IG15c3FsLmNyZWF0ZVBvb2woe1xuICBob3N0OiBwcm9jZXNzLmVudi5NWVNRTF9IT1NULFxuICB1c2VyOiBwcm9jZXNzLmVudi5NWVNRTF9VU0VSLFxuICBwYXNzd29yZDogcHJvY2Vzcy5lbnYuTVlTUUxfUEFTU1dPUkQsXG4gIGRhdGFiYXNlOiBwcm9jZXNzLmVudi5NWVNRTF9EQVRBQkFTRSxcbiAgY29ubmVjdGlvbkxpbWl0OiAxMCxcbn0pXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBxdWVyeShzcWw6IHN0cmluZywgcGFyYW1zOiBhbnlbXSA9IFtdKSB7XG4gIGNvbnN0IFtyZXN1bHRzXSA9IGF3YWl0IHBvb2wuZXhlY3V0ZShzcWwsIHBhcmFtcylcbiAgcmV0dXJuIHJlc3VsdHNcbn1cblxuIl0sIm5hbWVzIjpbIm15c3FsIiwicG9vbCIsImNyZWF0ZVBvb2wiLCJob3N0IiwicHJvY2VzcyIsImVudiIsIk1ZU1FMX0hPU1QiLCJ1c2VyIiwiTVlTUUxfVVNFUiIsInBhc3N3b3JkIiwiTVlTUUxfUEFTU1dPUkQiLCJkYXRhYmFzZSIsIk1ZU1FMX0RBVEFCQVNFIiwiY29ubmVjdGlvbkxpbWl0IiwicXVlcnkiLCJzcWwiLCJwYXJhbXMiLCJyZXN1bHRzIiwiZXhlY3V0ZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/mysql.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/mysql2/lib sync recursive ^cardinal.*$":
/*!****************************************************!*\
  !*** ./node_modules/mysql2/lib/ sync ^cardinal.*$ ***!
  \****************************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "(rsc)/./node_modules/mysql2/lib sync recursive ^cardinal.*$";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fshopping-list%2Froute&page=%2Fapi%2Fshopping-list%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fshopping-list%2Froute.ts&appDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fshopping-list%2Froute&page=%2Fapi%2Fshopping-list%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fshopping-list%2Froute.ts&appDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_diana_Desktop_Mis_Recetas_SG_app_api_shopping_list_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/shopping-list/route.ts */ \"(rsc)/./app/api/shopping-list/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/shopping-list/route\",\n        pathname: \"/api/shopping-list\",\n        filename: \"route\",\n        bundlePath: \"app/api/shopping-list/route\"\n    },\n    resolvedPagePath: \"/Users/diana/Desktop/Mis-Recetas-SG/app/api/shopping-list/route.ts\",\n    nextConfigOutput,\n    userland: _Users_diana_Desktop_Mis_Recetas_SG_app_api_shopping_list_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZzaG9wcGluZy1saXN0JTJGcm91dGUmcGFnZT0lMkZhcGklMkZzaG9wcGluZy1saXN0JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGc2hvcHBpbmctbGlzdCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmRpYW5hJTJGRGVza3RvcCUyRk1pcy1SZWNldGFzLVNHJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmRpYW5hJTJGRGVza3RvcCUyRk1pcy1SZWNldGFzLVNHJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNrQjtBQUMvRjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL2RpYW5hL0Rlc2t0b3AvTWlzLVJlY2V0YXMtU0cvYXBwL2FwaS9zaG9wcGluZy1saXN0L3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9zaG9wcGluZy1saXN0L3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvc2hvcHBpbmctbGlzdFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvc2hvcHBpbmctbGlzdC9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9kaWFuYS9EZXNrdG9wL01pcy1SZWNldGFzLVNHL2FwcC9hcGkvc2hvcHBpbmctbGlzdC9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fshopping-list%2Froute&page=%2Fapi%2Fshopping-list%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fshopping-list%2Froute.ts&appDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "string_decoder":
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");

/***/ }),

/***/ "timers":
/*!*************************!*\
  !*** external "timers" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("timers");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@opentelemetry","vendor-chunks/mysql2","vendor-chunks/aws-ssl-profiles","vendor-chunks/iconv-lite","vendor-chunks/long","vendor-chunks/lru-cache","vendor-chunks/denque","vendor-chunks/is-property","vendor-chunks/lru.min","vendor-chunks/sqlstring","vendor-chunks/seq-queue","vendor-chunks/named-placeholders","vendor-chunks/generate-function","vendor-chunks/safer-buffer"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fshopping-list%2Froute&page=%2Fapi%2Fshopping-list%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fshopping-list%2Froute.ts&appDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();