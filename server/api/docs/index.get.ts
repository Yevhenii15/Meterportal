import swaggerJsdoc from "swagger-jsdoc";
import { defineEventHandler } from "h3";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Måleportal API",
      version: "1.0.0",
    },
  },
  apis: ["./server/api/**/*.ts"], // include JSDoc comments from your API
};

const swaggerSpec = swaggerJsdoc(options);

export default defineEventHandler((event) => {
  return swaggerSpec;
});
