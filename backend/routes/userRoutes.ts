import { Router } from 'express';
import { db } from '../app';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM chatapp.users'
        const { rows } = await db.query(query);
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
            query = 'SELECT * FROM chatapp.users WHERE user_id = ?';
            params = [identifier];
        } else {
            query = 'SELECT * FROM chatapp.users WHERE username = ?';
            params = [identifier];
        }
        const { rows } = await db.query(query, params);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const query = 'INSERT INTO chatapp.users (username, password) VALUES ($1, $2) RETURNING *';
        const { rows } = await db.query(query, [username, password ?? ""]);

        if (rows.length > 0) {
            res.status(201).json({ message: 'User added successfully' });
        }
        else {
            res.status(500).json({ error: 'Failed to add the user' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log("Entered the post method to add user!", username, password);
});

router.delete('/:user_id', async (req, res) => {
    const { user_id } = req.params;

    try {
        const query = 'DELETE FROM chatapp.users WHERE user_id = ?'
        const { rows } = await db.query(query, [user_id]);

        if (rows.length > 0) {
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