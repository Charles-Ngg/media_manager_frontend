// src/pages/AddMedia.js
import React, { useState } from 'react';
import { createMedia } from '../services/api';
import { useNavigate } from 'react-router-dom';
import StyledButton from '../components/StyledButton';
import styled from 'styled-components';

const Container = styled.div`
    padding: 40px;
    max-width: 600px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 8px;
    color: #1c1c1e;
    font-weight: bold;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    border: 1px solid #d1d1d6;
    border-radius: 8px;
    font-size: 16px;
    &:focus {
        border-color: #007aff;
        outline: none;
    }
`;

function AddMedia() {
    const [title, setTitle] = useState('');
    const [filePath, setFilePath] = useState('');
    const [categories, setCategories] = useState('');
    const [tags, setTags] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data
        const mediaData = {
            title,
            file_path: filePath,
            categories: categories.split(',').map((cat) => cat.trim()),
            tags: tags.split(',').map((tag) => tag.trim()),
            ratings: 0,
            likes: 0,
            actors: [], // You can add functionality to add actors separately
        };

        try {
            await createMedia(mediaData);
            alert('Media item added successfully!');
            navigate('/'); // Redirect to media list
        } catch (error) {
            console.error('Error adding media item:', error);
            alert('Failed to add media item. Please try again.');
        }
    };

    return (
        <Container>
            <h2>Add New Media</h2>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Title:</Label>
                    <Input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>File Path:</Label>
                    <Input
                        type="text"
                        value={filePath}
                        onChange={(e) => setFilePath(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Categories (comma-separated):</Label>
                    <Input
                        type="text"
                        value={categories}
                        onChange={(e) => setCategories(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Tags (comma-separated):</Label>
                    <Input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </FormGroup>
                <StyledButton type="submit">Add Media</StyledButton>
            </form>
        </Container>
    );
}

export default AddMedia;
