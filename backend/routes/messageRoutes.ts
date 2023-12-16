import { Router } from 'express';
import { db } from '../app';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM message'
        const [rows] = await (await db).execute(query);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/:room_id', async (req, res) => {
    const { room_id } = req.params;

    try {
        const query = 'SELECT * FROM message WHERE room_id = ? ORDER BY timestamp DESC'
        const [result] = await (await db).execute(query, [room_id]);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    const { content, user_id, room_id } = req.body;

    try {
        const query = 'INSERT INTO message (content, user_id, room_id) VALUES (?, ?, ?)'
        const [result] = await (await db).execute(query, [content, user_id, room_id]);

        if ((result as { affectedRows: number }).affectedRows === 1) {
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