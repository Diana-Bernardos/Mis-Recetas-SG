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
exports.id = "app/api/recipes/route";
exports.ids = ["app/api/recipes/route"];
exports.modules = {

/***/ "(rsc)/./app/api/recipes/route.ts":
/*!**********************************!*\
  !*** ./app/api/recipes/route.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_mysql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/mysql */ \"(rsc)/./lib/mysql.ts\");\n/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fs/promises */ \"fs/promises\");\n/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs_promises__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuid */ \"(rsc)/./node_modules/uuid/dist/esm/v4.js\");\n\n\n\n\n\n\n// Función para asegurar que el directorio existe\nasync function ensureDirectoryExists(directory) {\n    try {\n        if (!(0,fs__WEBPACK_IMPORTED_MODULE_4__.existsSync)(directory)) {\n            await (0,fs_promises__WEBPACK_IMPORTED_MODULE_2__.mkdir)(directory, {\n                recursive: true\n            });\n        }\n        return true;\n    } catch (error) {\n        console.error(\"Error al crear directorio:\", error);\n        return false;\n    }\n}\n// GET: Obtener todas las recetas\nasync function GET() {\n    try {\n        const recipes = await (0,_lib_mysql__WEBPACK_IMPORTED_MODULE_1__.query)(\"SELECT * FROM recipes ORDER BY created_at DESC\");\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(recipes);\n    } catch (error) {\n        console.error(\"Error al obtener recetas:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Error al obtener recetas sin gluten\"\n        }, {\n            status: 500\n        });\n    }\n}\n// POST: Crear una nueva receta\nasync function POST(request) {\n    try {\n        // Procesar el FormData\n        const formData = await request.formData();\n        // Extraer datos del formulario\n        const title = formData.get(\"title\");\n        const description = formData.get(\"description\");\n        const time = formData.get(\"time\");\n        const difficulty = formData.get(\"difficulty\");\n        const servings = formData.get(\"servings\");\n        const ingredientsJson = formData.get(\"ingredients\");\n        const stepsJson = formData.get(\"steps\");\n        const glutenFree = formData.get(\"gluten_free\") === \"true\";\n        // URL de imagen directa si se proporciona\n        let imageUrl = formData.get(\"image_url\") || \"/placeholder.svg?height=200&width=300&text=Receta\";\n        // Procesar imagen si se sube un archivo\n        const imageFile = formData.get(\"image\");\n        if (imageFile && imageFile.size > 0) {\n            try {\n                // Crear directorio para subidas si no existe\n                const uploadDir = (0,path__WEBPACK_IMPORTED_MODULE_3__.join)(process.cwd(), \"public/uploads\");\n                const dirExists = await ensureDirectoryExists(uploadDir);\n                if (!dirExists) {\n                    throw new Error(\"No se pudo crear el directorio de subidas\");\n                }\n                // Generar nombre de archivo único\n                const extension = imageFile.name.split(\".\").pop() || \"jpg\";\n                const fileName = `${(0,uuid__WEBPACK_IMPORTED_MODULE_5__[\"default\"])()}.${extension}`;\n                const filePath = (0,path__WEBPACK_IMPORTED_MODULE_3__.join)(uploadDir, fileName);\n                // Convertir el archivo a buffer y guardarlo\n                const arrayBuffer = await imageFile.arrayBuffer();\n                const buffer = Buffer.from(arrayBuffer);\n                await (0,fs_promises__WEBPACK_IMPORTED_MODULE_2__.writeFile)(filePath, buffer);\n                // Actualizar la URL de la imagen\n                imageUrl = `/uploads/${fileName}`;\n            } catch (error) {\n                console.error(\"Error al guardar la imagen:\", error);\n            // Continuamos con la URL predeterminada si hay error\n            }\n        }\n        // Convertir cadenas JSON a arrays\n        const ingredients = JSON.parse(ingredientsJson || \"[]\");\n        const steps = JSON.parse(stepsJson || \"[]\");\n        // Insertar receta en la base de datos\n        const result = await (0,_lib_mysql__WEBPACK_IMPORTED_MODULE_1__.query)(\"INSERT INTO recipes (title, description, time, difficulty, servings, image_url, gluten_free) VALUES (?, ?, ?, ?, ?, ?, ?)\", [\n            title,\n            description,\n            time,\n            difficulty,\n            servings,\n            imageUrl,\n            glutenFree ? 1 : 0\n        ]);\n        // @ts-ignore - Obtener el ID insertado\n        const recipeId = result.insertId;\n        // Insertar ingredientes\n        for (const ingredient of ingredients){\n            await (0,_lib_mysql__WEBPACK_IMPORTED_MODULE_1__.query)(\"INSERT INTO ingredients (recipe_id, name, quantity) VALUES (?, ?, ?)\", [\n                recipeId,\n                ingredient.name,\n                ingredient.quantity || \"Cantidad no especificada\"\n            ]);\n        }\n        // Insertar pasos\n        for(let i = 0; i < steps.length; i++){\n            await (0,_lib_mysql__WEBPACK_IMPORTED_MODULE_1__.query)(\"INSERT INTO steps (recipe_id, `order`, description) VALUES (?, ?, ?)\", [\n                recipeId,\n                i + 1,\n                steps[i]\n            ]);\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Receta creada con éxito\",\n            id: recipeId,\n            imageUrl\n        });\n    } catch (error) {\n        console.error(\"Error al crear receta:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message || \"Error al crear la receta\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVMsTUFBTWxELGlEQUFLQSxDQUN4Qiw2SEFDQTtZQUFDbUI7WUFBT0U7WUFBYUM7WUFBTUM7WUFBWUM7WUFBVUk7WUFBVUQsYUFBYSxJQUFJO1NBQUU7UUFHaEYsdUNBQXVDO1FBQ3ZDLE1BQU13QixXQUFXRCxPQUFPRSxRQUFRO1FBRWhDLHdCQUF3QjtRQUN4QixLQUFLLE1BQU1DLGNBQWNQLFlBQWE7WUFDcEMsTUFBTTlDLGlEQUFLQSxDQUFDLHdFQUF3RTtnQkFDbEZtRDtnQkFDQUUsV0FBV2hCLElBQUk7Z0JBQ2ZnQixXQUFXQyxRQUFRLElBQUk7YUFDeEI7UUFDSDtRQUVBLGlCQUFpQjtRQUNqQixJQUFLLElBQUlDLElBQUksR0FBR0EsSUFBSU4sTUFBTU8sTUFBTSxFQUFFRCxJQUFLO1lBQ3JDLE1BQU12RCxpREFBS0EsQ0FBQyx3RUFBd0U7Z0JBQ2xGbUQ7Z0JBQ0FJLElBQUk7Z0JBQ0pOLEtBQUssQ0FBQ00sRUFBRTthQUNUO1FBQ0g7UUFFQSxPQUFPeEQscURBQVlBLENBQUNlLElBQUksQ0FBQztZQUN2QjJDLFNBQVM7WUFDVEMsSUFBSVA7WUFDSnZCO1FBQ0Y7SUFFRixFQUFFLE9BQU9sQixPQUFZO1FBQ25CQyxRQUFRRCxLQUFLLENBQUMsMEJBQTBCQTtRQUN4QyxPQUFPWCxxREFBWUEsQ0FBQ2UsSUFBSSxDQUFDO1lBQ3ZCSixPQUFPQSxNQUFNK0MsT0FBTyxJQUFJO1FBQzFCLEdBQUc7WUFBRTFDLFFBQVE7UUFBSTtJQUNuQjtBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvZGlhbmEvRGVza3RvcC9NaXMtUmVjZXRhcy1TRy9hcHAvYXBpL3JlY2lwZXMvcm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCJcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcIkAvbGliL215c3FsXCJcbmltcG9ydCB7IHdyaXRlRmlsZSwgbWtkaXIgfSBmcm9tIFwiZnMvcHJvbWlzZXNcIlxuaW1wb3J0IHsgam9pbiB9IGZyb20gXCJwYXRoXCJcbmltcG9ydCB7IGV4aXN0c1N5bmMgfSBmcm9tIFwiZnNcIlxuaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSBcInV1aWRcIlxuXG4vLyBGdW5jacOzbiBwYXJhIGFzZWd1cmFyIHF1ZSBlbCBkaXJlY3RvcmlvIGV4aXN0ZVxuYXN5bmMgZnVuY3Rpb24gZW5zdXJlRGlyZWN0b3J5RXhpc3RzKGRpcmVjdG9yeTogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgaWYgKCFleGlzdHNTeW5jKGRpcmVjdG9yeSkpIHtcbiAgICAgIGF3YWl0IG1rZGlyKGRpcmVjdG9yeSwgeyByZWN1cnNpdmU6IHRydWUgfSlcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYWwgY3JlYXIgZGlyZWN0b3JpbzpcIiwgZXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuLy8gR0VUOiBPYnRlbmVyIHRvZGFzIGxhcyByZWNldGFzXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xuICB0cnkge1xuICAgIGNvbnN0IHJlY2lwZXMgPSBhd2FpdCBxdWVyeShcIlNFTEVDVCAqIEZST00gcmVjaXBlcyBPUkRFUiBCWSBjcmVhdGVkX2F0IERFU0NcIilcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24ocmVjaXBlcylcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYWwgb2J0ZW5lciByZWNldGFzOlwiLCBlcnJvcilcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJFcnJvciBhbCBvYnRlbmVyIHJlY2V0YXMgc2luIGdsdXRlblwiIH0sIHsgc3RhdHVzOiA1MDAgfSlcbiAgfVxufVxuXG4vLyBQT1NUOiBDcmVhciB1bmEgbnVldmEgcmVjZXRhXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgLy8gUHJvY2VzYXIgZWwgRm9ybURhdGFcbiAgICBjb25zdCBmb3JtRGF0YSA9IGF3YWl0IHJlcXVlc3QuZm9ybURhdGEoKVxuICAgIFxuICAgIC8vIEV4dHJhZXIgZGF0b3MgZGVsIGZvcm11bGFyaW9cbiAgICBjb25zdCB0aXRsZSA9IGZvcm1EYXRhLmdldChcInRpdGxlXCIpIGFzIHN0cmluZ1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZm9ybURhdGEuZ2V0KFwiZGVzY3JpcHRpb25cIikgYXMgc3RyaW5nXG4gICAgY29uc3QgdGltZSA9IGZvcm1EYXRhLmdldChcInRpbWVcIikgYXMgc3RyaW5nXG4gICAgY29uc3QgZGlmZmljdWx0eSA9IGZvcm1EYXRhLmdldChcImRpZmZpY3VsdHlcIikgYXMgc3RyaW5nXG4gICAgY29uc3Qgc2VydmluZ3MgPSBmb3JtRGF0YS5nZXQoXCJzZXJ2aW5nc1wiKSBhcyBzdHJpbmdcbiAgICBjb25zdCBpbmdyZWRpZW50c0pzb24gPSBmb3JtRGF0YS5nZXQoXCJpbmdyZWRpZW50c1wiKSBhcyBzdHJpbmdcbiAgICBjb25zdCBzdGVwc0pzb24gPSBmb3JtRGF0YS5nZXQoXCJzdGVwc1wiKSBhcyBzdHJpbmdcbiAgICBjb25zdCBnbHV0ZW5GcmVlID0gZm9ybURhdGEuZ2V0KFwiZ2x1dGVuX2ZyZWVcIikgPT09IFwidHJ1ZVwiXG4gICAgXG4gICAgLy8gVVJMIGRlIGltYWdlbiBkaXJlY3RhIHNpIHNlIHByb3BvcmNpb25hXG4gICAgbGV0IGltYWdlVXJsID0gZm9ybURhdGEuZ2V0KFwiaW1hZ2VfdXJsXCIpIGFzIHN0cmluZyB8fCBcIi9wbGFjZWhvbGRlci5zdmc/aGVpZ2h0PTIwMCZ3aWR0aD0zMDAmdGV4dD1SZWNldGFcIlxuICAgIFxuICAgIC8vIFByb2Nlc2FyIGltYWdlbiBzaSBzZSBzdWJlIHVuIGFyY2hpdm9cbiAgICBjb25zdCBpbWFnZUZpbGUgPSBmb3JtRGF0YS5nZXQoXCJpbWFnZVwiKSBhcyBGaWxlXG4gICAgXG4gICAgaWYgKGltYWdlRmlsZSAmJiBpbWFnZUZpbGUuc2l6ZSA+IDApIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIENyZWFyIGRpcmVjdG9yaW8gcGFyYSBzdWJpZGFzIHNpIG5vIGV4aXN0ZVxuICAgICAgICBjb25zdCB1cGxvYWREaXIgPSBqb2luKHByb2Nlc3MuY3dkKCksIFwicHVibGljL3VwbG9hZHNcIilcbiAgICAgICAgY29uc3QgZGlyRXhpc3RzID0gYXdhaXQgZW5zdXJlRGlyZWN0b3J5RXhpc3RzKHVwbG9hZERpcilcbiAgICAgICAgXG4gICAgICAgIGlmICghZGlyRXhpc3RzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gc2UgcHVkbyBjcmVhciBlbCBkaXJlY3RvcmlvIGRlIHN1YmlkYXNcIilcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gR2VuZXJhciBub21icmUgZGUgYXJjaGl2byDDum5pY29cbiAgICAgICAgY29uc3QgZXh0ZW5zaW9uID0gaW1hZ2VGaWxlLm5hbWUuc3BsaXQoXCIuXCIpLnBvcCgpIHx8IFwianBnXCJcbiAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBgJHt1dWlkdjQoKX0uJHtleHRlbnNpb259YFxuICAgICAgICBjb25zdCBmaWxlUGF0aCA9IGpvaW4odXBsb2FkRGlyLCBmaWxlTmFtZSlcbiAgICAgICAgXG4gICAgICAgIC8vIENvbnZlcnRpciBlbCBhcmNoaXZvIGEgYnVmZmVyIHkgZ3VhcmRhcmxvXG4gICAgICAgIGNvbnN0IGFycmF5QnVmZmVyID0gYXdhaXQgaW1hZ2VGaWxlLmFycmF5QnVmZmVyKClcbiAgICAgICAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmZyb20oYXJyYXlCdWZmZXIpXG4gICAgICAgIGF3YWl0IHdyaXRlRmlsZShmaWxlUGF0aCwgYnVmZmVyKVxuICAgICAgICBcbiAgICAgICAgLy8gQWN0dWFsaXphciBsYSBVUkwgZGUgbGEgaW1hZ2VuXG4gICAgICAgIGltYWdlVXJsID0gYC91cGxvYWRzLyR7ZmlsZU5hbWV9YFxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGFsIGd1YXJkYXIgbGEgaW1hZ2VuOlwiLCBlcnJvcilcbiAgICAgICAgLy8gQ29udGludWFtb3MgY29uIGxhIFVSTCBwcmVkZXRlcm1pbmFkYSBzaSBoYXkgZXJyb3JcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gQ29udmVydGlyIGNhZGVuYXMgSlNPTiBhIGFycmF5c1xuICAgIGNvbnN0IGluZ3JlZGllbnRzID0gSlNPTi5wYXJzZShpbmdyZWRpZW50c0pzb24gfHwgXCJbXVwiKVxuICAgIGNvbnN0IHN0ZXBzID0gSlNPTi5wYXJzZShzdGVwc0pzb24gfHwgXCJbXVwiKVxuICAgIFxuICAgIC8vIEluc2VydGFyIHJlY2V0YSBlbiBsYSBiYXNlIGRlIGRhdG9zXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcXVlcnkoXG4gICAgICBcIklOU0VSVCBJTlRPIHJlY2lwZXMgKHRpdGxlLCBkZXNjcmlwdGlvbiwgdGltZSwgZGlmZmljdWx0eSwgc2VydmluZ3MsIGltYWdlX3VybCwgZ2x1dGVuX2ZyZWUpIFZBTFVFUyAoPywgPywgPywgPywgPywgPywgPylcIixcbiAgICAgIFt0aXRsZSwgZGVzY3JpcHRpb24sIHRpbWUsIGRpZmZpY3VsdHksIHNlcnZpbmdzLCBpbWFnZVVybCwgZ2x1dGVuRnJlZSA/IDEgOiAwXVxuICAgIClcbiAgICBcbiAgICAvLyBAdHMtaWdub3JlIC0gT2J0ZW5lciBlbCBJRCBpbnNlcnRhZG9cbiAgICBjb25zdCByZWNpcGVJZCA9IHJlc3VsdC5pbnNlcnRJZFxuICAgIFxuICAgIC8vIEluc2VydGFyIGluZ3JlZGllbnRlc1xuICAgIGZvciAoY29uc3QgaW5ncmVkaWVudCBvZiBpbmdyZWRpZW50cykge1xuICAgICAgYXdhaXQgcXVlcnkoXCJJTlNFUlQgSU5UTyBpbmdyZWRpZW50cyAocmVjaXBlX2lkLCBuYW1lLCBxdWFudGl0eSkgVkFMVUVTICg/LCA/LCA/KVwiLCBbXG4gICAgICAgIHJlY2lwZUlkLFxuICAgICAgICBpbmdyZWRpZW50Lm5hbWUsXG4gICAgICAgIGluZ3JlZGllbnQucXVhbnRpdHkgfHwgXCJDYW50aWRhZCBubyBlc3BlY2lmaWNhZGFcIlxuICAgICAgXSlcbiAgICB9XG4gICAgXG4gICAgLy8gSW5zZXJ0YXIgcGFzb3NcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ZXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhd2FpdCBxdWVyeShcIklOU0VSVCBJTlRPIHN0ZXBzIChyZWNpcGVfaWQsIGBvcmRlcmAsIGRlc2NyaXB0aW9uKSBWQUxVRVMgKD8sID8sID8pXCIsIFtcbiAgICAgICAgcmVjaXBlSWQsXG4gICAgICAgIGkgKyAxLFxuICAgICAgICBzdGVwc1tpXVxuICAgICAgXSlcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgXG4gICAgICBtZXNzYWdlOiBcIlJlY2V0YSBjcmVhZGEgY29uIMOpeGl0b1wiLCBcbiAgICAgIGlkOiByZWNpcGVJZCxcbiAgICAgIGltYWdlVXJsIFxuICAgIH0pXG4gICAgXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYWwgY3JlYXIgcmVjZXRhOlwiLCBlcnJvcilcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBcbiAgICAgIGVycm9yOiBlcnJvci5tZXNzYWdlIHx8IFwiRXJyb3IgYWwgY3JlYXIgbGEgcmVjZXRhXCJcbiAgICB9LCB7IHN0YXR1czogNTAwIH0pXG4gIH1cbn0iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwicXVlcnkiLCJ3cml0ZUZpbGUiLCJta2RpciIsImpvaW4iLCJleGlzdHNTeW5jIiwidjQiLCJ1dWlkdjQiLCJlbnN1cmVEaXJlY3RvcnlFeGlzdHMiLCJkaXJlY3RvcnkiLCJyZWN1cnNpdmUiLCJlcnJvciIsImNvbnNvbGUiLCJHRVQiLCJyZWNpcGVzIiwianNvbiIsInN0YXR1cyIsIlBPU1QiLCJyZXF1ZXN0IiwiZm9ybURhdGEiLCJ0aXRsZSIsImdldCIsImRlc2NyaXB0aW9uIiwidGltZSIsImRpZmZpY3VsdHkiLCJzZXJ2aW5ncyIsImluZ3JlZGllbnRzSnNvbiIsInN0ZXBzSnNvbiIsImdsdXRlbkZyZWUiLCJpbWFnZVVybCIsImltYWdlRmlsZSIsInNpemUiLCJ1cGxvYWREaXIiLCJwcm9jZXNzIiwiY3dkIiwiZGlyRXhpc3RzIiwiRXJyb3IiLCJleHRlbnNpb24iLCJuYW1lIiwic3BsaXQiLCJwb3AiLCJmaWxlTmFtZSIsImZpbGVQYXRoIiwiYXJyYXlCdWZmZXIiLCJidWZmZXIiLCJCdWZmZXIiLCJmcm9tIiwiaW5ncmVkaWVudHMiLCJKU09OIiwicGFyc2UiLCJzdGVwcyIsInJlc3VsdCIsInJlY2lwZUlkIiwiaW5zZXJ0SWQiLCJpbmdyZWRpZW50IiwicXVhbnRpdHkiLCJpIiwibGVuZ3RoIiwibWVzc2FnZSIsImlkIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/recipes/route.ts\n");

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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Frecipes%2Froute&page=%2Fapi%2Frecipes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Frecipes%2Froute.ts&appDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Frecipes%2Froute&page=%2Fapi%2Frecipes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Frecipes%2Froute.ts&appDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_diana_Desktop_Mis_Recetas_SG_app_api_recipes_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/recipes/route.ts */ \"(rsc)/./app/api/recipes/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/recipes/route\",\n        pathname: \"/api/recipes\",\n        filename: \"route\",\n        bundlePath: \"app/api/recipes/route\"\n    },\n    resolvedPagePath: \"/Users/diana/Desktop/Mis-Recetas-SG/app/api/recipes/route.ts\",\n    nextConfigOutput,\n    userland: _Users_diana_Desktop_Mis_Recetas_SG_app_api_recipes_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZyZWNpcGVzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZyZWNpcGVzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGcmVjaXBlcyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmRpYW5hJTJGRGVza3RvcCUyRk1pcy1SZWNldGFzLVNHJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmRpYW5hJTJGRGVza3RvcCUyRk1pcy1SZWNldGFzLVNHJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNZO0FBQ3pGO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvZGlhbmEvRGVza3RvcC9NaXMtUmVjZXRhcy1TRy9hcHAvYXBpL3JlY2lwZXMvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3JlY2lwZXMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9yZWNpcGVzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9yZWNpcGVzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL2RpYW5hL0Rlc2t0b3AvTWlzLVJlY2V0YXMtU0cvYXBwL2FwaS9yZWNpcGVzL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Frecipes%2Froute&page=%2Fapi%2Frecipes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Frecipes%2Froute.ts&appDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("fs/promises");

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

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@opentelemetry","vendor-chunks/mysql2","vendor-chunks/aws-ssl-profiles","vendor-chunks/iconv-lite","vendor-chunks/long","vendor-chunks/lru-cache","vendor-chunks/denque","vendor-chunks/is-property","vendor-chunks/lru.min","vendor-chunks/sqlstring","vendor-chunks/seq-queue","vendor-chunks/named-placeholders","vendor-chunks/generate-function","vendor-chunks/safer-buffer","vendor-chunks/uuid"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Frecipes%2Froute&page=%2Fapi%2Frecipes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Frecipes%2Froute.ts&appDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdiana%2FDesktop%2FMis-Recetas-SG&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();