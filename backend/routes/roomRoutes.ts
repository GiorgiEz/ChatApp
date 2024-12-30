import { Router } from 'express';
import { db } from '../app';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM chatapp.rooms ORDER BY timestamp DESC'
        const { rows } = await db.query(query);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const query = 'SELECT * FROM chatapp.rooms WHERE user_id = $1 ORDER BY timestamp DESC'
        const { rows } = await db.query(query, [user_id]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    const { room_name, password, user_id } = req.body;
    try {
        const query = 'INSERT INTO chatapp.rooms (room_name, password, user_id) VALUES ($1, $2, $3)'
        const { rows } = await db.query(query, [room_name, password, user_id ?? ""]);
        if (rows.length > 0) {
            res.status(201).json({ message: 'Room added successfully' });
        } else {
            res.status(500).json({ error: 'Failed to add the room' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:room_id', async (req, res) => {
    const { room_id } = req.params;

    try {
        const query = 'DELETE FROM chatapp.rooms WHERE room_id = ?'
        const { rows } = await db.query(query, [room_id]);

        if (rows.length > 0) {
            res.json({ message: 'Room deleted successfully' });
        } else {
            res.status(404).json({ error: 'Room not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:room_id', async (req, res) => {
    const { room_id } = req.params;
    const { room_name, password } = req.body;

    try {
        const query = 'UPDATE chatapp.rooms SET room_name = ?, password = ? WHERE room_id = ?';
        const { rows } = await db.query(query, [room_name, password, room_id]);

        if (rows.length > 0) {
            res.json({ message: 'Room updated successfully' });
        } else {
            res.status(404).json({ error: 'Room not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;