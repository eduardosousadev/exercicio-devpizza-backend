"use strict";
/*
  import { Request, Response } from "express";
  import { CreateProductService } from "../../services/product/CreateProduct.service";

  class CreateProductController {
    async handle(req: Request, res: Response) {
      const { name, price, description, category_id } = req.body;
      const createProductService = new CreateProductService();

      if(!req.file) {
        throw new Error("Error upload file")
      } else {
        const { originalname, filename: banner } = req.file;
        const product = await createProductService.execute({
          name,
          price,
          description,
          banner,
          category_id
        });
    
        res.json(product);
      }
    }
  }
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductController = void 0;
const CreateProduct_service_1 = require("../../services/product/CreateProduct.service");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDNARY_NAME,
    api_key: process.env.CLOUDNARY_KEY,
    api_secret: process.env.CLOUDNARY_SECRET
});
class CreateProductController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reqWithFiles = req;
            const { name, price, description, category_id } = req.body;
            const createProductService = new CreateProduct_service_1.CreateProductService();
            if (!reqWithFiles.files || !reqWithFiles.files['file']) {
                res.status(400).json({ error: "Nenhum arquivo foi enviado." });
                return;
            }
            const file = reqWithFiles.files['file'];
            const resultFile = yield new Promise((resolve, reject) => {
                cloudinary_1.v2.uploader.upload_stream({}, (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    if (!result) {
                        reject(new Error("Erro ao fazer upload do arquivo."));
                        return;
                    }
                    resolve(result);
                }).end(file.data);
            });
            console.log(resultFile);
            const product = yield createProductService.execute({
                name,
                price,
                description,
                banner: resultFile.secure_url,
                category_id
            });
            res.json(product);
        });
    }
}
exports.CreateProductController = CreateProductController;
