import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getRecords = async (req: Request, res: Response) => {
  const { category } = req.params;
  try {
    const data = await prisma.product.findMany({
      where: {
        isActive: true
      },
      select: {
        name: true,
        slug: true,
        price: true,
        teaser: true,
        imageUrl: true,
        stock: true,
      }
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getRecordsByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;
  try {
    const data = await prisma.product.findMany({
      where: {
        isActive: true,
        category: { slug: { equals: category } },
      },
      select: {
        name: true,
        slug: true,
        price: true,
        teaser: true,
        imageUrl: true,
        stock: true,
      }
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};


export const getRecord = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const data = await prisma.product.findFirst({
      where: { slug: slug },
      include: {
        brand: {},
        category: {}
      }
    });
    if (!data) res.status(404).json({ error: 'Product not found' });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};