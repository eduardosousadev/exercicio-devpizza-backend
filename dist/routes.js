"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const CreateUser_controller_1 = require("./controllers/user/CreateUser.controller");
const AuthUser_controller_1 = require("./controllers/user/AuthUser.controller");
const DetailUser_controller_1 = require("./controllers/user/DetailUser.controller");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const CreateCategory_controller_1 = require("./controllers/category/CreateCategory.controller");
const ListCategory_controller_1 = require("./controllers/category/ListCategory.controller");
const CreateProduct_controller_1 = require("./controllers/product/CreateProduct.controller");
const ListByCategory_controller_1 = require("./controllers/product/ListByCategory.controller");
const CreateOrder_controller_1 = require("./controllers/order/CreateOrder.controller");
const RemoveOrder_controller_1 = require("./controllers/order/RemoveOrder.controller");
const AddItem_controller_1 = require("./controllers/order/AddItem.controller");
const RemoveItem_controller_1 = require("./controllers/order/RemoveItem.controller");
const sendOrder_controller_1 = require("./controllers/order/sendOrder.controller");
const ListOrders_controller_1 = require("./controllers/order/ListOrders.controller");
const DetailsOrder_controller_1 = require("./controllers/order/DetailsOrder.controller");
const FinishOrder_controller_1 = require("./controllers/order/FinishOrder.controller");
const getAllUsers_controller_1 = require("./controllers/user/getAllUsers.controller");
const ListDrafts_controller_1 = require("./controllers/draft/ListDrafts.controller");
const router = (0, express_1.Router)();
exports.router = router;
// --ROTAS USER--
router.get('/users', new getAllUsers_controller_1.GetAllUsersController().handle);
router.post('/users', new CreateUser_controller_1.CreateUserController().handle);
router.post('/session', new AuthUser_controller_1.AuthUserController().handle);
router.get('/me', isAuthenticated_1.isAuthenticated, new DetailUser_controller_1.DetailUserController().handle);
// --ROTAS CATEGORY--
router.post('/category', isAuthenticated_1.isAuthenticated, new CreateCategory_controller_1.CreateCategoryController().handle);
router.get('/category', isAuthenticated_1.isAuthenticated, new ListCategory_controller_1.ListCategoryController().handle);
// --ROTAS PRODUCT--
router.post('/product', isAuthenticated_1.isAuthenticated, new CreateProduct_controller_1.CreateProductController().handle);
router.get('/category/product', isAuthenticated_1.isAuthenticated, new ListByCategory_controller_1.ListByCategoryController().handle);
// --ROTAS DRAFT--
router.get('/drafts', isAuthenticated_1.isAuthenticated, new ListDrafts_controller_1.ListDraftsController().handle);
// --ROTAS ORDER--
router.post('/order', isAuthenticated_1.isAuthenticated, new CreateOrder_controller_1.CreateOrderController().handle);
router.delete('/order', isAuthenticated_1.isAuthenticated, new RemoveOrder_controller_1.RemoveOrderController().handle);
router.post('/order/addItem', isAuthenticated_1.isAuthenticated, new AddItem_controller_1.AddItemController().handle);
router.delete('/order/removeItem', isAuthenticated_1.isAuthenticated, new RemoveItem_controller_1.RemoveItemController().handle);
router.patch('/order/send', isAuthenticated_1.isAuthenticated, new sendOrder_controller_1.SendOrderController().handle);
router.get('/orders', isAuthenticated_1.isAuthenticated, new ListOrders_controller_1.ListOrdersController().handle);
router.get('/order/details', isAuthenticated_1.isAuthenticated, new DetailsOrder_controller_1.DetailsOrderController().handle);
router.patch('/order/finish', isAuthenticated_1.isAuthenticated, new FinishOrder_controller_1.FinishOrderController().handle);
