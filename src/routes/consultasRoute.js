const express = require('express');
const router = express.Router();

const LoginController = require('../controllers/loginController');
const UserController = require('../controllers/userController');
const TransportRequestController = require('../controllers/transportController');
const HistoricController = require('../controllers/historicController');
const IncidentController = require('../controllers/IncidentController');

const loginController = new LoginController();
const userController = new UserController();
const transportRequestController = new TransportRequestController();
const historicController = new HistoricController();
const incidentController = new IncidentController();

// Rotas de Login e Cadastro
router.post('/login', (req, res) => loginController.fazerLogin(req, res));
router.post('/register', (req, res) => loginController.cadastrarUsuario(req, res));

// Rotas de Usuários
router.get('/users', (req, res) => userController.getAllUsers(req, res));
router.get('/maqueiros', (req, res) => transportRequestController.getMaqueiros(req, res));

// Rotas de Solicitações de Transporte
router.get('/transport-requests', (req, res) => transportRequestController.getAllTransportRequests(req, res));
router.get('/transport-requests/:id', (req, res) => transportRequestController.getTransportRequestById(req, res));
router.get('/transport-requests/maqueiro/:maqueiro_id', (req, res) => transportRequestController.getTransportRequestsByMaqueiroId(req, res));
router.post('/transport-requests', (req, res) => transportRequestController.createTransportRequest(req, res));
router.put('/transport-requests/:id', (req, res) => transportRequestController.updateTransportRequest(req, res));
router.delete('/transport-requests/:id', (req, res) => transportRequestController.deleteTransportRequest(req, res));
router.put('/transport-requests/:id/request-status', (req, res) => transportRequestController.updateTransportRequestStatus(req, res));
router.put('/transport-requests/:id/status', (req, res) => transportRequestController.updateTransportStatus(req, res)); // Certifique-se de que esta rota está definida corretamente
router.get('/', transportRequestController.getAllTransportRequests.bind(transportRequestController));
router.get('/:id', transportRequestController.getTransportRequestById.bind(transportRequestController));
router.get('/maqueiro/:maqueiro_id', transportRequestController.getTransportRequestsByMaqueiroId.bind(transportRequestController));
router.post('/', transportRequestController.createTransportRequest.bind(transportRequestController));
router.put('/:id', transportRequestController.updateTransportRequest.bind(transportRequestController));
router.delete('/:id', transportRequestController.deleteTransportRequest.bind(transportRequestController));
router.put('/:id/priority', transportRequestController.updateTransportRequestPriority.bind(transportRequestController));
router.put('/:id/request-status', transportRequestController.updateTransportRequestStatus.bind(transportRequestController));
router.put('/:id/status', transportRequestController.updateTransportStatus.bind(transportRequestController));
router.put('/:id/reject', transportRequestController.rejectTransportRequest.bind(transportRequestController));
router.put('/transport-requests/:id/reject', (req, res) => transportRequestController.rejectTransportRequest(req, res));

// Rota de Priorização de Transporte
router.put('/transport-requests/:id/priority', (req, res) => transportRequestController.updateTransportRequestPriority(req, res));

// Rota para obter o histórico de uma solicitação de transporte
router.get('/historic/:solicitacaoId', (req, res) => historicController.getHistoricoBySolicitacaoId(req, res));

// Rotas de Incidentes
router.get('/incidents', (req, res) => incidentController.getAllIncidents(req, res));
router.get('/incidents/:id', (req, res) => incidentController.getIncidentById(req, res));
router.post('/incidents', (req, res) => incidentController.createIncident(req, res));
router.put('/incidents/:id', (req, res) => incidentController.updateIncident(req, res));
router.delete('/incidents/:id', (req, res) => incidentController.deleteIncident(req, res));

router.put('/users/:id', (req, res) => userController.updateUser(req, res));
router.delete('/users/:id', (req, res) => userController.deleteUser(req, res));

module.exports = router;
