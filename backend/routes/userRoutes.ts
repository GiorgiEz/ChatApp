import { Router } from 'express';
import { db } from '../app';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM user'
        const [rows] = await (await db).execute(query);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to retrieve user information by username or user_id
router.get('/:identifier', async (req, res) => {
    const { identifier } = req.params;
    try {
        const isNumeric = /^\d+$/.test(identifier);
        let query, params;
        if (isNumeric) {
            query = 'SELECT * FROM user WHERE user_id = ?';
            params = [identifier];
        } else {
            query = 'SELECT * FROM user WHERE username = ?';
            params = [identifier];
        }
        const [rows] = await (await db).execute(query, params);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    try {
        const query = 'INSERT INTO user (username, password) VALUES (?, ?)'
        const [result] = await (await db).execute(query, [username, password ?? ""]);

        if ((result as {affectedRows: number}).affectedRows === 1) {
            res.status(201).json({ message: 'User added successfully' });
        }
        else {
            res.status(500).json({ error: 'Failed to add the user' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:user_id', async (req, res) => {
    const { user_id } = req.params;

    try {
        const query = 'DELETE FROM user WHERE user_id = ?'
        const [result] = await (await db).execute(query, [user_id]);

        if ((result as { affectedRows: number }).affectedRows === 1) {
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;