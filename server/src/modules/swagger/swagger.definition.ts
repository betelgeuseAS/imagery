import config from '../../config/config'

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Imagery API documentation',
    version: '0.0.1',
    description:
      'Software that will help writers write both short stories and book series',
    license: {
      name: 'Closed Source', // MIT
      url: 'https://github.com/betelgeuseAS/imagery.git'
    }
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
      description: 'Development Server'
    }
  ]
}

export default swaggerDefinition
