'use strict';

const server = require('../src/server');
const supertest = require('supertest');
const mockRequest = supertest(server.app);

describe('web server', () => {
  it('should show a 404 error on nonexistent route', async () => {
    const response = await mockRequest.get('/nonexistent-route');
    expect(response.status).toBe(404);
  });


  it('should show a 404 error on an invalid method', async () => {
    const response = await mockRequest.post('/test');
    expect(response.status).toBe(404);
  });

  it('should show a server error if no name is provided in the query', async () => {
    const response = await mockRequest.get('/person?name=');
    expect(response.status).toBe(500);
  });

  it('should respond approprately when there is a name in query', async () => {
    const response = await mockRequest.get('/person').query({
      "name": "bob",
    });
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      name: 'bob',
    });
  });
});