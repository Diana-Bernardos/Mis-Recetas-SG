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
exports.id = "app/api/gluten-free/recipe/route";
exports.ids = ["app/api/gluten-free/recipe/route"];
exports.modules = {

/***/ "(rsc)/./app/api/gluten-free/recipe/route.ts":
/*!*********************************************!*\
  !*** ./app/api/gluten-free/recipe/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n// API key from Spoonacular\nconst API_KEY = process.env.SPOONACULAR_API_KEY;\nasync function GET(request) {\n    try {\n        // Obtener el ID de la receta de la URL\n        const { searchParams } = new URL(request.url);\n        const id = searchParams.get('id');\n        if (!id) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"ID de receta requerido\"\n            }, {\n                status: 400\n            });\n        }\n        // Construir la URL para obtener detalles de la receta\n        const apiUrl = new URL(`https://api.spoonacular.com/recipes/${id}/information`);\n        // Agregar parámetros a la consulta\n        apiUrl.searchParams.append('apiKey', API_KEY || '');\n        apiUrl.searchParams.append('includeNutrition', 'false');\n        // Hacer la petición a la API de Spoonacular\n        const response = await fetch(apiUrl);\n        if (!response.ok) {\n            throw new Error(`Error en la API: ${response.status} ${response.statusText}`);\n        }\n        const recipeData = await response.json();\n        // Transformar los datos para tener un formato más limpio\n        const receta = {\n            id: recipeData.id,\n            title: recipeData.title,\n            image: recipeData.image,\n            readyInMinutes: recipeData.readyInMinutes,\n            servings: recipeData.servings,\n            sourceUrl: recipeData.sourceUrl,\n            summary: recipeData.summary,\n            ingredients: recipeData.extendedIngredients?.map((ingredient)=>({\n                    id: ingredient.id,\n                    name: ingredient.name,\n                    amount: ingredient.amount,\n                    unit: ingredient.unit\n                })),\n            instructions: recipeData.analyzedInstructions?.[0]?.steps?.map((step)=>({\n                    number: step.number,\n                    step: step.step\n                }))\n        };\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(receta);\n    } catch (error) {\n        console.error(\"Error al obtener detalles de receta:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2dsdXRlbi1mcmVlL3JlY2lwZS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUEyQztBQUUzQywyQkFBMkI7QUFDM0IsTUFBTUMsVUFBVUMsUUFBUUMsR0FBRyxDQUFDQyxtQkFBbUI7QUFFeEMsZUFBZUMsSUFBSUMsT0FBZ0I7SUFDeEMsSUFBSTtRQUNGLHVDQUF1QztRQUN2QyxNQUFNLEVBQUVDLFlBQVksRUFBRSxHQUFHLElBQUlDLElBQUlGLFFBQVFHLEdBQUc7UUFDNUMsTUFBTUMsS0FBS0gsYUFBYUksR0FBRyxDQUFDO1FBRTVCLElBQUksQ0FBQ0QsSUFBSTtZQUNQLE9BQU9WLHFEQUFZQSxDQUFDWSxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBeUIsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQzlFO1FBRUEsc0RBQXNEO1FBQ3RELE1BQU1DLFNBQVMsSUFBSVAsSUFBSSxDQUFDLG9DQUFvQyxFQUFFRSxHQUFHLFlBQVksQ0FBQztRQUU5RSxtQ0FBbUM7UUFDbkNLLE9BQU9SLFlBQVksQ0FBQ1MsTUFBTSxDQUFDLFVBQVVmLFdBQVc7UUFDaERjLE9BQU9SLFlBQVksQ0FBQ1MsTUFBTSxDQUFDLG9CQUFvQjtRQUUvQyw0Q0FBNEM7UUFDNUMsTUFBTUMsV0FBVyxNQUFNQyxNQUFNSDtRQUU3QixJQUFJLENBQUNFLFNBQVNFLEVBQUUsRUFBRTtZQUNoQixNQUFNLElBQUlDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRUgsU0FBU0gsTUFBTSxDQUFDLENBQUMsRUFBRUcsU0FBU0ksVUFBVSxFQUFFO1FBQzlFO1FBRUEsTUFBTUMsYUFBYSxNQUFNTCxTQUFTTCxJQUFJO1FBRXRDLHlEQUF5RDtRQUN6RCxNQUFNVyxTQUFTO1lBQ2JiLElBQUlZLFdBQVdaLEVBQUU7WUFDakJjLE9BQU9GLFdBQVdFLEtBQUs7WUFDdkJDLE9BQU9ILFdBQVdHLEtBQUs7WUFDdkJDLGdCQUFnQkosV0FBV0ksY0FBYztZQUN6Q0MsVUFBVUwsV0FBV0ssUUFBUTtZQUM3QkMsV0FBV04sV0FBV00sU0FBUztZQUMvQkMsU0FBU1AsV0FBV08sT0FBTztZQUMzQkMsYUFBYVIsV0FBV1MsbUJBQW1CLEVBQUVDLElBQUksQ0FBQ0MsYUFBcUI7b0JBQ3JFdkIsSUFBSXVCLFdBQVd2QixFQUFFO29CQUNqQndCLE1BQU1ELFdBQVdDLElBQUk7b0JBQ3JCQyxRQUFRRixXQUFXRSxNQUFNO29CQUN6QkMsTUFBTUgsV0FBV0csSUFBSTtnQkFDdkI7WUFDQUMsY0FBY2YsV0FBV2dCLG9CQUFvQixFQUFFLENBQUMsRUFBRSxFQUFFQyxPQUFPUCxJQUFJLENBQUNRLE9BQWU7b0JBQzdFQyxRQUFRRCxLQUFLQyxNQUFNO29CQUNuQkQsTUFBTUEsS0FBS0EsSUFBSTtnQkFDakI7UUFDRjtRQUVBLE9BQU94QyxxREFBWUEsQ0FBQ1ksSUFBSSxDQUFDVztJQUUzQixFQUFFLE9BQU9WLE9BQVk7UUFDbkI2QixRQUFRN0IsS0FBSyxDQUFDLHdDQUF3Q0E7UUFDdEQsT0FBT2IscURBQVlBLENBQUNZLElBQUksQ0FBQztZQUFFQyxPQUFPQSxNQUFNOEIsT0FBTztRQUFDLEdBQUc7WUFBRTdCLFFBQVE7UUFBSTtJQUNuRTtBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvZGlhbmEvRGVza3RvcC9NaXMtUmVjZXRhcy1TRy9hcHAvYXBpL2dsdXRlbi1mcmVlL3JlY2lwZS9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcblxuLy8gQVBJIGtleSBmcm9tIFNwb29uYWN1bGFyXG5jb25zdCBBUElfS0VZID0gcHJvY2Vzcy5lbnYuU1BPT05BQ1VMQVJfQVBJX0tFWTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgLy8gT2J0ZW5lciBlbCBJRCBkZSBsYSByZWNldGEgZGUgbGEgVVJMXG4gICAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IG5ldyBVUkwocmVxdWVzdC51cmwpO1xuICAgIGNvbnN0IGlkID0gc2VhcmNoUGFyYW1zLmdldCgnaWQnKTtcbiAgICBcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJJRCBkZSByZWNldGEgcmVxdWVyaWRvXCIgfSwgeyBzdGF0dXM6IDQwMCB9KTtcbiAgICB9XG4gICAgXG4gICAgLy8gQ29uc3RydWlyIGxhIFVSTCBwYXJhIG9idGVuZXIgZGV0YWxsZXMgZGUgbGEgcmVjZXRhXG4gICAgY29uc3QgYXBpVXJsID0gbmV3IFVSTChgaHR0cHM6Ly9hcGkuc3Bvb25hY3VsYXIuY29tL3JlY2lwZXMvJHtpZH0vaW5mb3JtYXRpb25gKTtcbiAgICBcbiAgICAvLyBBZ3JlZ2FyIHBhcsOhbWV0cm9zIGEgbGEgY29uc3VsdGFcbiAgICBhcGlVcmwuc2VhcmNoUGFyYW1zLmFwcGVuZCgnYXBpS2V5JywgQVBJX0tFWSB8fCAnJyk7XG4gICAgYXBpVXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoJ2luY2x1ZGVOdXRyaXRpb24nLCAnZmFsc2UnKTtcbiAgICBcbiAgICAvLyBIYWNlciBsYSBwZXRpY2nDs24gYSBsYSBBUEkgZGUgU3Bvb25hY3VsYXJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGFwaVVybCk7XG4gICAgXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvciBlbiBsYSBBUEk6ICR7cmVzcG9uc2Uuc3RhdHVzfSAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHJlY2lwZURhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgXG4gICAgLy8gVHJhbnNmb3JtYXIgbG9zIGRhdG9zIHBhcmEgdGVuZXIgdW4gZm9ybWF0byBtw6FzIGxpbXBpb1xuICAgIGNvbnN0IHJlY2V0YSA9IHtcbiAgICAgIGlkOiByZWNpcGVEYXRhLmlkLFxuICAgICAgdGl0bGU6IHJlY2lwZURhdGEudGl0bGUsXG4gICAgICBpbWFnZTogcmVjaXBlRGF0YS5pbWFnZSxcbiAgICAgIHJlYWR5SW5NaW51dGVzOiByZWNpcGVEYXRhLnJlYWR5SW5NaW51dGVzLFxuICAgICAgc2VydmluZ3M6IHJlY2lwZURhdGEuc2VydmluZ3MsXG4gICAgICBzb3VyY2VVcmw6IHJlY2lwZURhdGEuc291cmNlVXJsLFxuICAgICAgc3VtbWFyeTogcmVjaXBlRGF0YS5zdW1tYXJ5LFxuICAgICAgaW5ncmVkaWVudHM6IHJlY2lwZURhdGEuZXh0ZW5kZWRJbmdyZWRpZW50cz8ubWFwKChpbmdyZWRpZW50OiBhbnkpID0+ICh7XG4gICAgICAgIGlkOiBpbmdyZWRpZW50LmlkLFxuICAgICAgICBuYW1lOiBpbmdyZWRpZW50Lm5hbWUsXG4gICAgICAgIGFtb3VudDogaW5ncmVkaWVudC5hbW91bnQsXG4gICAgICAgIHVuaXQ6IGluZ3JlZGllbnQudW5pdCxcbiAgICAgIH0pKSxcbiAgICAgIGluc3RydWN0aW9uczogcmVjaXBlRGF0YS5hbmFseXplZEluc3RydWN0aW9ucz8uWzBdPy5zdGVwcz8ubWFwKChzdGVwOiBhbnkpID0+ICh7XG4gICAgICAgIG51bWJlcjogc3RlcC5udW1iZXIsXG4gICAgICAgIHN0ZXA6IHN0ZXAuc3RlcCxcbiAgICAgIH0pKSxcbiAgICB9O1xuICAgIFxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihyZWNldGEpO1xuICAgIFxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGFsIG9idGVuZXIgZGV0YWxsZXMgZGUgcmVjZXRhOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufSJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJBUElfS0VZIiwicHJvY2VzcyIsImVudiIsIlNQT09OQUNVTEFSX0FQSV9LRVkiLCJHRVQiLCJyZXF1ZXN0Iiwic2VhcmNoUGFyYW1zIiwiVVJMIiwidXJsIiwiaWQiLCJnZXQiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJhcGlVcmwiLCJhcHBlbmQiLCJyZXNwb25zZSIsImZldGNoIiwib2siLCJFcnJvciIsInN0YXR1c1RleHQiLCJyZWNpcGVEYXRhIiwicmVjZXRhIiwidGl0bGUiLCJpbWFnZSIsInJlYWR5SW5NaW51dGVzIiwic2VydmluZ3MiLCJzb3VyY2VVcmwiLCJzdW1tYXJ5IiwiaW5ncmVkaWVudHMiLCJleHRlbmRlZEluZ3JlZGllbnRzIiwibWFwIiwiaW5ncmVkaWVudCIsIm5hbWUiLCJhbW91bnQiLCJ1bml0IiwiaW5zdHJ1Y3Rpb25zIiwiYW5hbHl6ZWRJbnN0cnVjdGlvbnMiLCJzdGVwcyIsInN0ZXAiLCJudW1iZXIiLCJjb25zb2xlIiwibWVzc2FnZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/gluten-free/recipe/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgluten-free%2Frecipe%2Froute&page=%2Fapi%2Fgluten-free%2Frecipe%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgluten-free%2Frecipe%2Froute.ts&appDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgluten-free%2Frecipe%2Froute&page=%2Fapi%2Fgluten-free%2Frecipe%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgluten-free%2Frecipe%2Froute.ts&appDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_diana_Desktop_Mis_Recetas_SG_app_api_gluten_free_recipe_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/gluten-free/recipe/route.ts */ \"(rsc)/./app/api/gluten-free/recipe/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/gluten-free/recipe/route\",\n        pathname: \"/api/gluten-free/recipe\",\n        filename: \"route\",\n        bundlePath: \"app/api/gluten-free/recipe/route\"\n    },\n    resolvedPagePath: \"/Users/diana/Desktop/Mis-Recetas-SG/app/api/gluten-free/recipe/route.ts\",\n    nextConfigOutput,\n    userland: _Users_diana_Desktop_Mis_Recetas_SG_app_api_gluten_free_recipe_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZnbHV0ZW4tZnJlZSUyRnJlY2lwZSUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGZ2x1dGVuLWZyZWUlMkZyZWNpcGUlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZnbHV0ZW4tZnJlZSUyRnJlY2lwZSUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmRpYW5hJTJGRGVza3RvcCUyRk1pcy1SZWNldGFzLVNHJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmRpYW5hJTJGRGVza3RvcCUyRk1pcy1SZWNldGFzLVNHJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUN1QjtBQUNwRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL2RpYW5hL0Rlc2t0b3AvTWlzLVJlY2V0YXMtU0cvYXBwL2FwaS9nbHV0ZW4tZnJlZS9yZWNpcGUvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2dsdXRlbi1mcmVlL3JlY2lwZS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2dsdXRlbi1mcmVlL3JlY2lwZVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvZ2x1dGVuLWZyZWUvcmVjaXBlL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL2RpYW5hL0Rlc2t0b3AvTWlzLVJlY2V0YXMtU0cvYXBwL2FwaS9nbHV0ZW4tZnJlZS9yZWNpcGUvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgluten-free%2Frecipe%2Froute&page=%2Fapi%2Fgluten-free%2Frecipe%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgluten-free%2Frecipe%2Froute.ts&appDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@opentelemetry"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgluten-free%2Frecipe%2Froute&page=%2Fapi%2Fgluten-free%2Frecipe%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgluten-free%2Frecipe%2Froute.ts&appDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();