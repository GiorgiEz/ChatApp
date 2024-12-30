import { Router } from 'express';
import { db } from '../app';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM chatapp.messages'
        const { rows } = await db.query(query);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/:room_id', async (req, res) => {
    const { room_id } = req.params;

    try {
        const query = 'SELECT * FROM chatapp.messages WHERE room_id = ? ORDER BY timestamp DESC'
        const { rows } = await db.query(query, [room_id]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    const { content, user_id, room_id } = req.body;

    try {
        const query = 'INSERT INTO chatapp.messages (content, user_id, room_id) VALUES (?, ?, ?)'
        const { rows } = await db.query(query, [content, user_id, room_id]);

        if (rows.length > 0) {
            res.status(201).json({ message: 'Message was sent successfully' });
        } else {
            res.status(500).json({ error: 'Failed to send the message' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;