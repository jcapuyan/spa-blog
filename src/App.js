import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { AuthProvider } from './context/auth';

import Header from './components/Header';
import Footer from './components/Footer';
import IndexPage from './pages/IndexPage';
import SinglePage from './pages/SinglePage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <div className="main">
          <Switch>
            <Route path="/create-new-post">
              <CreatePostPage />
            </Route>
            <Route path="/:id/edit">
              <EditPostPage />
            </Route>
            <Route path="/:id">
              <SinglePage />
            </Route>
            <Route path='/'>
              <IndexPage />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
