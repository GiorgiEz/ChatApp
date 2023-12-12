import { Router } from 'express';
import { db } from '../app';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await (await db).execute('SELECT * FROM message');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/:room_id', async (req, res) => {
    const { room_id } = req.params; // Get the room_id from the request parameters

    try {
        // Execute a SQL query to fetch the messages with the given room_id
        const [result] = await (await db).execute('SELECT * FROM message WHERE room_id = ? ORDER BY timestamp DESC', [room_id]);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    const { content, user_id, room_id } = req.body;

    try {
        const [result] = await (await db).execute('INSERT INTO message (content, user_id, room_id) VALUES (?, ?, ?)',
            [content, user_id, room_id]);

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