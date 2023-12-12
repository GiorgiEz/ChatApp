import { Router } from 'express';
import { db } from '../app';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM room ORDER BY timestamp DESC'
        const [rows] = await (await db).execute(query);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const query = 'SELECT * FROM room WHERE user_id = ? ORDER BY timestamp DESC'
        const [rows] = await (await db).execute(query, [user_id]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    const { room_name, password, user_id } = req.body;
    try {
        const query = 'INSERT INTO room (room_name, password, user_id) VALUES (?, ?, ?)'
        const [result] = await (await db).execute(query, [room_name, password, user_id ?? ""]);
        if ((result as {affectedRows: number}).affectedRows === 1) {
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
    const { room_id } = req.params; // Get the room_id from the request parameters

    try {
        // Execute a SQL query to delete the room with the given room_id
        const query = 'DELETE FROM room WHERE room_id = ?'
        const [result] = await (await db).execute(query, [room_id]);

        if ((result as { affectedRows: number }).affectedRows === 1) {
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
        // Execute a SQL query to update the room with the given room_id
        const sql = 'UPDATE room SET room_name = ?, password = ? WHERE room_id = ?';
        const [updateResult] = await (await db).execute(sql, [room_name, password, room_id]);

        if ((updateResult as { affectedRows: number }).affectedRows === 1) {
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