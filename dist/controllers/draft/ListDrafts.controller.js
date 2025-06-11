"use strict";
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
exports.ListDraftsController = void 0;
const ListDrafts_service_1 = require("../../services/draft/ListDrafts.service");
class ListDraftsController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listDraftsService = new ListDrafts_service_1.ListDraftsService();
            const drafts = yield listDraftsService.execute();
            if (drafts.length === 0) {
                res.json({
                    message: "Nenhum rascunho encontrado!",
                    drafts
                });
                return;
            }
            res.json(drafts);
        });
    }
}
exports.ListDraftsController = ListDraftsController;
