import express from 'express'
import lusca from 'lusca'
import dotenv from 'dotenv'
import compression from 'compression'

import productRouter from './routers/product'
import userRouter from './routers/user'
import authRouter from './routers/auth'
import cartRouter from './routers/cart'
import orderRouter from './routers/order'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import cors from 'cors'

dotenv.config({ path: '.env' })

const app = express()
app.use(cors())

// Express configuration
app.set('port', process.env.PORT || 3010)
app.use(apiContentType)
// Use common 3rd-party middlewares
app.use(compression())
app.use(express.json())
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))

// Use Products, users router
app.use('/api/v1/products', productRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/carts', cartRouter)
app.use('/api/v1/orders', orderRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
