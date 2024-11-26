import { useState } from 'react';

class User {
    constructor(id, name) {
        this.name = name;
        this.file = {}; 
        this.keyboardInput = '';
    }

    /**
     * Load user data from a file.
     * @param {string} filePath - Path to the file containing user data.
     */
    async loadFromFileSync(filePath) {
        throw new Error(`loadFromFileSync not implemented. Attempted to load from: ${filePath}`);
    }

    /**
     * Save user data to a file.
     * @param {string} filePath - Path to the file where user data will be saved.
     */
    async saveToFileSync(filePath) {
        throw new Error(`saveFromFileSync not implemented. Attempted to load from: ${filePath}`);
    }

    /**
     * Read user input from the keyboard.
     * @returns {string} The user's keyboard input.
     */
    readKeyboardInput() {
        return '';
    }
}

export default User;