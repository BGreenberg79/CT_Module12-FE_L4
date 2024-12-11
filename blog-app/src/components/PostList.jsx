import React, { useMemo, useCallback } from 'react'
import { Container, ListGroup, Spinner, Alert, Button, Form } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import fetchPostList from '../api/fetchPostList'
import PostItem from './PostItem'

const PostList = () => {

    const [show, setShow] = useState(true)
    const [userId, setUserId] = useState('')

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPostList
    })

    // Memoizes post list so it only changes when posts change or userId changes
    const filteredPosts = useMemo(()=> {
        if (!userId) {return data};
        return data.filter(post => post.userId === parseInt(userId));
    }, [data, userId])

    // Memoizes the function that allows for filtration and selection of posts by UserId within the form that we are rendering
    const handleUserIdFilter = useCallback((e) => {
        setUserId(e.target.value);
    }, [])



    if (isLoading) {
        return (
            <Spinner animation="border" role="status" variant="warning">
                <span>Loading...</span></Spinner>
        )
    }
    if (isError) {
        return (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Error</Alert.Heading>
                <p>
                    {error.message}
                </p>
            </Alert>
        );
    }

    return (
        <Container>
            {filteredPosts ? <h2>JSON Placeholder Post List</h2>: <h2>JSON Placeholder Posts by UserId: {userId}</h2>}
            <Form>
                <Form.Group className="mb-3" controlId="userId">
                    <Form.Label>Search By User ID:</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter UserId"
                        onChange={handleUserIdFilter}
                        value={userId}
                    />
                </Form.Group>
            </Form>
            <ListGroup>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <PostItem key={post.id} post={post} />
                        // Pass the posts, from the filteredPosts constant (or if there is no userId straight from data), as a prop into the PostItem component (that uses React.memo) which I then render in this return statement
                        // When the props that I am passing in don't change, this map will not re-render 
                    ))
                ) : (
                        <ListGroup.Item className='text-danger'>
                            Error No Posts found for this User ID
                        </ListGroup.Item>
                    )}
            </ListGroup>
        </Container>
    )
}

export default PostList;