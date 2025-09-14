import swaggerJsdoc from "swagger-jsdoc";
import { defineEventHandler } from "h3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Resolve paths properly for Nuxt 3
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Måleportal API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
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
            WorkingTime: { type: "string", example: "Mon-Fri 09:00-17:00" },
            VatNumber: { type: "string", example: "DK12345678" },
          },
        },
        Feature: {
          type: "object",
          properties: {
            Title: { type: "string", example: "Fast Delivery" },
            ShortDescription: {
              type: "string",
              example: "Get your orders delivered within 24 hours",
            },
            MainImgUrl: {
              type: "string",
              example: "https://example.com/main_feature.jpg",
            },
            SecondTitle: { type: "string", example: "Reliable & Quick" },
            Description: {
              type: "string",
              example:
                "We ensure fast and reliable delivery across the country.",
            },
            ImgUrl1: {
              type: "string",
              example: "https://example.com/feature_img1.jpg",
            },
            ImgUrl2: {
              type: "string",
              example: "https://example.com/feature_img2.jpg",
            },
          },
        },
        Characteristic: {
          type: "object",
          properties: {
            GraphicUrl: {
              type: "string",
              example: "https://example.com/graphic.jpg",
            },
            Title: { type: "string", example: "Eco Friendly" },
            ShortDescription: {
              type: "string",
              example: "Our product is environmentally friendly",
            },
            SecondTitle: { type: "string", example: "Sustainable & Green" },
            Description: {
              type: "string",
              example:
                "We use sustainable materials to reduce environmental impact.",
            },
            ImgUrl1: {
              type: "string",
              example: "https://example.com/img1.jpg",
            },
          },
        },
        Statistic: {
          type: "object",
          properties: {
            ImgUrl: {
              type: "string",
              example: "https://example.com/stat_img.jpg",
            },
            Ammount: { type: "number", example: 1500 },
            Description: {
              type: "string",
              example: "Number of satisfied customers worldwide",
            },
          },
        },
      },
    },
  },
  apis: [
    join(__dirname, "../../server/api/**/*.ts"), // source files for endpoints
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default defineEventHandler(() => swaggerSpec);
