var express = require('express');
var router = express.Router();
var db_service = require('../service/db_service.js');


router.post('/register_user',db_service.register_user);
router.post('/verify_user',db_service.verify_user);
router.post('/get_user_details',db_service.get_user_details);
router.post('/add_product',db_service.add_product);
router.put('/add_product',db_service.update_product);
router.post('/get_product',db_service.get_product);
router.post('/add_order',db_service.add_order);

router.get('/get_products',db_service.get_products);
router.get('/get_orders',db_service.get_orders);

router.delete('/get_product/:id',db_service.delete_product);
module.exports = router;
