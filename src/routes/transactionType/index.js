const express = require('express');
const { getTransactionTypes, addTransactionType, updateTransactionType, deleteTransactionType } = require('../../controllers/transactionType');

const router = new express.Router();

router.post('/create', addTransactionType)
router.patch('/update', updateTransactionType)
router.delete('/delete', deleteTransactionType)
router.get('', getTransactionTypes)

module.exports = router