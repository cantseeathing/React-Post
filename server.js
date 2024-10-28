import {createRequire} from 'module';

const require = createRequire(import.meta.url);
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import {join} from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const express = require('express');
const bodyParser = require('body-parser');

// const {readFileSync} = require('fs');
const {writeFileSync, readFileSync} = require('fs');


const app = express();

// app.use('./public', express.static(join(__dirname, 'public')));
// app.use('./src', express.static(join(__dirname, 'src')));
// app.use('./assets', express.static(join(__dirname, 'dist/assets')));

app.use(bodyParser.json());

app.use((req, res, next) => {
    // Attach CORS headers
    // Required when using a detached backend (that runs on a different domain)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

function readPosts() {
    return JSON.parse(readFileSync(join(__dirname, 'data/posts.json'), 'utf8'));
}
//app.use(express.json());

//app.get('/', (req, res) => {
//    console.log("here")
//    res.sendFile(path.join(__dirname, 'index.html'));
//});
// This code makes sure that any request that does not matches a static file
// in the build folder, will just serve index.html. Client side routing is
// going to make sure that the correct content will be loaded.
// app.use((req, res, next) => {
//     if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
//         next();
//     } else {
//         res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
//         res.header('Expires', '-1');
//         res.header('Pragma', 'no-cache');
//         res.sendFile(path.join(__dirname, 'dist', 'index.html'));
//     }
// });

 app.use(express.static(path.join(__dirname, 'dist')));


app.get('/posts', async (req, res) => {
    const storedPosts = await readPosts();
    await new Promise((resolve, reject) => setTimeout(() => resolve(), 1500));
    res.json(storedPosts);
});

app.get('/posts/:id', async (req, res) => {
    const storedPosts = await readPosts();
    const post = storedPosts.find((post) => post.id === req.params.id);
    post ? res.json({post}) : res.status(404).json(
        {message: 'No post found! '}
    );
});

app.post('/posts', async (req, res) => {
    const existingPosts = await readPosts();
    const postData = req.body;
    const dataWritten = [...existingPosts, postData];
    // APPEND TO JSON FILE
    const filePath = join(__dirname, 'data/posts.json');
    try {
        writeFileSync(filePath, JSON.stringify(dataWritten, null, 2), 'utf8');
        console.log('Data successfully saved to disk');
    } catch (error) {
        console.log('An error has occurred ', error);
        res.status(500).json(
            {message: 'An error has occurred ', error}
        );
    }
    // const updatedPosts = [newPost, ...existingPosts];
    // await storePosts(updatedPosts);
    res.status(201).json(
        {
            message: 'Stored new post.',
            post: postData
        }
    );
});

app.listen(8080);
