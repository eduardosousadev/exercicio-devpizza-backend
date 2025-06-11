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

import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProduct.service";
import { UploadedFile } from "express-fileupload";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDNARY_NAME,
  api_key: process.env.CLOUDNARY_KEY,
  api_secret: process.env.CLOUDNARY_SECRET
});

type RequestWithFiles = Request & {
  files: {
    [key: string]: UploadedFile | UploadedFile[];
  };
};

class CreateProductController {
  async handle(req: Request, res: Response) {
    const reqWithFiles = req as RequestWithFiles;
    const { name, price, description, category_id } = req.body;
    const createProductService = new CreateProductService();

    if(!reqWithFiles.files || !reqWithFiles.files['file']) {
      res.status(400).json({ error: "Nenhum arquivo foi enviado." });
      return;
    }
    
    const file: UploadedFile = reqWithFiles.files['file'] as UploadedFile;

    const resultFile: UploadApiResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({}, (error, result) => {
        if(error) {
          reject(error);
          return;
        }

        if(!result) {
          reject(new Error("Erro ao fazer upload do arquivo."));
          return;
        }

        resolve(result);
      }).end(file.data);
    })

    console.log(resultFile);

      const product = await createProductService.execute({
        name,
        price,
        description,
        banner: resultFile.secure_url,
        category_id
      });
  
      res.json(product);
  }
}

export { CreateProductController };