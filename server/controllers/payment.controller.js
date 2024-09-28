import AppError from "../utils/error.util.js";
import { razorpay } from  '../server.js';
import User from "../models/user.model.js";

export const getRazorpayApiKey = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Razorpay API Key',
            key: process.env.RAZORPAY_KEY_ID
        });
    } catch(e) {

    }
    
   

}

export const buySubscription = async (req, res, next) => {
    try{
        const { id }  = req.user;
    const user = await User.findById(idd);

    if(!user) {
        return next(
            new AppError('Unauthorized,pls login')
        )
    }


    if (user.role == 'ADMIN') {
        return next(
            new AppError(
                'Admin can not purchase a subscription ',400
            )
        )
    }

    const subscription = await razorpay.subscriptions.create({
        plan_id: process.env.RAZORPAY_KEY_ID,
        customer_notify: 1
    });

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    await user.save();

    res.status(200).json({
        success: true,
        message: 'Subscribed Successfully',
        subscription_id: subscription.id
    });

    } catch(e) {

    }
    

}

export const verifySubscription = async (req, res, next) => {
    const {  id } = req.user;
    const { razorpay_payment_id, razorpay_signature, razorpay_subscription_id } = req.body;

    const user = await User.findById(id);
    if(!user) {
        return next(
            new AppError('Unauthorized,pls login')
        )
    }

    const subscriptionId = user.subscription.id;

    const generatedSignature = crypto
        .createHmac('son256',process.env.RAZORPAY_SECRET)
        .update('${razorpay_payment_id}|${subscriptionId}')
        .digest('hex');

    if (generatedSignature !== razorpay_signature) {
        return next(
            new AppError('Payment not verified,pls try again',500)
        )

    }

    await Payment.create({
        razorpay_payment_id,
        razorpay_signature,
        razorpay_subscription_id,


    });

    user.subscription.status='active';
    await user .save();

    res.status(200).json({
        success: true,
        message: 'Payment verified successfully!'
    })




}

export const cancelSubscription = async (req, res, next) => {
    try {
        const { id } = req.user;

        const user = await User.findById(id);

        if(!user) {
         return next(
            new AppError('Unauthorized,pls login')
            )
        }


        if (user.role == 'ADMIN') {
         return next(
            new AppError(
                'Admin can not purchase a subscription ',400
            )
         )
        }

        const subscriptionId = user.subscription.id;

        const subscription = await razorpay.subscriptions.cancel(
            subscriptionId

        )

         user.subscription.status = subscription.status;

        await user.save();


    }  catch(e) {
        return next(
            new AppError(e.message, 500)
        )
    }
    
}

export const allPayments = async (req, res, next) => {

}