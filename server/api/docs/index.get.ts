import swaggerJsdoc from "swagger-jsdoc";
import { defineEventHandler } from "h3";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Måleportal API",
      version: "1.0.0",
    },
    components: {
      schemas: {
        IntroInfo: {
          type: "object",
          properties: {
            Title: { type: "string", example: "Måleportal" },
            Slogan: {
              type: "string",
              example: "We measure everything precisely",
            },
            MainImgUrl: {
              type: "string",
              example: "https://example.com/main.jpg",
            },
            LogoUrl: {
              type: "string",
              example: "https://example.com/logo.png",
            },
            UtilityLink: {
              type: "string",
              example: "https://example.com/utility",
            },
            ConsumerLink: {
              type: "string",
              example: "https://example.com/consumer",
            },
            DownloadAppStore: {
              type: "string",
              example: "https://apps.apple.com/app",
            },
            DownloadGooglePlay: {
              type: "string",
              example: "https://play.google.com/store/apps",
            },
            Description: {
              type: "string",
              example: "This is the intro description.",
            },
          },
        },
        About: {
          type: "object",
          properties: {
            Description: {
              type: "string",
              example: "We are a data-driven company...",
            },
            NameOfCDO: { type: "string", example: "John Doe" },
            PositionOfCDO: { type: "string", example: "Chief Data Officer" },
            ImgUrl: { type: "string", example: "https://example.com/cdo.jpg" },
          },
        },
        Contact: {
          type: "object",
          properties: {
            Phone: { type: "string", example: "+45 12 34 56 78" },
            Email: { type: "string", example: "info@maleportal.com" },
            Address: {
              type: "string",
              example: "123 Main Street, Copenhagen, Denmark",
            },
            WorkingTime: {
              type: "string",
              example: "Mon-Fri 09:00-17:00",
            },
            VatNumber: { type: "string", example: "DK12345678" },
          },
        },
      },
    },
  },
  apis: ["./server/api/**/*.ts"], // scan JSDoc comments
};

const swaggerSpec = swaggerJsdoc(options);

export default defineEventHandler(() => swaggerSpec);
