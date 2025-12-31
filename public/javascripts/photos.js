// Example Route (index.js or routes/photos.js)
router.get('/photos', (req, res) => {
    // Check if user is admin (simplified check)
    const isAdmin = req.cookies.admin_token === 'secret_mpi_admin_key';

    // Fetch photos from your database (e.g., MongoDB or a JSON file)
    const photos = [
        { url: '/images/mpi_gate.jpg', title: 'Main Entrance', desc: 'The iconic gate of Magura Polytechnic Institute.' },
        { url: '/images/lab.jpg', title: 'Computer Lab', desc: 'Modern computing facilities for Technology students.' }
    ];

    res.render('photos', { isAdmin, photos });
});