import { Router } from 'express';
import { postRecipe, getAllRecipes, getRecipe, putRecipe } from '../controllers/MenuController';
import { postPlan, getPlans, getPlanMenu, storeMenu } from '../controllers/PricingController';
import {
  registerUser, login,
  logout, verifyToken,
} from '../controllers/AuthController';
import {
  getProfile, getUserPlan,
  choosePlan, getPlanInstance, setDeliveryInfo,
  getSelectedRecipes, selectRecipe,
} from '../controllers/UserController';

const router = Router();

// home route
// router.get('/', (req, res) => res.json({ message: 'This is Daily Recipe!!!' }));

// auth routes
router.post('/api/auth/register', registerUser);
router.post('/api/auth/login', login);
router.get('/api/auth/logout', logout);

// menu routes
router.post('/api/menu', postRecipe);
router.put('/api/menu/:id', putRecipe);
router.get('/api/menu', getAllRecipes);
router.get('/api/menu/:id', getRecipe);

// plans route
router.post('/api/plans', postPlan);
router.get('/api/plans', getPlans);
router.get('/api/plan/menu/:planId', getPlanMenu);
router.put('/api/plan/menu', storeMenu);

// user routes
router.use('/users', verifyToken);
router.get('/users/profile', getProfile);
router.get('/users/plan', getUserPlan);
router.get('/users/planInstance', getPlanInstance);
router.get('/users/recipes', getSelectedRecipes);
router.put('/users/recipes', selectRecipe);
router.post('/users/delivery', setDeliveryInfo);
router.post('/users/plan', choosePlan);

export default router;
