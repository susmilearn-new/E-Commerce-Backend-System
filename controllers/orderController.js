const Order = require("../models/order")
const Product = require("../models/product")


//create new order
const createOrder = async (req, res) => {
    try {
        const { products } = req.body

        let totalAmount = 0
        const orderProducts = []

        for (const item of products) {
            const product = await Product.findById(item.product)

            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }
            orderProducts.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            })
            totalAmount += product.price * item.quantity;
        }
        const order = new Order({
            user: req.user.id,
            products: orderProducts, totalAmount
        })

        await order.save();
        res.status(201).json({
            message: "Order created successfully",
            data: order
        })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//get loged user order
const getOrder = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
        res.status(200).json({
            data: orders
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//get all orders
const getAllOrder = async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json({
            data: orders
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//update order status
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id,
            { status: req.body.status },
            { new: true, runValidators: true })

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }
        res.status(200).json({
            message: "Order updated successfully",
            data: order
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

//delete order by id
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id)

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            })
        }

        res.status(200).json({
            message: "Order deleted succssfully"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports = {
    createOrder,
    getOrder,
    getAllOrder,
    updateOrderStatus,
    deleteOrder
}