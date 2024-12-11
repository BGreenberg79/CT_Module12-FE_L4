import React from 'react';
import { ListGroup } from 'react-bootstrap';

const PostItem = React.memo(({ post }) => {
    return (
                <ListGroup.Item variant='info' key={post.id}>
                    Post ID: {post.id}<br />
                    User ID: {post.userId}<br />
                    Title: {post.title}<br />
                    Body: {post.body}
                </ListGroup.Item>

    );
});

export default PostItem;