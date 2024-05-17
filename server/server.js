import express from 'express';
import { envs, Client } from "stytch";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

const client = new Client({
  project_id: process.env.PROJECT_ID,
  secret: process.env.SECRET,
  env: envs.test
});

const port = 3333; // Set the port to 3333

app.use(cors());
app.use(express.json());

app.post('/register', async(req, res) => {
  const { email, password } = req.body;

  try {
    const resp = await client.passwords.create({
      email,
      password,
      session_duration_minutes: 60
    });

    res.json({
      success: true,
      message: 'User created successfully',
      token: resp.session_token
    });
  } catch (err) {
    console.log(err);

    res.json({
      success: false,
      message: err.error_message,
      err: err
    });
  }
});

app.post('/Login', async(req, res) => {
  const { email, password } = req.body;

  try {
    const resp = await client.passwords.authenticate({
      email,
      password,
      session_duration_minutes: 60
    });

    res.json({
      success: true,
      message: 'User logged in successfully',
      token: resp.session_token
    });
  } catch (err) {
    console.log(err);

    res.json({
      success: false,
      message: err.error_message,
      err: err
    });
  }
});

app.post('/authenticate', async(req, res) => {
  const { session_token } = req.body;

  try {
    const resp = await client.sessions.authenticate({ session_token });

    res.json({
      success: true,
      message: 'Token is valid'
    });
  } catch (err) {
    console.log(err);

    res.json({
      success: false,
      message: err.error_message,
      err: err
    });
  }
});

app.post('/logout', async(req, res) => {
  const { session_token } = req.body;

  try {
    const resp = await client.sessions.revoke({ session_token });

    res.json({
      success: true,
      message: 'Token is deleted'
    });
  } catch (err) {
    console.log(err);

    res.json({
      success: false,
      message: err.error_message,
      err: err
    });
  }
});

app.listen(port, () => console.log(`Server started on port ${port}`));