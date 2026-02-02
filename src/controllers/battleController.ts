import { Request, Response, NextFunction } from 'express';
import { Battle } from '../models/battle';
import pool from '../db/db';

export const createBattle = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, choice, checkFunction } = req.body;
        const newBattle: Battle = { id: Date.now(), name, choice, checkFunction };
        const query = 'INSERT INTO battles (id, name, choice, check_function) VALUES ($1, $2, $3, $4)';
        const values = [newBattle.id, newBattle.name, newBattle.choice, newBattle.checkFunction];
    
        pool.query(query, values)
        .then(() => {
            res.status(201).json(newBattle);
        })
        .catch((error) => {
            next(error);
        });
    } catch (error) {
        next(error);
    }
};

export const getBattles = (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = 'SELECT * FROM battles';
    pool.query(query)
      .then((result) => {
        res.json(result.rows);
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
};

export const getBattleById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const query = 'SELECT * FROM battles WHERE id = $1';
    const values = [id];
    pool.query(query, values)
      .then((result) => {
        if (result.rows.length === 0) {
          res.status(404).json({ message: 'Battle not found' });
          return;
        }
        res.json(result.rows[0]);
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
};

export const updateBattle = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const { name, choice, checkFunction } = req.body;
    const query = 'UPDATE battles SET name = $1, choice = $2, check_function = $3 WHERE id = $4 RETURNING *';
    const values = [name, choice, checkFunction, id];
    pool.query(query, values)
      .then((result) => {
        if (result.rows.length === 0) {
          res.status(404).json({ message: 'Battle not found' });
          return;
        }
        res.json(result.rows[0]);
        })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
};

export const deleteBattle = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const query = 'DELETE FROM battles WHERE id = $1 RETURNING *';
    const values = [id];
    pool.query(query, values)
      .then((result) => {
        if (result.rows.length === 0) {
          res.status(404).json({ message: 'Battle not found' });
          return;
        }
        res.json({ message: 'Battle deleted successfully' });
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
};

export const getChoices = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const query = 'SELECT choice FROM battles WHERE id = $1';
    const values = [id];
    pool.query(query, values)
      .then((result) => {
        if (result.rows.length === 0) {
          res.status(404).json({ message: 'Battle not found' });
          return;
        }
        res.json(result.rows[0].choice);
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
};

export const getWinner = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const { choice1, choice2 } = req.body;
    const query = 'SELECT check_function FROM battles WHERE id = $1';
    const values = [id];
    pool.query(query, values)
      .then((result) => {
        if (result.rows.length === 0) {
          res.status(404).json({ message: 'Battle not found' });
          return;
        }
        const checkFunctionStr = result.rows[0].check_function;
        // eslint-disable-next-line no-eval
        const checkFunction = eval(`(${checkFunctionStr})`);
        const winner = checkFunction(choice1, choice2);
        res.json({ winner });
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
};