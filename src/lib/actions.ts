'use server'
import { type Movie } from './types';

export async function getMovies(url: string) {
    const response = await fetch(url);
    return response.json();
}

export async function authenticate(url: string, username: string, password: string) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, password})
    });
    if (!response.ok) {
        throw new Error('Failed to authenticate');
    }
    return response.json();
}

export async function addMovie(url: string, movieData: Movie) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData)
    });
    if (!response.ok) {
        throw new Error('Failed to add movie');
    }
    return response.json();
}

export async function updateMovie(url: string, movieId: number, movieData: Movie) {
    const response = await fetch(`${url}/${movieId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData)
    });
    if (!response.ok) {
        console.log(response);
        throw new Error('Failed to update movie');
    }
    return response.json();
}




