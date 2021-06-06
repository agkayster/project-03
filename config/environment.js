const port = process.env.PORT || 4000
const env = process.env.NODE_ENV || 'development'// we put "env" when we add FRONTEND
const dbURI = process.env.MONGODB_URI || `mongodb://localhost:27017/plots-db-${env}`// we put "env" when we add FRONTEND
const secret = process.env.SECRET || 'Tgs5aG_^GH@lKmnN'


module.exports = { dbURI, secret, port, env }// we put "env" when we add FRONTEND
