import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

let prisma: PrismaClient

const connectPrisma = async (retries = 5, delay = 1000) => {
  try {
    prisma = globalForPrisma.prisma || new PrismaClient()
    await prisma.$connect()
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
    console.log('Prisma connected successfully.')
  } catch (error) {
    if (retries === 0) {
      console.error('Failed to connect to Prisma after multiple attempts:', error)
      throw error
    }
    console.warn(`Failed to connect to Prisma. Retrying in ${delay} ms...`, error)
    await new Promise((resolve) => setTimeout(resolve, delay))
    await connectPrisma(retries - 1, delay)
  }
}

// Initialize Prisma Client with retry logic
connectPrisma().catch((error) => {
  console.error('Failed to initialize Prisma:', error)
  process.exit(1)
})

export { prisma }
