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
exports.id = "app/api/recipes/[id]/route";
exports.ids = ["app/api/recipes/[id]/route"];
exports.modules = {

/***/ "(rsc)/./app/api/recipes/[id]/route.ts":
/*!***************************************!*\
  !*** ./app/api/recipes/[id]/route.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   PUT: () => (/* binding */ PUT)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_mysql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/mysql */ \"(rsc)/./lib/mysql.ts\");\n\n\n// GET: Obtener una receta específica con sus ingredientes y pasos\nasync function GET(request, { params }) {\n    try {\n        const [recipe] = await (0,_lib_mysql__WEBPACK_IMPORTED_MODULE_1__.query)(\"SELECT * FROM recipes WHERE id = ?\", [\n            params.id\n        ]);\n        if (!recipe) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Receta no encontrada\"\n            }, {\n                status: 404\n            });\n        }\n        // Obtener ingredientes\n        const ingredients = await (0,_lib_mysql__WEBPACK_IMPORTED_MODULE_1__.query)(\"SELECT * FROM ingredients WHERE recipe_id = ?\", [\n            params.id\n        ]);\n        // Obtener pasos\n        const steps = await (0,_lib_mysql__WEBPACK_IMPORTED_MODULE_1__.query)(\"SELECT * FROM steps WHERE recipe_id = ? ORDER BY `order` ASC\", [\n            params.id\n        ]);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            ...recipe,\n            ingredients,\n            steps\n        });\n    } catch (error) {\n        console.error(\"Error al obtener receta:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Error al obtener receta\"\n        }, {\n            status: 500\n        });\n    }\n}\n// PUT: Actualizar una receta\nasync function PUT(request, { params }) {\n    try {\n        const body = await request.json();\n        // Actualizar receta\n        await (0,_lib_mysql__WEBPACK_IMPORTED_MODULE_1__.query)(\"UPDATE recipes SET title = ?, description = ?, time = ?, difficulty = ?, servings = ?, image_url = ? WHERE id = ?\", [\n            body.title,\n            body.description,\n            body.time,\n            body.difficulty,\n            body.servings,\n            body.image_url,\n            params.id\n        ]);\n        // Actualizar ingredientes (eliminar y volver a insertar)\n        if (body.ingredients) {\n            await (0,_lib_mysql__WEBPACK_IMPORTED_MODULE_1__.query)(\"DELETE FROM ingredients WHERE recipe_id = ?\", [\n                params.id\n            ]);\n            for (const ingredient of body.ingredients){\n                await (0,_lib_mysql__WEBPACK_IMPORTED_MODULE_1__.query)(\"INSERT INTO ingredients (recipe_id, name, quantity) VALUES (?, ?, ?)\", [\n                    params.id,\n                    ingredient.name,\n                    ingredient.quantity\n                ]);\n            }\n        }\n        // Actualizar pasos (eliminar y volver a insertar)\n        if (body.steps) {\n            await (0,_lib_mysql__WEBPACK_IMPORTED_MODULE_1__.query)(\"DELETE FROM steps WHERE recipe_id = ?\", [\n                params.id\n            ]);\n            for(let i = 0; i < body.steps.length; i++){\n                await (0,_lib_mysql__WEBPACK_IMPORTED_MODULE_1__.query)(\"INSERT INTO steps (recipe_id, `order`, description) VALUES (?, ?, ?)\", [\n                    params.id,\n                    i + 1,\n                    body.steps[i]\n                ]);\n            }\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Receta actualizada con éxito\"\n        });\n    } catch (error) {\n        console.error(\"Error al actualizar receta:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Error al actualizar receta\"\n        }, {\n            status: 500\n        });\n    }\n}\n// DELETE: Eliminar una receta\nasync function DELETE(request, { params }) {\n    try {\n        await (0,_lib_mysql__WEBPACK_IMPORTED_MODULE_1__.query)(\"DELETE FROM ingredients WHERE recipe_id = ?\", [\n            params.id\n        ]);\n        await (0,_lib_mysql__WEBPACK_IMPORTED_MODULE_1__.query)(\"DELETE FROM steps WHERE recipe_id = ?\", [\n            params.id\n        ]);\n        await (0,_lib_mysql__WEBPACK_IMPORTED_MODULE_1__.query)(\"DELETE FROM recipes WHERE id = ?\", [\n            params.id\n        ]);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Receta eliminada con éxito\"\n        });\n    } catch (error) {\n        console.error(\"Error al eliminar receta:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Error al eliminar receta\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUtBLENBQUMseUNBQXlDO1lBQUNHLE9BQU9FLEVBQUU7U0FBQztRQUNoRSxNQUFNTCxpREFBS0EsQ0FBQyxvQ0FBb0M7WUFBQ0csT0FBT0UsRUFBRTtTQUFDO1FBRTNELE9BQU9OLHFEQUFZQSxDQUFDTyxJQUFJLENBQUM7WUFBRW1CLFNBQVM7UUFBNkI7SUFDbkUsRUFBRSxPQUFPbEIsT0FBTztRQUNkSSxRQUFRSixLQUFLLENBQUMsNkJBQTZCQTtRQUMzQyxPQUFPUixxREFBWUEsQ0FBQ08sSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBMkIsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDaEY7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL2RpYW5hL0Rlc2t0b3AvTWlzLVJlY2V0YXMtU0cvYXBwL2FwaS9yZWNpcGVzL1tpZF0vcm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCJcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcIkAvbGliL215c3FsXCJcbmltcG9ydCB0eXBlIHsgUmVjaXBlLCBJbmdyZWRpZW50LCBTdGVwIH0gZnJvbSBcIkAvbGliL215c3FsXCJcblxuLy8gR0VUOiBPYnRlbmVyIHVuYSByZWNldGEgZXNwZWPDrWZpY2EgY29uIHN1cyBpbmdyZWRpZW50ZXMgeSBwYXNvc1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXF1ZXN0OiBSZXF1ZXN0LCB7IHBhcmFtcyB9OiB7IHBhcmFtczogeyBpZDogc3RyaW5nIH0gfSkge1xuICB0cnkge1xuICAgIGNvbnN0IFtyZWNpcGVdID0gKGF3YWl0IHF1ZXJ5KFwiU0VMRUNUICogRlJPTSByZWNpcGVzIFdIRVJFIGlkID0gP1wiLCBbcGFyYW1zLmlkXSkpIGFzIFJlY2lwZVtdXG5cbiAgICBpZiAoIXJlY2lwZSkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiUmVjZXRhIG5vIGVuY29udHJhZGFcIiB9LCB7IHN0YXR1czogNDA0IH0pXG4gICAgfVxuXG4gICAgLy8gT2J0ZW5lciBpbmdyZWRpZW50ZXNcbiAgICBjb25zdCBpbmdyZWRpZW50cyA9IChhd2FpdCBxdWVyeShcIlNFTEVDVCAqIEZST00gaW5ncmVkaWVudHMgV0hFUkUgcmVjaXBlX2lkID0gP1wiLCBbcGFyYW1zLmlkXSkpIGFzIEluZ3JlZGllbnRbXVxuXG4gICAgLy8gT2J0ZW5lciBwYXNvc1xuICAgIGNvbnN0IHN0ZXBzID0gKGF3YWl0IHF1ZXJ5KFwiU0VMRUNUICogRlJPTSBzdGVwcyBXSEVSRSByZWNpcGVfaWQgPSA/IE9SREVSIEJZIGBvcmRlcmAgQVNDXCIsIFtwYXJhbXMuaWRdKSkgYXMgU3RlcFtdXG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgICAgLi4ucmVjaXBlLFxuICAgICAgaW5ncmVkaWVudHMsXG4gICAgICBzdGVwcyxcbiAgICB9KVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBhbCBvYnRlbmVyIHJlY2V0YTpcIiwgZXJyb3IpXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiRXJyb3IgYWwgb2J0ZW5lciByZWNldGFcIiB9LCB7IHN0YXR1czogNTAwIH0pXG4gIH1cbn1cblxuLy8gUFVUOiBBY3R1YWxpemFyIHVuYSByZWNldGFcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQVVQocmVxdWVzdDogUmVxdWVzdCwgeyBwYXJhbXMgfTogeyBwYXJhbXM6IHsgaWQ6IHN0cmluZyB9IH0pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxdWVzdC5qc29uKClcblxuICAgIC8vIEFjdHVhbGl6YXIgcmVjZXRhXG4gICAgYXdhaXQgcXVlcnkoXG4gICAgICBcIlVQREFURSByZWNpcGVzIFNFVCB0aXRsZSA9ID8sIGRlc2NyaXB0aW9uID0gPywgdGltZSA9ID8sIGRpZmZpY3VsdHkgPSA/LCBzZXJ2aW5ncyA9ID8sIGltYWdlX3VybCA9ID8gV0hFUkUgaWQgPSA/XCIsXG4gICAgICBbYm9keS50aXRsZSwgYm9keS5kZXNjcmlwdGlvbiwgYm9keS50aW1lLCBib2R5LmRpZmZpY3VsdHksIGJvZHkuc2VydmluZ3MsIGJvZHkuaW1hZ2VfdXJsLCBwYXJhbXMuaWRdLFxuICAgIClcblxuICAgIC8vIEFjdHVhbGl6YXIgaW5ncmVkaWVudGVzIChlbGltaW5hciB5IHZvbHZlciBhIGluc2VydGFyKVxuICAgIGlmIChib2R5LmluZ3JlZGllbnRzKSB7XG4gICAgICBhd2FpdCBxdWVyeShcIkRFTEVURSBGUk9NIGluZ3JlZGllbnRzIFdIRVJFIHJlY2lwZV9pZCA9ID9cIiwgW3BhcmFtcy5pZF0pXG4gICAgICBmb3IgKGNvbnN0IGluZ3JlZGllbnQgb2YgYm9keS5pbmdyZWRpZW50cykge1xuICAgICAgICBhd2FpdCBxdWVyeShcIklOU0VSVCBJTlRPIGluZ3JlZGllbnRzIChyZWNpcGVfaWQsIG5hbWUsIHF1YW50aXR5KSBWQUxVRVMgKD8sID8sID8pXCIsIFtcbiAgICAgICAgICBwYXJhbXMuaWQsXG4gICAgICAgICAgaW5ncmVkaWVudC5uYW1lLFxuICAgICAgICAgIGluZ3JlZGllbnQucXVhbnRpdHksXG4gICAgICAgIF0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWN0dWFsaXphciBwYXNvcyAoZWxpbWluYXIgeSB2b2x2ZXIgYSBpbnNlcnRhcilcbiAgICBpZiAoYm9keS5zdGVwcykge1xuICAgICAgYXdhaXQgcXVlcnkoXCJERUxFVEUgRlJPTSBzdGVwcyBXSEVSRSByZWNpcGVfaWQgPSA/XCIsIFtwYXJhbXMuaWRdKVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2R5LnN0ZXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGF3YWl0IHF1ZXJ5KFwiSU5TRVJUIElOVE8gc3RlcHMgKHJlY2lwZV9pZCwgYG9yZGVyYCwgZGVzY3JpcHRpb24pIFZBTFVFUyAoPywgPywgPylcIiwgW1xuICAgICAgICAgIHBhcmFtcy5pZCxcbiAgICAgICAgICBpICsgMSxcbiAgICAgICAgICBib2R5LnN0ZXBzW2ldLFxuICAgICAgICBdKVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IG1lc3NhZ2U6IFwiUmVjZXRhIGFjdHVhbGl6YWRhIGNvbiDDqXhpdG9cIiB9KVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBhbCBhY3R1YWxpemFyIHJlY2V0YTpcIiwgZXJyb3IpXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiRXJyb3IgYWwgYWN0dWFsaXphciByZWNldGFcIiB9LCB7IHN0YXR1czogNTAwIH0pXG4gIH1cbn1cblxuLy8gREVMRVRFOiBFbGltaW5hciB1bmEgcmVjZXRhXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gREVMRVRFKHJlcXVlc3Q6IFJlcXVlc3QsIHsgcGFyYW1zIH06IHsgcGFyYW1zOiB7IGlkOiBzdHJpbmcgfSB9KSB7XG4gIHRyeSB7XG4gICAgYXdhaXQgcXVlcnkoXCJERUxFVEUgRlJPTSBpbmdyZWRpZW50cyBXSEVSRSByZWNpcGVfaWQgPSA/XCIsIFtwYXJhbXMuaWRdKVxuICAgIGF3YWl0IHF1ZXJ5KFwiREVMRVRFIEZST00gc3RlcHMgV0hFUkUgcmVjaXBlX2lkID0gP1wiLCBbcGFyYW1zLmlkXSlcbiAgICBhd2FpdCBxdWVyeShcIkRFTEVURSBGUk9NIHJlY2lwZXMgV0hFUkUgaWQgPSA/XCIsIFtwYXJhbXMuaWRdKVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgbWVzc2FnZTogXCJSZWNldGEgZWxpbWluYWRhIGNvbiDDqXhpdG9cIiB9KVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBhbCBlbGltaW5hciByZWNldGE6XCIsIGVycm9yKVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkVycm9yIGFsIGVsaW1pbmFyIHJlY2V0YVwiIH0sIHsgc3RhdHVzOiA1MDAgfSlcbiAgfVxufVxuXG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwicXVlcnkiLCJHRVQiLCJyZXF1ZXN0IiwicGFyYW1zIiwicmVjaXBlIiwiaWQiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJpbmdyZWRpZW50cyIsInN0ZXBzIiwiY29uc29sZSIsIlBVVCIsImJvZHkiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwidGltZSIsImRpZmZpY3VsdHkiLCJzZXJ2aW5ncyIsImltYWdlX3VybCIsImluZ3JlZGllbnQiLCJuYW1lIiwicXVhbnRpdHkiLCJpIiwibGVuZ3RoIiwibWVzc2FnZSIsIkRFTEVURSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/recipes/[id]/route.ts\n");

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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Frecipes%2F%5Bid%5D%2Froute&page=%2Fapi%2Frecipes%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Frecipes%2F%5Bid%5D%2Froute.ts&appDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Frecipes%2F%5Bid%5D%2Froute&page=%2Fapi%2Frecipes%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Frecipes%2F%5Bid%5D%2Froute.ts&appDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_diana_Desktop_Mis_Recetas_SG_app_api_recipes_id_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/recipes/[id]/route.ts */ \"(rsc)/./app/api/recipes/[id]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/recipes/[id]/route\",\n        pathname: \"/api/recipes/[id]\",\n        filename: \"route\",\n        bundlePath: \"app/api/recipes/[id]/route\"\n    },\n    resolvedPagePath: \"/Users/diana/Desktop/Mis-Recetas-SG/app/api/recipes/[id]/route.ts\",\n    nextConfigOutput,\n    userland: _Users_diana_Desktop_Mis_Recetas_SG_app_api_recipes_id_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZyZWNpcGVzJTJGJTVCaWQlNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnJlY2lwZXMlMkYlNUJpZCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnJlY2lwZXMlMkYlNUJpZCU1RCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmRpYW5hJTJGRGVza3RvcCUyRk1pcy1SZWNldGFzLVNHJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmRpYW5hJTJGRGVza3RvcCUyRk1pcy1SZWNldGFzLVNHJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNpQjtBQUM5RjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL2RpYW5hL0Rlc2t0b3AvTWlzLVJlY2V0YXMtU0cvYXBwL2FwaS9yZWNpcGVzL1tpZF0vcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3JlY2lwZXMvW2lkXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3JlY2lwZXMvW2lkXVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvcmVjaXBlcy9baWRdL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL2RpYW5hL0Rlc2t0b3AvTWlzLVJlY2V0YXMtU0cvYXBwL2FwaS9yZWNpcGVzL1tpZF0vcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Frecipes%2F%5Bid%5D%2Froute&page=%2Fapi%2Frecipes%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Frecipes%2F%5Bid%5D%2Froute.ts&appDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@opentelemetry","vendor-chunks/mysql2","vendor-chunks/aws-ssl-profiles","vendor-chunks/iconv-lite","vendor-chunks/long","vendor-chunks/lru-cache","vendor-chunks/denque","vendor-chunks/is-property","vendor-chunks/lru.min","vendor-chunks/sqlstring","vendor-chunks/seq-queue","vendor-chunks/named-placeholders","vendor-chunks/generate-function","vendor-chunks/safer-buffer"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Frecipes%2F%5Bid%5D%2Froute&page=%2Fapi%2Frecipes%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Frecipes%2F%5Bid%5D%2Froute.ts&appDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();