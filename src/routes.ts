import { Router } from 'express';
import { CreateUserController } from './controllers/user/CreateUser.controller';
import { AuthUserController } from './controllers/user/AuthUser.controller';
import { DetailUserController } from "./controllers/user/DetailUser.controller";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategory.controller";
import { ListCategoryController } from "./controllers/category/ListCategory.controller";
import { CreateProductController } from "./controllers/product/CreateProduct.controller";
import { ListByCategoryController } from "./controllers/product/ListByCategory.controller";
import { CreateOrderController } from "./controllers/order/CreateOrder.controller";
import { RemoveOrderController } from "./controllers/order/RemoveOrder.controller";
import { AddItemController } from "./controllers/order/AddItem.controller";
import { RemoveItemController } from "./controllers/order/RemoveItem.controller";
import { SendOrderController } from "./controllers/order/sendOrder.controller";
import { ListOrdersController } from "./controllers/order/ListOrders.controller";
import { DetailsOrderController } from "./controllers/order/DetailsOrder.controller";
import { FinishOrderController } from "./controllers/order/FinishOrder.controller";
import { GetAllUsersController } from "./controllers/user/getAllUsers.controller";
import { ListDraftsController } from "./controllers/draft/ListDrafts.controller";

const router = Router();

// --ROTAS USER--
router.get('/users', new GetAllUsersController().handle);
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);


// --ROTAS CATEGORY--
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/category', isAuthenticated, new ListCategoryController().handle);

// --ROTAS PRODUCT--
router.post('/product', isAuthenticated, new CreateProductController().handle);
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle);

// --ROTAS DRAFT--
router.get('/drafts', isAuthenticated, new ListDraftsController().handle);

// --ROTAS ORDER--
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.delete('/order', isAuthenticated, new RemoveOrderController().handle);
router.post('/order/addItem', isAuthenticated, new AddItemController().handle);
router.delete('/order/removeItem', isAuthenticated, new RemoveItemController().handle);
router.patch('/order/send', isAuthenticated, new SendOrderController().handle);
router.get('/orders', isAuthenticated, new ListOrdersController().handle);
router.get('/order/details', isAuthenticated, new DetailsOrderController().handle);
router.patch('/order/finish', isAuthenticated, new FinishOrderController().handle);

export { router };