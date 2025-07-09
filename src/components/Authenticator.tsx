import { useState } from 'react';

import Button from './Button';

interface AuthProps {
  onAuthenticate: (username: string, password: string) => void
}

export default function Authenticator({ onAuthenticate }: AuthProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string>('');

  const validateInput = () => {
    let msg = '';
    if (username === '') msg += 'Username is required.<br>';
    if (password === '') msg += 'Password is required.<br>';
    setMessage(msg);

    if (msg === '') onAuthenticate(username, password);
  }

  return (
    <div className="container mx-auto relative">
      <header className="top-0 sticky z-1">
        <h1 className="text-white bg-gray-900 text-3xl font-bold text-center pt-1 pb-2">Joe & Dee's Movie Reviews Editor</h1>
      </header>
      <main className="text-center bg-white min-w-full p-4">
        <input type="text" placeholder="Username" className="border p-1 mr-2 bg-gray-700 text-white" onChange={(e) => setUsername(e.target.value.trim())} />
        <input type="password" placeholder="Password" className="border p-1 mr-2 bg-gray-700 text-white" onChange={(e) => setPassword(e.target.value.trim())} />
        <Button buttonLabel='Submit' buttonColor='blue' buttonClick={validateInput}></Button>
        <div className="text-red-500 text-center mt-2" dangerouslySetInnerHTML={{ __html: message }}></div>
      </main>
    </div>
  );
}

