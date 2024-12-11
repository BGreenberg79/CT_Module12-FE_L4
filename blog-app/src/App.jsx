import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PostList from './components/PostList'

function App() {


  return (
    <>
      <Routes>
        <Route path='/post-list' element={<PostList/>}/>
      </Routes>
    </>
  )
}

export default App
