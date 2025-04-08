import { PrismaClient } from "@prisma/client"
 
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
 
export const prisma = globalForPrisma.prisma || new PrismaClient()
 
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

async function connectToDatabase() {
    try {
      // This line isn't strictly needed because PrismaClient handles connections automatically,
      // but you can check if the database is reachable by running a query, like:
      await prisma.$connect();
      console.log("Successfully connected to the database!");
      return prisma;
    } catch (error) {
      console.error("Error connecting to the database", error);
      throw new Error("Could not connect to the database");
    }
  }
  
  export default connectToDatabase;